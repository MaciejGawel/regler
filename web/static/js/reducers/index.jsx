import { combineReducers }  from 'redux';
import { routerReducer }    from 'react-router-redux';
import registration         from './registration';
import session              from './session';
import events              from './events';

export default combineReducers({
  routing: routerReducer,
  registration,
  session,
  events,
});
