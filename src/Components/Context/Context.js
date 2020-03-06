import React from 'react';
import TokenService from '../../Helpers/TokenService';

const Context = React.createContext({
  processLogin: () => {},
  processLogout: () => {},
  setUser: () => {},
  user: {},
  activities: {},
  updateActivityList: () => {},
  isLoggedIn: null,
  setError: () => {},
  clearError: () => {},
  error: null
});

export default Context;

export class ContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      error: null,
      isLoggedIn: null,
      activities: {}
    };

    const jwtPayload = TokenService.parseAuthToken();

    if (jwtPayload)
      this.state.user = {
        id: jwtPayload.user_id,
        name: jwtPayload.name,
        username: jwtPayload.sub
      };
  }

  componentDidMount() {
    return TokenService.hasAuthToken()
      ? this.setState({ isLoggedIn: true })
      : '';
  }

  // sets the activities in the context state
  setActivities = res => {
    this.setState({ activities: res });
  };

  // updates activities list when a successfuly post call is made for a new activity
  updateActivityList = activity =>
    this.setState({ actvities: [...this.state.activities], activity });

  // sets the error value when called
  setError = error => {
    console.error(error);
    this.setState({ error });
  };

  // sets the error value in state back to null
  clearError = () => {
    this.setState({ error: null });
  };

  // sets the current loggedin users data in state
  setUser = user => {
    this.setState({ user });
  };

  // clears the current loggedin users data in state
  clearUser = user => {
    this.setState({ user: {} });
  };

  // when a user logs in this function is triggered and it saves the users api token
  // to the user's brower local storage and stores the users data in state
  processLogin = authToken => {
    TokenService.saveAuthToken(authToken);
    const jwtPayload = TokenService.parseAuthToken();
    this.setUser({
      id: jwtPayload.user_id,
      name: jwtPayload.name,
      username: jwtPayload.sub
    });
    this.setState({ isLoggedIn: true });
  };

  // when a user logs out this function is called and it clears the user's api token from
  // their browsers local storage also it clears the value of currentUser in state
  processLogout = () => {
    TokenService.clearAuthToken();
    this.clearUser();
    this.setState({ isLoggedIn: false });
  };

  render() {
    const value = {
      isLoggedIn: this.state.isLoggedIn,
      activities: this.state.activities,
      setActivities: this.setActivities,
      updateActivityList: this.updateActivityList,
      user: this.state.user,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setUser: this.setUser,
      clearUser: this.clearUser,
      processLogin: this.processLogin,
      processLogout: this.processLogout
    };
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }
}
