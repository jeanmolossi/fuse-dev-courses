import { FieldValidation } from '@/validation/protocols/field-validation';

export class FieldValidationSpy implements FieldValidation {
  error: Error = null;

  constructor(readonly fieldName: string) {}

  validate(fieldValue: string | boolean | number): Error {
    return this.error;
  }
}
