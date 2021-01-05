import faker from 'faker';
import { InvalidFieldError } from '@/validation/errors';
import { EmailValidation } from './email-validation';

const makeSut = () => {
  const fieldName = faker.random.word();
  const sut = new EmailValidation(fieldName);

  return {
    sut,
    fieldName,
  };
};

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const { sut, fieldName } = makeSut();

    const error = sut.validate(faker.random.word());

    expect(error).toEqual(new InvalidFieldError(fieldName));
  });

  test('Should return falsy if email is valid', () => {
    const { sut } = makeSut();

    const error = sut.validate(faker.internet.email());

    expect(error).toBeFalsy();
  });
});
