import { HttpPostClient } from '@/data/protocols/http/http-post-client';
import { Credentials } from '@/domain/usecases/authentication';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient,
  ) {}

  async auth(credentials: Credentials): Promise<void> {
    await this.httpPostClient.post({ url: this.url, body: credentials });
  }
}
