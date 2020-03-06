import React from 'react';
import './Plug.css';

export default class Plug extends React.Component {
  render() {
    return (
      <div className='Plug'>
        <span className='dev'>
          Developed By{' '}
          <a href='https://github.com/AnthonyTB' target='blank_'>
            <i className='fab fa-github'></i>
          </a>
        </span>
      </div>
    );
  }
}
