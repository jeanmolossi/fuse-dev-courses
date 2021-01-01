import axios from 'axios';
import faker from 'faker';
import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('FetchHttpClient', () => {
  test('Should call fetch with correct URL', async () => {
    const url = faker.internet.url();

    const sut = new AxiosHttpClient();

    await sut.post({ url });

    expect(mockedAxios).toHaveBeenCalledWith(url);
  });
});
