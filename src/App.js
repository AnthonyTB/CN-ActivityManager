import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PublicRoute from './Routes/RouteHandlers/PublicRoute';
import PrivateRoute from './Routes/RouteHandlers/PrivateRoute';
import Login from './Routes/Login/Login';
import Home from './Routes/Home/Home';
import Boundary from './Routes/Boundary/Boundary';
import Nav from './Components/Nav/Nav';
import Context from './Components/Context/Context';
import Plug from './Components/Plug/Plug';

class App extends React.Component {
  static contextType = Context;

  render() {
    return (
      <div className='App'>
        {this.context.isLoggedIn ? <Nav /> : ''}
        <Switch>
          <PublicRoute exact path='/Login' component={Login} />
          <PrivateRoute exact path='/' component={Home} />
          <Route component={Boundary} />
        </Switch>
        <Plug />
      </div>
    );
  }
}

export default App;
