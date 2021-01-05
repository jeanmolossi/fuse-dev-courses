import { FieldValidation } from '@/validation/protocols/field-validation';
import {
  EmailValidation,
  RequiredFieldValidation,
} from '@/validation/validators';

export class ValidationBuilder {
  private readonly validators: FieldValidation[] = [];

  private constructor(readonly fieldName: string) {}

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName);
  }

  required(): ValidationBuilder {
    const requiredValidation = new RequiredFieldValidation(this.fieldName);

    this.validators.push(requiredValidation);

    return this;
  }

  email(): ValidationBuilder {
    const emailValidation = new EmailValidation(this.fieldName);

    this.validators.push(emailValidation);
    return this;
  }

  build(): FieldValidation[] {
    return this.validators;
  }
}
