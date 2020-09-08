import React, {
  createContext,
  useReducer,
  FunctionComponent,
  useEffect,
} from "react";
import TokenService from "../../Helpers/TokenService";
import JwtDecode from "jwt-decode";

interface IReducer {
  type: string;
  payload: any;
}

export const Context = createContext<any>([]);

export const ContextProvider: FunctionComponent = (props: any) => {
  const Reducer = (prevState: any, { type, payload }: IReducer) => {
    switch (type) {
      case "userData":
        return {
          ...prevState,
          userData: payload.userData,
        };
      case "isLoggedIn":
        return {
          ...prevState,
          isLoggedIn: payload.isLoggedIn,
        };
      case "activities":
        return {
          ...prevState,
          activities: payload.activities,
        };
      case "error":
        return {
          ...prevState,
          error: payload.error,
        };
      default:
        return "";
    }
  };

  const [state, dispatch] = useReducer(Reducer, {
    userData: null,
    isLoggedIn: false,
    activities: null,
    error: null,
  });

  const dataSetter = (section: string, data: any) => {
    dispatch({
      type: `${section}`,
      payload: {
        [section]: data,
      },
    });
  };

  useEffect(() => {
    const jwtPayload: any = TokenService.parseAuthToken();

    if (jwtPayload)
      state.userData = {
        id: jwtPayload.user_id,
        name: jwtPayload.name,
        username: jwtPayload.sub,
      };

    TokenService.hasAuthToken() ? dataSetter("isLoggedIn", true) : "";
  }, []);

  // when a user logs in this function is triggered and it saves the users api token
  // to the user's brower local storage and stores the users data in state
  const processLogin = (authToken: string) => {
    TokenService.saveAuthToken(authToken);
    const jwtPayload: any = TokenService.parseAuthToken();
    dataSetter("userData", {
      id: jwtPayload.user_id,
      name: jwtPayload.name,
      username: jwtPayload.sub,
    });
    dataSetter("isLoggedIn", true);
  };

  // when a user logs out this function is called and it clears the user's api token from
  // their browsers local storage also it clears the value of currentUser in state
  const processLogout = () => {
    TokenService.clearAuthToken();
    dataSetter("userData", {});
    dataSetter("isLoggedIn", false);
  };

  const value = {
    isLoggedIn: state.isLoggedIn,
    activities: state.activities,
    user: state.userData,
    error: state.error,
    processLogin,
    processLogout,
    dataSetter,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
