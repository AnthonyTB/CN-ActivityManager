import React, { useContext, useState, FunctionComponent } from "react";
import "./LoginForm.css";
import AuthService from "../../../../Helpers/AuthService";
import { Context } from "../../../../Components/Context/Context";

interface IProps {
  onSuccessfulLogin: () => void;
}

const LoginForm: FunctionComponent<IProps> = (props) => {
  const { processLogin } = useContext(Context);
  const [error, setError] = useState(null);

  const onSubmit = (ev: any) => {
    ev.preventDefault();
    const { username, password } = ev.target;
    AuthService.login(username.value.toLowerCase(), password.value)
      .then((res) => {
        processLogin(res.authToken);
        props.onSuccessfulLogin();
      })
      .catch((res) => {
        setError(res.error);
      });
  };

  return (
    <form className="LoginForm" onSubmit={onSubmit}>
      {error ? <h5 className="error">{error}</h5> : ""}
      <div className="group">
        <label htmlFor="username">Username</label>
        <input type="text" required name="username" />
        <label htmlFor="password">Password</label>
        <input type="password" required name="password" />
        <div className="btn-style">
          <button className="Login-Submit" type="submit">
            Login
            <div className="fill-one"></div>
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
