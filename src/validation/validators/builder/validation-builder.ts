import { FieldValidation } from '@/validation/protocols/field-validation';
import {
  EmailValidation,
  RequiredFieldValidation,
  MinLengthFieldValidation,
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

  min(length: number): ValidationBuilder {
    const minLengthValidation = new MinLengthFieldValidation(
      this.fieldName,
      length,
    );

    this.validators.push(minLengthValidation);
    return this;
  }

  build(): FieldValidation[] {
    return this.validators;
  }
}
