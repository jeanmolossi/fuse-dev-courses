import { HttpResponse } from './http-response';

export type Methods = 'post' | 'get' | 'put' | 'delete';

export type HttpParams<BodyType, HeadersType = any> = {
  url: string;
  headers?: HeadersType;
  method: Methods;
  body?: BodyType;
};

export interface HttpClient<T, R> {
  request(params: HttpParams<T>): Promise<HttpResponse<R>>;
}
