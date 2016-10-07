import { push }           from 'react-router-redux';
import Constants          from '../constants';
import { httpPost }       from '../utils';
// import { setCurrentUser } from './sessions';

const Actions = {
  signUp: (requestData) => {
    return (dispatch) => {
      httpPost('/api/v1/registrations', { user: requestData })
      .then((data) => {
        localStorage.setItem('phoenixAuthToken', data.jwt);

        // setCurrentUser(dispatch, data.user);

        dispatch(push('/'));
      })
      .catch((error) => {
        error.response.json()
        .then((errorJSON) => {
          dispatch({
            type: Constants.REGISTRATIONS_ERROR,
            errors: errorJSON.errors,
          });
        });
      });
    };
  },
};

export default Actions;