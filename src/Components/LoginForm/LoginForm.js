import React from 'react';
import './LoginForm.css';
import AuthService from '../../Helpers/AuthService';
import Context from '../Context/Context';

export default class LoginForm extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  onSubmit = ev => {
    ev.preventDefault();
    const { username, password } = ev.target;
    AuthService.login(username.value.toLowerCase(), password.value)
      .then(res => {
        this.context.processLogin(res.authToken);
        this.props.onSuccessfulLogin();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    return (
      <form className='LoginForm' onSubmit={this.onSubmit}>
        {this.state.error ? <h5 className='error'>{this.state.error}</h5> : ''}
        <div className='group'>
          <label htmlFor='username'>Username</label>
          <input type='text' required name='username' />
          <label htmlFor='password'>Password</label>
          <input type='password' required name='password' />
          <div className='btn-style'>
            <button className='Login-Submit' type='submit'>
              Login
              <div class='fill-one'></div>
            </button>
          </div>
        </div>
      </form>
    );
  }
}
