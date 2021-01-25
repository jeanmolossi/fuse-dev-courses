import { AccountModel } from '@/domain/models';

export type Credentials = {
  email: string;
  password: string;
};

export interface AuthenticationUseCase {
  auth(credentials: Credentials): Promise<AccountModel.AccessModel>;
}
