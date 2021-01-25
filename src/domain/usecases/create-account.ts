import { AccountModel } from '../models';

export interface CreateAccount {
  createAccountWithEmailAndPassword: (
    params: CreateAccountModel.Credentials,
  ) => Promise<CreateAccountModel.UserAccountModel>;
}

export namespace CreateAccountModel {
  export type Credentials = AccountModel.Credentials;

  export type UserAccountModel = AccountModel.User;
}
