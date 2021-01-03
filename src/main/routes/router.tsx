import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login, Dashboard } from '@/main/factories/pages';

export const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
};
