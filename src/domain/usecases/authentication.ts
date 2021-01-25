import { AccountModel } from '@/domain/models';

export interface AuthenticationUseCase {
  auth(
    credentials: AccountModel.Credentials,
  ): Promise<AccountModel.AccessModel>;
}
