import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';
import { AuthenticationUseCase, Credentials } from '@/domain/usecases';

export class RemoteAuthentication implements AuthenticationUseCase {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<Credentials, AccountModel>,
  ) {}

  async auth(credentials: Credentials): Promise<AccountModel> {
    const httpRespose = await this.httpPostClient.post({
      url: this.url,
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
