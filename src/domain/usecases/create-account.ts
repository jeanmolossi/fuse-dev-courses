import { AccountModel } from '../models';

export interface CreateAccount {
  createAccountWithEmailAndPassword: (
    params: CreateAccountModel.Credentials,
  ) => CreateAccountModel.UserAccountModel;
}

export namespace CreateAccountModel {
  export type Credentials = AccountModel.Credentials;

  export type UserAccountModel = AccountModel.User;
}
