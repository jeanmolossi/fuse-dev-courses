import faker from 'faker';
import { AccountModel } from '../models/account-model';
import { Credentials } from '../usecases/authentication';

export const mockAuthentication = (): Credentials => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.uuid(),
});
