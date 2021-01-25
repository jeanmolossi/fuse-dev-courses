import faker from 'faker';
import { AccountModel } from '@/domain/models';

export const mockAccountCredentials = (): AccountModel.Credentials => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAuthentication = (): AccountModel.Credentials => ({
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
