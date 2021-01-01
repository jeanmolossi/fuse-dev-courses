import axios from 'axios';
import faker from 'faker';
import { HttpPostParams } from '@/data/protocols/http';
import { AxiosHttpClient } from './axios-http-adapter';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockedAxiosResult = {
  data: faker.random.objectElement(),
  status: faker.random.number(),
};

mockedAxios.post.mockResolvedValue(mockedAxiosResult);

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

const mockPostRequest = (): HttpPostParams<string> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

describe('AxiosHttpClient', () => {
  test('Should call axios with correct URL and verb', async () => {
    const request = mockPostRequest();

    const sut = makeSut();

    await sut.post(request);

    const { url, body } = request;

    expect(mockedAxios.post).toHaveBeenCalledWith(url, body);
  });

  test('Should return the correct statusCode and body', async () => {
    const request = mockPostRequest();

    const sut = makeSut();

    const httpResponse = await sut.post(request);

    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data,
    });
  });
});
