import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UUIDErrorPage from '../views/UUIDErrorPage';
import ErrorPage from '../views/ErrorPage';
import App from '../App';

function Routes() {
  return (
    <Switch>
      <Route exact path="/"><App /></Route>
      <Route path="/uuid-error"><UUIDErrorPage /></Route>
      <Route path="*" component={ErrorPage} />

    </Switch>
  );
}

export default Routes;
