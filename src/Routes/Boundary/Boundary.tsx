import React, { FunctionComponent } from "react";
import "./Boundary.css";
import { Link } from "react-router-dom";

const Boundary: FunctionComponent = () => {
  return (
    <div className="Boundary">
      <div className="container">
        <h1>Hey, Looks like you're a lost ninja</h1>
        <Link to="/">Back to the Dojo</Link>
      </div>
    </div>
  );
};

export default Boundary;
