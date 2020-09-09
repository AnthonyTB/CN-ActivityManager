import React, { FunctionComponent, useState, useContext } from "react";
import "./ActivityCreation.css";
import ActivityService from "../../../../Helpers/ActivityService";
import TokenService from "../../../../Helpers/TokenService";
import { Context } from "../../../../Components/Context/Context";

interface IProps {
  isCreating?: boolean;
  creationToggle: () => void;
}

const ActivityCreation: FunctionComponent<IProps> = (props) => {
  const { dataSetter } = useContext(Context);
  const [error, setError] = useState<string | null>(null);

  const submitActivity = (ev: any): void => {
    ev.preventDefault();
    const { Title, Description, Creator } = ev.target;
    const body = {
      title: Title.value,
      description: Description.value,
      creator: Creator.value,
      date_created: new Date(),
    };
    if (TokenService.getAuthToken() !== null) {
      ActivityService.createActivity(TokenService.getAuthToken(), body)
        .then(() =>
          ActivityService.getAllActivities(TokenService.getAuthToken())
        )
        .then((response) => dataSetter("activities", response))
        .then(() => props.creationToggle())
        .catch((res) => {
          setError(res.error);
        });
    } else {
      setError("Invalid auth token try relogging in");
    }
  };

  return (
    <form className="ActivityCreation" onSubmit={submitActivity}>
      {error ? <h5 className="error">{error}</h5> : ""}
      <div className="group">
        <label htmlFor="Title">Title</label>
        <input type="text" required name="Title" />
        <label htmlFor="Description">Description</label>
        <input type="text" required name="Description" />
        <label htmlFor="Creator">Your name</label>
        <input type="text" required name="Creator" />
        <div className="btn-row">
          <button onClick={props.creationToggle} className="activity-cancel">
            cancel
            <div className="fill-one"></div>
          </button>
          <button type="submit" className="activity-submit">
            create
            <div className="fill-one"></div>
          </button>
        </div>
      </div>
    </form>
  );
};

export default ActivityCreation;
