import React from 'react';
import './ActivityContainer.css';
import ActivityService from '../../Helpers/ActivityService';
import TokenService from '../../Helpers/TokenService';
import Context from '../Context/Context';

export default class ActivityContainer extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
      isLoading: true
    };
  }

  componentDidMount() {
    ActivityService.getAllActivities(TokenService.getAuthToken())
      .then(res => this.context.setActivities(res))
      .then(() => this.setState({ isLoading: false }))
      .then(() => {
        if (this.context.user.id === 1) {
          this.setState({ isAdmin: true });
        }
      });
  }

  delete = ev => {
    const { dataset } = ev.target;
    console.log(dataset);
  };

  render() {
    return (
      <div className='ActivityContainer'>
        {this.state.isLoading ? (
          <h3>Loading..</h3>
        ) : (
          <ul>
            {this.props.isCreating ? (
              ''
            ) : (
              <button
                onClick={this.props.creationToggle}
                className='create-button'
              >
                <i className='fas fa-plus'></i>
              </button>
            )}
            {this.context.activities.map(activity => {
              return (
                <li key={activity.id}>
                  {this.state.isAdmin ? (
                    <button
                      className='delete-btn'
                      onClick={this.delete}
                      data-id={activity.id}
                      type='button'
                    >
                      <i className='fas fa-trash-alt'></i>
                    </button>
                  ) : (
                    ''
                  )}
                  <h5>{activity.title}</h5>
                  <p className='desc'>{activity.description}</p>
                  <div className='meta'>
                    <p className='created'>
                      {
                        new Date(activity.date_created)
                          .toLocaleString()
                          .split(',')[0]
                      }
                    </p>
                    <p className='creator'>{activity.creator}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}
