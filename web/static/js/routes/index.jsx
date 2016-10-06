import { Route }        from 'react-router';
import React            from 'react';
import MainLayout       from '../layouts/main';
import RegistrationsNew from '../views/registrations/new';

export default function configRoutes() {
  return (
    <Route component={MainLayout}>
      <Route path="sign_up" component={RegistrationsNew} />
    </Route>
  );
}
