import config from "../config";
import { IActivity } from "../interfaces";

const ActivityService = {
  // api call that handles create activity request
  createActivity(auth: any, newActivity: IActivity) {
    return fetch(`${config.API_ENDPOINT}/activities`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
      body: JSON.stringify(newActivity),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  // handles the delete request for an activity
  delete(auth: any, id: number) {
    return fetch(`${config.API_ENDPOINT}/activities/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    });
  },
  // api call to get all activities
  getAllActivities(auth: any) {
    return fetch(`${config.API_ENDPOINT}/activities`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default ActivityService;
