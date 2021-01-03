import React from 'react';
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Validation } from '@/presentation/protocols/validation';
import Login from './Login';

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

class ValidationSpy implements Validation {
  errorMessage: string;
  input: unknown;

  validate(input: unknown): string {
    this.input = input;
    return this.errorMessage;
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = render(
    <BrowserRouter>
      <Login validation={validationSpy} />
    </BrowserRouter>,
  );

  return {
    sut,
    validationSpy,
  };
};

describe('Login Component', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const { sut } = makeSut();
    const emailField = sut
      .getByTestId('email-email-field')
      .querySelector('input');
    const passwordField = sut
      .getByTestId('password-password-field')
      .querySelector('input');
    const submitButton = sut.getByTestId('submit-button') as HTMLButtonElement;

    expect(!!emailField).toBe(true);
    expect(emailField.nodeValue).toBeNull();
    expect(!!passwordField).toBe(true);
    expect(passwordField.nodeValue).toBeNull();
    expect(!!submitButton).toBe(true);
    expect(submitButton.disabled).toBe(true);
  });

  test('Should call Validation with correct value', () => {
    const { sut, validationSpy } = makeSut();

    const emailField = sut
      .getByTestId('email-email-field')
      .querySelector('input');

    fireEvent.input(emailField, {
      target: { value: 'valid-email' },
    });

    expect(validationSpy.input).toEqual({
      email: 'valid-email',
    });

    const passwordField = sut
      .getByTestId('password-password-field')
      .querySelector('input');

    fireEvent.input(passwordField, { target: { value: 'valid-password' } });

    expect(validationSpy.input).toEqual({
      password: 'valid-password',
    });
  });
});
