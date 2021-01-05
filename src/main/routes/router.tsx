import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

type RoutesOfRouter = {
  Login: React.FC;
  Dashboard: React.FC;
};

export const Router = ({ Login, Dashboard }: RoutesOfRouter): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
};
