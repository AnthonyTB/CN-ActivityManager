import React, { FunctionComponent } from "react";
import LoginForm from "./Components/LoginForm/LoginForm";
import Logo from "../../Assets/logo.png";
import "./Login.css";
import { RouteComponentProps } from "react-router-dom";

const Login: FunctionComponent<RouteComponentProps> = (props) => {
  // when a user successfully logs in the app will push them to the app
  const onSuccessfulLogin = () => {
    const { history } = props;
    history.push("/");
  };

  return (
    <div className="Login">
      <img src={Logo} className="Login-Image" alt="Code Ninjas Logo" />
      <h1>
        Hi<span className="alt-color"> - </span>YAH
        <span className="alt-color">!</span>
      </h1>
      <LoginForm onSuccessfulLogin={onSuccessfulLogin} />
    </div>
  );
};

export default Login;
