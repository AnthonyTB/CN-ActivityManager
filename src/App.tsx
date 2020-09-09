import React, { FunctionComponent, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import PublicRoute from "./Routes/RouteHandlers/PublicRoute";
import PrivateRoute from "./Routes/RouteHandlers/PrivateRoute";
import Login from "./Routes/Login/Login";
import Home from "./Routes/Home/Home";
import Boundary from "./Routes/Boundary/Boundary";
import Nav from "./Components/Nav/Nav";
import { Context } from "./Components/Context/Context";
import Plug from "./Components/Plug/Plug";

const App: FunctionComponent = () => {
  const { isLoggedIn } = useContext(Context);

  return (
    <div className="App">
      {isLoggedIn ? <Nav /> : ""}
      <Switch>
        <PublicRoute exact path="/Login" component={Login} />
        <PrivateRoute exact path="/" component={Home} />
        <Route component={Boundary} />
      </Switch>
      <Plug />
    </div>
  );
};

export default App;
