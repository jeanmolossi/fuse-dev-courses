import React from 'react';
import { Login } from '@/presentation/pages';
import { makeLoginValidationFactory } from './login-validation-factory';

const LoginFactory: React.FC = () => {
  const validation = makeLoginValidationFactory();

  return <Login validation={validation} />;
};

export default LoginFactory;
