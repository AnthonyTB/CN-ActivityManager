import React, { FunctionComponent } from "react";
import "./Plug.css";

const Plug: FunctionComponent = () => {
  return (
    <div className="Plug">
      <span className="dev">
        Developed By{" "}
        <a href="https://github.com/AnthonyTB" target="blank_">
          <i className="fab fa-github"></i>
        </a>
      </span>
    </div>
  );
};

export default Plug;
