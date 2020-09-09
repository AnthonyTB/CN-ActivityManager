import React, {
  FunctionComponent,
  useState,
  useEffect,
  useContext,
} from "react";
import "./Timer.css";
import { Context } from "../../../../Components/Context/Context";
import { IActivity } from "../../../../interfaces";

const Timer: FunctionComponent<any> = (props) => {
  const { activities } = useContext(Context);
  const [count, setCount] = useState<number>(0);
  const [isCounting, setCounting] = useState<boolean>(false);
  const [isEditing, setEditing] = useState<boolean>(false);
  const [isShowingBtns, setShowingBtns] = useState<boolean>(false);
  let interval: any;

  const pickRandomActivity = (array: IActivity[]) => {
    const idx = Math.floor(Math.random() * Math.floor(array.length));
    const activity = array[idx];
    props.setActivity(activity);
  };

  const format = (seconds: number) => {
    /* tslint:disable:no-bitwise */
    const hrs = ~~(seconds / 3600);
    const mins = ~~((seconds % 3600) / 60);
    const secs = ~~seconds % 60;
    /* tslint:enable:no-bitwise */
    let ret = "";
    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  };

  const counter = (): void => {
    if (isCounting && count !== 0) {
      interval = setInterval(() => setCount(count - 1), 1000);
    }
  };

  useEffect(() => {
    if (count === 1 && isCounting) {
      clear();
      pickRandomActivity(activities);
    }

    return clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, isCounting]);

  const onStart = (ev: any) => {
    ev.preventDefault();
    const { hours, minutes } = ev.target;
    if (isEditing) {
      let newHour = Number(hours.value);
      let newMin = Number(minutes.value);
      if (newHour !== 0) {
        newHour = Math.floor(newHour * 60 * 60);
      }
      if (newMin !== 0) {
        newMin = Math.floor(newMin * 60);
      }
      const time = newHour + newMin;
      setCount(time);
      setCounting(true);
      setShowingBtns(true);
      counter();
      setEditing(false);
    } else if (!isCounting) {
      setCounting(true);
      counter();
    }
  };

  const resumeBtn = () => {
    return (
      <button type="button" className="timer-resume" onClick={onStart}>
        resume
        <div className="fill-one"></div>
      </button>
    );
  };

  const pause = () => {
    setCounting(false);
    clearInterval(interval);
  };

  const clear = () => {
    clearInterval(interval);
    setCounting(false);
    setCount(0);
    setShowingBtns(false);
  };

  const pauseBtn = () => {
    return (
      <button type="button" className="timer-resume" onClick={pause}>
        pause
        <div className="fill-one"></div>
      </button>
    );
  };

  const invisBtn = () => {
    return <button type="button" className="timer-invis"></button>;
  };

  const renderBtns = () => (isCounting ? pauseBtn() : resumeBtn());

  return (
    <form className="Timer" onSubmit={onStart}>
      <div className="timer-section">{format(count)}</div>
      <div className="group">
        <div className="btn-row">
          <button onClick={clear} type="button" className="timer-cancel">
            clear
            <div className="fill-one"></div>
          </button>
          <button
            onClick={() => setEditing(!isEditing)}
            type="button"
            className="timer-edit"
          >
            edit
            <div className="fill-one"></div>
          </button>
          {isShowingBtns ? renderBtns() : invisBtn()}
        </div>
        <div className={`editing ${isEditing}`}>
          <label htmlFor="hours">Hour(s)</label>
          <input type="number" name="hours" defaultValue="0" min="0" max="24" />
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
};

export default Timer;
