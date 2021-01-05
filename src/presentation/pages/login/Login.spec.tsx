import React from 'react';
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import faker from 'faker';
import { BrowserRouter } from 'react-router-dom';
import { ValidationSpy } from '@/presentation/test';
import Login from './Login';

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

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

    const fakeEmail = faker.internet.email();

    fireEvent.input(emailField, {
      target: { value: fakeEmail },
    });

    expect(validationSpy.fieldName).toBe('email');
    expect(validationSpy.fieldValue).toBe(fakeEmail);

    const passwordField = sut
      .getByTestId('password-password-field')
      .querySelector('input');

    const fakePassword = faker.internet.password();

    fireEvent.input(passwordField, { target: { value: fakePassword } });

    expect(validationSpy.fieldName).toBe('password');
    expect(validationSpy.fieldValue).toBe(fakePassword);
  });

  test('Should show email error if Validation fails', () => {
    const { sut, validationSpy } = makeSut();

    const errorMessage = faker.random.words();
    validationSpy.errorMessage[0] = errorMessage;

    const emailBlock = sut.getByTestId('email-email-field');

    const emailField = emailBlock.querySelector('input');

    const fakeEmail = faker.internet.email();

    fireEvent.input(emailField, {
      target: { value: fakeEmail },
    });

    const emailError = emailBlock.querySelector('p.Mui-error');

    expect(emailError.textContent).toBe(errorMessage);
  });
});
