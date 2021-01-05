import faker from 'faker';
import { FieldValidationSpy } from '@/validation/test';
import { ValidationComposite } from './validation-composite';

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationsSpy: FieldValidationSpy[];
};

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName),
  ];
  const sut = ValidationComposite.build(fieldValidationsSpy);

  return {
    sut,
    fieldValidationsSpy,
  };
};

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldName = faker.database.column();

    const { sut, fieldValidationsSpy } = makeSut(fieldName);

    fieldValidationsSpy[0].error = new Error('First_error_message');
    fieldValidationsSpy[1].error = new Error('Second_error_message');

    const errors = sut.validate(fieldName, 'invalid-value');

    expect(errors).toEqual(['First_error_message', 'Second_error_message']);
  });

  test('Should return falsy if validations pass', () => {
    const fieldName = faker.database.column();

    const { sut } = makeSut(fieldName);

    const error = sut.validate(fieldName, 'valid-value');

    expect(error.length).toBeFalsy();
  });
});
