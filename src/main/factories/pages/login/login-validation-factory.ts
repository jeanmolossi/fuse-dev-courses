import {
  ValidationBuilder,
  ValidationComposite,
} from '@/validation/validators';

export const makeLoginValidationFactory = (): ValidationComposite => {
  const fieldsValidators = [
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(6).build(),
  ];

  return ValidationComposite.build(fieldsValidators);
};
