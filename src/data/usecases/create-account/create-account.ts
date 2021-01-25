import { HttpClient, HttpStatusCode } from '@/data/protocols/http';
import { UnexpectedError } from '@/domain/errors';
import { CreateAccount, CreateAccountModel } from '@/domain/usecases';

export class CreateAccountUseCase implements CreateAccount {
  constructor(
    private readonly httpClient: HttpClient<
      CreateAccountModel.Credentials,
      CreateAccountModel.UserAccountModel
    >,
  ) {}

  async createAccountWithEmailAndPassword(
    credentials: CreateAccountModel.Credentials,
  ): Promise<CreateAccountModel.UserAccountModel> {
    const httpResponse = await this.httpClient.request({
      url: '/user',
      method: 'post',
      body: credentials,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.OK:
        return httpResponse.body;
      default:
        throw new UnexpectedError();
    }
  }
}
