import faker from 'faker';
import { AccountModel } from '@/domain/models';
import { Credentials } from '@/domain/usecases';

export const mockAuthentication = (): Credentials => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModelUser = (): AccountModel.User => ({
  id: faker.random.uuid(),
  email: faker.internet.email(),
});

export const mockAccountModel = (): AccountModel.AccessModel => ({
  accessToken: faker.random.uuid(),
  user: mockAccountModelUser(),
});
