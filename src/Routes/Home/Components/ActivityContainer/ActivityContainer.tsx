import React, {
  FunctionComponent,
  useEffect,
  useState,
  useContext,
} from "react";
import "./ActivityContainer.css";
import ActivityService from "../../../../Helpers/ActivityService";
import TokenService from "../../../../Helpers/TokenService";
import { Context } from "../../../../Components/Context/Context";
import { IActivity } from "../../../../interfaces";

interface IProps {
  isCreating: boolean;
  creationToggle: () => void;
}

const ActivityContainer: FunctionComponent<IProps> = (props) => {
  const { dataSetter, activities, userData } = useContext(Context);

  const [isAdmin, setAdmin] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ActivityService.getAllActivities(TokenService.getAuthToken())
      .then((res) => dataSetter("activities", res))
      .then(() => setLoading(false))
      .then(() => {
        if (userData.id === 1 || userData.id === 3) {
          setAdmin(true);
        }
      });
  }, []);

  const deleteActivity = (ev: React.MouseEvent<HTMLElement>): void => {
    const { dataset } = ev.currentTarget;
    ActivityService.delete(TokenService.getAuthToken(), dataset.id)
      .then(() => ActivityService.getAllActivities(TokenService.getAuthToken()))
      .then((response) => dataSetter("activities", response))
      .catch((res) => {
        setError(res.error);
      });
  };

  return (
    <div className="ActivityContainer">
      {error ? <h3 className="error">{error}</h3> : ""}
      {isLoading ? (
        <h3>Loading..</h3>
      ) : (
        <ul>
          {props.isCreating ? (
            ""
          ) : (
            <button onClick={props.creationToggle} className="create-button">
              <i className="fas fa-plus"></i>
            </button>
          )}
          {activities.map((activity: IActivity) => {
            return (
              <li key={activity.id}>
                {isAdmin ? (
                  <button
                    className="delete-btn"
                    onClick={deleteActivity}
                    data-id={activity.id}
                    type="button"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                ) : (
                  ""
                )}
                <h5>{activity.title}</h5>
                <p className="desc">{activity.description}</p>
                <div className="meta">
                  <p className="created">
                    {
                      new Date(activity.date_created)
                        .toLocaleString()
                        .split(",")[0]
                    }
                  </p>
                  <p className="creator">{activity.creator}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ActivityContainer;
