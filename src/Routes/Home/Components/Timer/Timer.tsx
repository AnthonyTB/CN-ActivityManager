import React, { Component } from "react";
import "./Timer.css";
import { Context } from "../../../../Components/Context/Context";
import { IActivity } from "../../../../interfaces";

interface IState {
  count: number;
  isCounting: boolean;
  isEditing: boolean;
  isShowingBtns: boolean;
}

interface IProps {
  setActivity: (arg0: IActivity) => void;
}

export default class Timer extends Component<IProps> {
  static contextType = Context;
  private interval: any;

  state: IState = {
    count: 0,
    isCounting: false,
    isEditing: false,
    isShowingBtns: false,
  };

  editToggle = () => {
    this.setState((prevState: IState) => ({
      isEditing: !prevState.isEditing,
    }));
  };

  pickRandomActivity = (array: IActivity[]) => {
    const idx = Math.floor(Math.random() * Math.floor(array.length));
    const activity = array[idx];
    this.props.setActivity(activity);
  };

  format(seconds: number) {
    let hrs = ~~(seconds / 3600);
    let mins = ~~((seconds % 3600) / 60);
    let secs = ~~seconds % 60;
    let ret = "";
    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  }

  counter = () => {
    if (this.state.isCounting && this.state.count !== 0) {
      this.interval = setInterval(() => {
        this.setState((prevState: IState) => ({
          count: prevState.count - 1,
        }));
      }, 1000);
    }
  };

  async componentDidUpdate() {
    if (this.state.count === 1 && this.state.isCounting) {
      await this.clear();
      this.pickRandomActivity(this.context.activities);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onStart = async (ev: any) => {
    ev.preventDefault();
    clearInterval(this.interval);
    const { hours, minutes } = ev.target;
    if (this.state.isEditing) {
      let newHour = Number(hours.value);
      let newMin = Number(minutes.value);
      if (newHour !== 0) {
        newHour = Math.floor(newHour * 60 * 60);
      }
      if (newMin !== 0) {
        newMin = Math.floor(newMin * 60);
      }
      console.log(newHour, newMin);
      const time = newHour + newMin;
      this.setState(
        { count: time, isCounting: true, isShowingBtns: true },
        this.counter
      );
      this.editToggle();
    } else if (!this.state.isCounting) {
      await this.setState({ isCounting: true });
      this.counter();
    }
  };

  resumeBtn = () => {
    return (
      <button type="button" className="timer-resume" onClick={this.onStart}>
        resume
        <div className="fill-one"></div>
      </button>
    );
  };

  pause = () => {
    this.setState({ isCounting: false });
    clearInterval(this.interval);
  };

  clear = () => {
    clearInterval(this.interval);
    this.setState({ isCounting: false, count: 0, isShowingBtns: false });
  };

  pauseBtn = () => {
    return (
      <button type="button" className="timer-resume" onClick={this.pause}>
        pause
        <div className="fill-one"></div>
      </button>
    );
  };

  invisBtn = () => {
    return <button type="button" className="timer-invis"></button>;
  };

  renderBtns = () =>
    this.state.isCounting ? this.pauseBtn() : this.resumeBtn();

  render() {
    return (
      <form className="Timer" onSubmit={this.onStart}>
        <div className="timer-section">{this.format(this.state.count)}</div>
        <div className="group">
          <div className="btn-row">
            <button onClick={this.clear} type="button" className="timer-cancel">
              clear
              <div className="fill-one"></div>
            </button>
            <button
              onClick={this.editToggle}
              type="button"
              className="timer-edit"
            >
              edit
              <div className="fill-one"></div>
            </button>
            {this.state.isShowingBtns ? this.renderBtns() : this.invisBtn()}
          </div>
          <div className={`editing ${this.state.isEditing}`}>
            <label htmlFor="hours">Hour(s)</label>
            <input
              type="number"
              name="hours"
              defaultValue="0"
              min="0"
              max="24"
            />
            <label htmlFor="minutes">Minute(s)</label>
            <input
              type="number"
              name="minutes"
              defaultValue="0"
              min="0"
              max="1440"
            />
            <button type="submit" className="timer-start">
              start
              <div className="fill-one"></div>
            </button>
          </div>
        </div>
      </form>
    );
  }
}
