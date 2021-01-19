import React from 'react';
import { Login, Dashboard } from '@/main/factories/pages';
import { Router } from '@/main/routes/router';
import ThemeFactory from './theme';

export const AppFactory: React.FC = () => {
  return (
    <ThemeFactory>
      <Router Login={Login} Dashboard={Dashboard} />
    </ThemeFactory>
  );
};
