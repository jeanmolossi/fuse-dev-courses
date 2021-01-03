import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login } from '@/main/factories/pages';

export const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
      </Switch>
    </BrowserRouter>
  );
};
