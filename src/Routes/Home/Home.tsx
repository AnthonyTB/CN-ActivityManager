import React, { FunctionComponent, useContext, useState } from "react";
import "./Home.css";
import ActivityContainer from "./Components/ActivityContainer/ActivityContainer";
import Logo from "../../Assets/logo.png";
import ActivityCreation from "./Components/ActivityCreation/ActivityCreation";
import Timer from "./Components/Timer/Timer";
import { Context } from "../../Components/Context/Context";
import { RouteComponentProps } from "react-router-dom";
import { IActivity } from "../../interfaces";

const Home: FunctionComponent<RouteComponentProps> = () => {
  const { userData } = useContext(Context);
  const [isCreating, setCreating] = useState<boolean>(false);
  const [activity, setActivity] = useState<IActivity | null>(null);

  const timer = () => {
    if (userData.id === 1 || userData.id === 3) {
      return <Timer setActivity={setActivity} />;
    }
  };

  const renderActivity = () => {
    return (
      <div className="specialActivity">
        <div className="container">
          <h5>{activity.title}</h5>
          <p className="desc">{activity.description}</p>
          <div className="meta">
            <p className="created">
              {new Date(activity.date_created).toLocaleString().split(",")[0]}
            </p>
            <p className="creator">{activity.creator}</p>
          </div>
          <div className="group">
            <button
              type="button"
              className="close-activity"
              onClick={() => setCreating(false)}
            >
              close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="Home">
      <img src={Logo} className="Home-Image" alt="Code Ninjas Logo" />
      {timer()}
      {activity !== null ? renderActivity() : ""}
      {isCreating ? (
        <ActivityCreation creationToggle={() => setCreating(!isCreating)} />
      ) : (
        ""
      )}
      <ActivityContainer
        creationToggle={() => setCreating(!isCreating)}
        isCreating={isCreating}
      />
    </div>
  );
};

export default Home;
