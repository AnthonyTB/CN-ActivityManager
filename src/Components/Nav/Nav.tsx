import React, { FunctionComponent, useContext } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import { Context } from "../Context/Context";

const Nav: FunctionComponent = () => {
  const { processLogout, userData } = useContext(Context);

  const Logout = (): void => {
    processLogout();
  };

  return (
    <div className="Nav">
      {/* <h5>{userData.username}</h5> */}
      <Link onClick={Logout} to="/Login">
        Logout
      </Link>
    </div>
  );
};

export default Nav;
