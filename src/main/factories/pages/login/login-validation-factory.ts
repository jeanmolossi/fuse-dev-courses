import {
  ValidationBuilder,
  ValidationComposite,
} from '@/validation/validators';

export const makeLoginValidationFactory = (): ValidationComposite => {
  const fieldsValidators = [
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().build(),
  ];

  return ValidationComposite.build(fieldsValidators);
};
