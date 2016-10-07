import { push }     from 'react-router-redux';
import Constants    from '../constants';
import { httpPost } from '../utils';

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
        // setCurrentUser(dispatch, data.user);
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
};

export default Actions;
