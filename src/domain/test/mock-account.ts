import faker from 'faker';
import { AccountModel } from '@/domain/models';
import { Credentials } from '@/domain/usecases';

export const mockAuthentication = (): Credentials => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.uuid(),
});
