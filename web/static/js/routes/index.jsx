import { Route, IndexRoute }  from 'react-router';
import React                  from 'react';
import MainLayout             from '../layouts/main';
import AuthenticatedContainer from '../containers/authenticated';
import RegistrationsNew       from '../views/registrations/new';
import SessionNew             from '../views/sessions/new';
import HomeIndex              from '../views/home/index';
import Actions                from '../actions/sessions';

export default function configRoutes(store) {
  const ensureAuthenticated = (nextState, replace, callback) => {
    const { dispatch } = store;
    const { session } = store.getState();
    const { currentUser } = session;

    if (!currentUser && localStorage.getItem('phoenixAuthToken')) {
      dispatch(Actions.currentUser());
    } else if (!localStorage.getItem('phoenixAuthToken')) {
      replace('/sign_in');
    }

    callback();
  };

  const ensureUnauthenticated = (nextState, replace, callback) => {
    if (localStorage.getItem('phoenixAuthToken')) {
      replace('/');
    }

    callback();
  };

  return (
    <Route component={MainLayout}>
      <Route path="/sign_up" component={RegistrationsNew} onEnter={ensureUnauthenticated} />
      <Route path="/sign_in" component={SessionNew} onEnter={ensureUnauthenticated} />

      <Route path="/" component={AuthenticatedContainer} onEnter={ensureAuthenticated}>
        <IndexRoute component={HomeIndex} />
      </Route>
    </Route>
  );
}
