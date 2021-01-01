import axios from 'axios';
import faker from 'faker';
import { HttpPostParams } from '@/data/protocols/http';
import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

describe('FetchHttpClient', () => {
  test('Should call fetch with correct URL and verb', async () => {
    const request = mockPostRequest();

    const sut = makeSut();

    await sut.post(request);

    const { url, body } = request;

    expect(mockedAxios.post).toHaveBeenCalledWith(url, body);
  });
});
