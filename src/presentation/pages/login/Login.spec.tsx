import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Validation } from '@/presentation/protocols/validation';
import Login from './Login';

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

class ValidationSpy implements Validation {
  errorMessage: string;

  validate(input: unknown): string {
    return this.errorMessage;
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );

  return {
    sut,
    validationSpy,
  };
};

describe('Login Component', () => {
  afterEach(() => {
    //
  });

  test('Should start with initial state', () => {
    const { sut } = makeSut();
    const emailField = sut.getByTestId('email-email-field');
    const passwordField = sut.getByTestId('password-password-field');

    expect(!!emailField).toBe(true);
    expect(!!passwordField).toBe(true);
  });
});
