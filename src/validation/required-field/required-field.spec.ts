import faker from 'faker';
import { RequiredFieldError } from '@/validation/errors';
import { RequiredFieldValidation } from '@/validation/required-field/required-field';

const makeSut = () => {
  const fieldName = faker.random.word();
  const requiredFieldValidation = new RequiredFieldValidation(fieldName);

  return {
    fieldName,
    sut: requiredFieldValidation,
  };
};

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const { sut, fieldName } = makeSut();

    const error = sut.validate('');
    expect(error).toEqual(new RequiredFieldError(fieldName));
  });
});
