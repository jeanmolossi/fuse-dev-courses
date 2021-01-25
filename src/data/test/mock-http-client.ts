import {
  HttpClient,
  HttpParams,
  HttpResponse,
  HttpStatusCode,
} from '@/data/protocols/http';

export class HttpClientSpy<T, R> implements HttpClient<T, R> {
  url?: string;
  headers?: any;
  body?: T;

  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.OK,
  };

  async request(params: HttpParams<T>): Promise<HttpResponse<R>> {
    const { url, body } = params;

    this.url = url;
    this.body = body;
    return Promise.resolve(this.response);
  }
}
