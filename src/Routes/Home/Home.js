import React from 'react';
import './Home.css';
import ActivityContainer from '../../Components/ActivityContainer/ActivityContainer';
import Logo from '../../Assets/logo.png';
import ActivityCreation from '../../Components/ActivityCreation/ActivityCreation';
import Timer from '../../Components/Timer/Timer';
import Context from '../../Components/Context/Context';

export default class Home extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      isCreating: false,
      activity: null
    };
  }

  setActivity = input => {
    this.setState({ activity: input });
  };

  creationToggle = () => {
    this.setState(prevState => ({ isCreating: !prevState.isCreating }));
  };

  timer = () => {
    if (this.context.user.id === 1 || this.context.user.id === 3) {
      return <Timer setActivity={this.setActivity} />;
    }
  };

  close = () => {
    this.setState({ activity: null });
  };

  renderActivity = () => {
    return (
      <div className='specialActivity'>
        <div className='container'>
          <h5>{this.state.activity.title}</h5>
          <p className='desc'>{this.state.activity.description}</p>
          <div className='meta'>
            <p className='created'>
              {
                new Date(this.state.activity.date_created)
                  .toLocaleString()
                  .split(',')[0]
              }
            </p>
            <p className='creator'>{this.state.activity.creator}</p>
          </div>
          <div className='group'>
            <button
              type='button'
              className='close-activity'
              onClick={this.close}
            >
              close
            </button>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className='Home'>
        <img src={Logo} className='Home-Image' alt='Code Ninjas Logo' />
        {this.timer()}
        {this.state.activity !== null ? this.renderActivity() : ''}
        {this.state.isCreating ? (
          <ActivityCreation creationToggle={this.creationToggle} />
        ) : (
          ''
        )}
        <ActivityContainer
          creationToggle={this.creationToggle}
          isCreating={this.state.isCreating}
        />
      </div>
    );
  }
}
