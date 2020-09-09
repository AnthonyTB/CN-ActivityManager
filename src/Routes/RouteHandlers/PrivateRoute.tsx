import React, { FunctionComponent } from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import TokenServices from "../../Helpers/TokenService";

interface IProps {
  component: FunctionComponent<RouteComponentProps>;
  props: RouteComponentProps;
}

// renders private routes if auth token present or redirects to login page
const PrivateRoute: FunctionComponent<any> = ({
  component,
  ...props
}: IProps) => {
  const Component = component;
  return (
    <Route
      {...props}
      render={(componentProps) =>
        TokenServices.hasAuthToken() ? (
          <Component {...props} {...componentProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/Login",
              state: { from: componentProps.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
