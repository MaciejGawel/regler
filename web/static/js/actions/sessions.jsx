import { push }               from 'react-router-redux';
import Constants              from '../constants';
import { httpGet, httpPost }  from '../utils';

export function setCurrentUser(dispatch, user) {
  // Connect to socket

  dispatch({
    type: Constants.CURRENT_USER,
    currentUser: user,
  });
}

const Actions = {
  signIn: (email, password) => {
    return (dispatch) => {
      const requestData = {
        session: {
          email,
          password,
        },
      };

      httpPost('/api/v1/sessions', requestData)
      .then((data) => {
        localStorage.setItem('phoenixAuthToken', data.jwt);
        setCurrentUser(dispatch, data.user);
        dispatch(push('/'));
      })
      .catch((error) => {
        error.response.json()
        .then((errorJSON) => {
          dispatch({
            type: Constants.SESSIONS_ERROR,
            error: errorJSON.error,
          });
        });
      });
    };
  },

  currentUser: () => {
    return (dispatch) => {
      httpGet('/api/v1/current_user')
      .then((data) => {
        setCurrentUser(dispatch, data);
      })
      .catch(() => {
        dispatch(push('/sign_in'));
      });
    };
  },
};

export default Actions;
