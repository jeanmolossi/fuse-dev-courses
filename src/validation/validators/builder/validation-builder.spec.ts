import faker from 'faker';
import {
  EmailValidation,
  RequiredFieldValidation,
} from '@/validation/validators';
import { ValidationBuilder } from './validation-builder';

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const fakeFieldName = faker.database.column();

    const validations = ValidationBuilder.field(fakeFieldName)
      .required()
      .build();

    expect(validations).toEqual([new RequiredFieldValidation(fakeFieldName)]);
  });

  test('Should return EmailValidation', () => {
    const fakeFieldName = faker.database.column();

    const validations = ValidationBuilder.field(fakeFieldName).email().build();

    expect(validations).toEqual([new EmailValidation(fakeFieldName)]);
  });

  test('Should return RequiredFieldValidation and EmailValidation', () => {
    const fakeFieldName = faker.database.column();

    const validations = ValidationBuilder.field(fakeFieldName)
      .required()
      .email()
      .build();

    expect(validations).toEqual([
      new RequiredFieldValidation(fakeFieldName),
      new EmailValidation(fakeFieldName),
    ]);
  });
});
