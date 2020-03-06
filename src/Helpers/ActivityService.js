import config from '../config';

const ActivityService = {
  // api call that handles create activity request
  createActivity(auth, newActivity) {
    return fetch(`${config.API_ENDPOINT}/activities`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${auth}`
      },
      body: JSON.stringify(newActivity)
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  // handles the delete request for an activity
  delete(auth, id) {
    return fetch(`${config.API_ENDPOINT}/activities/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${auth}`
      }
    });
  },
  // api call to get all activities
  getAllActivities(auth) {
    return fetch(`${config.API_ENDPOINT}/activities`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${auth}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  }
};

export default ActivityService;
