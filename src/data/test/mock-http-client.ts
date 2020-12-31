import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
  HttpStatusCode,
} from '@/data/protocols/http';

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
