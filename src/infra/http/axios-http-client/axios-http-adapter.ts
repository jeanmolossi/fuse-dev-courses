import axios from 'axios';
import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from '@/data/protocols/http';

export class AxiosHttpClient<T = unknown, R = unknown>
  implements HttpPostClient<T, R> {
  async post(params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    const { url, body } = params;

    const httpResponse = await axios.post<R>(url, body);

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };
  }
}
