import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import '@/presentation/styles/global.scss';
import './config/firebase';
import { AppFactory } from './factories/app';

ReactDOM.render(<AppFactory />, document.getElementById('root'));
