import { MinLengthFieldError } from '@/validation/errors';
import { FieldValidation } from '@/validation/protocols/field-validation';

export class MinLengthFieldValidation implements FieldValidation {
  constructor(readonly fieldName: string, private readonly minLength: number) {}

  validate(value: string | number | boolean): Error {
    return typeof value !== 'string' || value.length < this.minLength
      ? new MinLengthFieldError(this.fieldName, this.minLength)
      : null;
  }
}
