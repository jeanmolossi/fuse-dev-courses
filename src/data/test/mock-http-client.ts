import {
  HttpPostClient,
  HttpPostParams,
} from '@/data/protocols/http/http-post-client';
import {
  HttpResponse,
  HttpStatusCode,
} from '@/data/protocols/http/http-response';

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string;

  body?: T;

  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.OK,
  };

  async post(params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    const { url, body } = params;

    this.url = url;
    this.body = body;
    return Promise.resolve(this.response);
  }
}
