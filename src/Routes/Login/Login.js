import React from 'react';
import LoginForm from '../../Components/LoginForm/LoginForm';
import Logo from '../../Assets/logo.png';
import './Login.css';

export default class Login extends React.Component {
  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  // when a user successfully logs in the app will push them to the app
  onSuccessfulLogin = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div className='Login'>
        <img src={Logo} className='Login-Image' alt='Code Ninjas Logo' />
        <h1>
          Hi<span className='alt-color'>-</span>YAH
          <span className='alt-color'>!</span>
        </h1>
        <LoginForm onSuccessfulLogin={this.onSuccessfulLogin} />
      </div>
    );
  }
}
