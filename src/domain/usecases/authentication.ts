import { AccountModel } from '../models/account-model';

export type Credentials = {
  email: string;
  password: string;
};

export interface AuthenticationUseCase {
  auth(credentials: Credentials): Promise<AccountModel>;
}
