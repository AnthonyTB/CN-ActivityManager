import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import Context from '../Context/Context';

export default class Nav extends React.Component {
  static contextType = Context;

  Logout = () => {
    this.context.processLogout();
  };

  render() {
    return (
      <div className='Nav'>
        <h5>{this.context.user.username}</h5>
        <Link onClick={this.Logout} to='/Login'>
          Logout
        </Link>
      </div>
    );
  }
}
