import { Route, IndexRoute }  from 'react-router';
import React                  from 'react';
import MainLayout             from '../layouts/main';
import RegistrationsNew       from '../views/registrations/new';
import SessionNew             from '../views/sessions/new';
import HomeIndex              from '../views/home/index';

export default function configRoutes() {
  return (
    <Route component={MainLayout}>
      <Route path="/sign_up" component={RegistrationsNew} />
      <Route path="/sign_in" component={SessionNew} />

      <Route path="/" component={HomeIndex} />
    </Route>
  );
}
