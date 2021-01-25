export namespace AccountModel {
  export type User = {
    id: string;
    email: string;
  };

  export type AccessModel = {
    user: User;
    accessToken: string;
  };

  export type Credentials = {
    email: string;
    password: string;
  };
}
