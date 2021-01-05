import { Validation } from '@/presentation/protocols/validation';
import { FieldValidation } from '@/validation/protocols/field-validation';

export class ValidationComposite implements Validation {
  private constructor(private readonly validators: FieldValidation[]) {}

  static build(validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators);
  }

  validate(fieldName: string, fieldValue: string | boolean | number): string[] {
    const validators = this.validators.filter(
      currentValidator => currentValidator.fieldName === fieldName,
    );

    const errors: string[] = [];

    for (const singleValidator of validators) {
      const error = singleValidator.validate(fieldValue);

      if (error) {
        errors.push(error.message);
      }
    }

    return errors;
  }
}
