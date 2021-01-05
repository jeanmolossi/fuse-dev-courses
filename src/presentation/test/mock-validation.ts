import { Validation } from '../protocols/validation';

export class ValidationSpy implements Validation {
  errorMessage: string[] = [];
  fieldName: string;
  fieldValue: string | boolean | number;

  validate(fieldName: string, fieldValue: string | boolean | number): string[] {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;

    return this.errorMessage;
  }
}
