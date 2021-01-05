import React from 'react';
import ReactDOM from 'react-dom';
import { Login, Dashboard } from '@/main/factories/pages';
import { Router } from '@/main/routes/router';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import '@/presentation/styles/global.scss';

ReactDOM.render(
  <Router Login={Login} Dashboard={Dashboard} />,
  document.getElementById('root'),
);
