import React from 'react';
import './Boundary.css';
import { Link } from 'react-router-dom';

export default class Boundary extends React.Component {
  render() {
    return (
      <div className='Boundary'>
        <div className='container'>
          <h1>Hey, Looks like you're a lost ninja</h1>
          <Link to='/'>Back to the Dojo</Link>
        </div>
      </div>
    );
  }
}
