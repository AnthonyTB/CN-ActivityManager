import React from 'react';
import './ActivityCreation.css';
import ActivityService from '../../Helpers/ActivityService';
import TokenService from '../../Helpers/TokenService';
import Context from '../../Components/Context/Context';

export default class ActivityCreation extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  submitActivity = ev => {
    ev.preventDefault();
    const { Title, Description, Creator } = ev.target;
    const body = {
      Title: Title.value,
      Description: Description.value,
      Creator: Creator.value,
      Date_Created: new Date()
    };
    ActivityService.createActivity(TokenService.getAuthToken(), body)
      .then(() => this.props.creationToggle)
      .then(activity => this.context.updateActivitesList(activity))
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    return (
      <form className='ActivityCreation' onSubmit={this.submitActivity}>
        {this.state.error ? <h5 className='error'>{this.state.error}</h5> : ''}
        <div className='group'>
          <label htmlFor='Title'>Title</label>
          <input type='text' required name='Title' />
          <label htmlFor='Description'>Description</label>
          <input type='text' required name='Description' />
          <label htmlFor='Creator'>Your name</label>
          <input type='text' required name='Creator' />
          <div className='btn-row'>
            <button
              onClick={this.props.creationToggle}
              className='activity-cancel'
            >
              cancel
              <div class='fill-one'></div>
            </button>
            <button type='submit' className='activity-submit'>
              create
              <div class='fill-one'></div>
            </button>
          </div>
        </div>
      </form>
    );
  }
}
