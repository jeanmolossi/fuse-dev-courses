import { InvalidFieldError } from '@/validation/errors';
import { FieldValidation } from '@/validation/protocols/field-validation';

export class EmailValidation implements FieldValidation {
  constructor(readonly fieldName: string) {}

  validate(fieldValue: string): Error {
    return new RegExp(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi,
    ).test(fieldValue)
      ? null
      : new InvalidFieldError(this.fieldName);
  }
}
