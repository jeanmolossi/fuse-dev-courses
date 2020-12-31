import {
  HttpPostClient,
  HttpPostParams,
} from '../protocols/http/http-post-client';

export class HttpPostClientSpy implements HttpPostClient {
  url?: string;

  body?: object;

  async post(params: HttpPostParams): Promise<void> {
    const { url, body } = params;

    this.url = url;
    this.body = body;
    return Promise.resolve();
  }
}
