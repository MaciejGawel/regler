import { push }                           from 'react-router-redux';
import { Socket }                         from 'phoenix';
import Constants                          from '../constants';
import { httpGet, httpPost, httpDelete }  from '../utils';

export function setCurrentUser(dispatch, user) {
  const socket = new Socket('/socket', {
    params: { token: localStorage.getItem('phoenixAuthToken') },
  });

  socket.connect();

  const channel = socket.channel(`users:${user.id}`);

  if (channel.state !== 'joined') {
    channel.join().receive('ok', () => {
      dispatch({
        type: Constants.CURRENT_USER,
        currentUser: user,
        socket,
        channel,
      });
    });
  }
}

const Actions = {
  signIn: (email, password) =>
    (dispatch) => {
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
    },

  currentUser: () =>
    (dispatch) => {
      httpGet('/api/v1/current_user')
      .then((data) => {
        setCurrentUser(dispatch, data);
      })
      .catch(() => {
        dispatch(push('/sign_in'));
      });
    },

  signOut: () =>
    (dispatch) => {
      httpDelete('/api/v1/sessions')
      .then(() => {
        localStorage.removeItem('phoenixAuthToken');

        dispatch({ type: Constants.USER_SIGNED_OUT });
        dispatch(push('/sign_in'));
      });
    },
};

export default Actions;
