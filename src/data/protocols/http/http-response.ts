/* eslint-disable no-unused-vars */
export enum HttpStatusCode {
  NO_CONTENT = 204,
  UNAUTHORIZED = 401,
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  body?: T;
};
