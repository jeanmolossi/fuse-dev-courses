import {
  ValidationBuilder,
  ValidationComposite,
} from '@/validation/validators';
import { makeLoginValidationFactory } from './login-validation-factory';

describe('LoginValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidationFactory();

    expect(composite).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().build(),
      ]),
    );
  });
});
