import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '@/presentation/pages/login/Login';

export const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
      </Switch>
    </BrowserRouter>
  );
};
