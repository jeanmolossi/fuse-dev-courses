import React from 'react';
import { Login } from '@/presentation/pages';
import {
  ValidationBuilder,
  ValidationComposite,
} from '@/validation/validators';

const LoginFactory: React.FC = () => {
  const fieldsValidators = [
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().build(),
  ];

  const validation = ValidationComposite.build(fieldsValidators);

  return <Login validation={validation} />;
};

export default LoginFactory;
