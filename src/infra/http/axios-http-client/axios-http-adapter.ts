import axios from 'axios';
import { HttpClient, HttpParams, HttpResponse } from '@/data/protocols/http';

export class AxiosHttpClient<T = unknown, R = unknown>
  implements HttpClient<T, R> {
  async request(params: HttpParams<T>): Promise<HttpResponse<R>> {
    const { url, method, body, headers } = params;

    const httpResponse = await axios.request<R>({
      url,
      method,
      headers,
      data: body,
    });

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };
  }
}
