import { HttpPostClient } from '@/data/protocols/http/http-post-client';
import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import { Credentials } from '@/domain/usecases/authentication';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient,
  ) {}

  async auth(credentials: Credentials): Promise<void> {
    const httpRespose = await this.httpPostClient.post({
      url: this.url,
      body: credentials,
    });

    switch (httpRespose.statusCode) {
      case HttpStatusCode.OK:
        break;
      case HttpStatusCode.UNAUTHORIZED:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}
