import axios from 'axios';
import { HttpPostParams } from '@/data/protocols/http';

export class AxiosHttpClient {
  async post(params: HttpPostParams<any>): Promise<void> {
    const { url } = params;

    await axios(url);
  }
}
