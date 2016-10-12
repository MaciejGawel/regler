import Constants              from '../constants';
import { httpGet, httpPost }  from '../utils';

const Actions = {
  fetchEvents: () =>
    (dispatch) => {
      dispatch({ type: Constants.EVENTS_FETCHING });

      httpGet('/api/v1/events')
      .then((data) => {
        dispatch({
          type: Constants.EVENTS_RECEIVED,
          ownedEvents: data.owned_events,
        });
      });
    },

  create: requestData =>
    (dispatch) => {
      httpPost('/api/v1/events', { event: requestData })
      .then((data) => {
        dispatch({
          type: Constants.EVENTS_NEW_EVENT_CREATED,
          event: data,
        });
      })
      .catch((error) => {
        error.response.json()
        .then((json) => {
          dispatch({
            type: Constants.EVENTS_CREATE_ERROR,
            errors: json.errors,
          });
        });
      });
    },

  showForm: show =>
    (dispatch) => {
      dispatch({
        type: Constants.EVENTS_SHOW_FORM,
        show,
      });
    },

  reset: () =>
    (dispatch) => {
      dispatch({
        type: Constants.EVENTS_RESET,
      });
    },
};

export default Actions;
