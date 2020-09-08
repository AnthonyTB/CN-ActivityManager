import React, { FunctionComponent } from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import TokenServices from "../../Helpers/TokenService";

interface IProps {
  component: FunctionComponent;
  props: RouteComponentProps;
}

// if auth token present then redirects to user home page, else only shows public route components
const PublicRoute: FunctionComponent = ({ component, ...props }: IProps) => {
  const Component = component;
  return (
    <Route
      {...props}
      render={(componentProps) =>
        TokenServices.hasAuthToken() ? (
          <Redirect to={"/"} />
        ) : (
          <Component {...props} {...componentProps} />
        )
      }
    />
  );
};

export default PublicRoute;
