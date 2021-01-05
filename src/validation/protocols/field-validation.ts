export interface FieldValidation {
  fieldName: string;

  validate: (value: string | boolean | number) => Error;
}
