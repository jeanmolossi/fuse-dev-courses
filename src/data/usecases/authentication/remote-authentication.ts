import { HttpClient, HttpStatusCode } from '@/data/protocols/http';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';
import { AuthenticationUseCase } from '@/domain/usecases';

export class RemoteAuthentication implements AuthenticationUseCase {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpClient<
      AccountModel.Credentials,
      AccountModel.AccessModel
    >,
  ) {}

  async auth(
    credentials: AccountModel.Credentials,
  ): Promise<AccountModel.AccessModel> {
    const httpRespose = await this.httpPostClient.request({
      url: this.url,
      method: 'post',
      body: credentials,
    });

    switch (httpRespose.statusCode) {
      case HttpStatusCode.OK:
        return httpRespose.body;
      case HttpStatusCode.UNAUTHORIZED:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}
