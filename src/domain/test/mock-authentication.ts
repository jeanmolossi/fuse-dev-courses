import faker from 'faker';
import { Credentials } from '../usecases/authentication';

export const mockAuthentication = (): Credentials => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});
