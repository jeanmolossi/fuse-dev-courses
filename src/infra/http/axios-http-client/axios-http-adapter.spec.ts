import { mockPostRequest } from '@/data/test';
import { mockAxios } from '@/infra/test';
import { AxiosHttpClient } from './axios-http-adapter';

jest.mock('axios');

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: ReturnType<typeof mockAxios>;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();

  return {
    sut,
    mockedAxios,
  };
};

describe('AxiosHttpClient', () => {
  test('Should call axios with correct URL and verb', async () => {
    const request = mockPostRequest();

    const { sut, mockedAxios } = makeSut();

    await sut.post(request);

    const { url, body } = request;

    expect(mockedAxios.post).toHaveBeenCalledWith(url, body);
  });

  test('Should return the correct statusCode and body', () => {
    const request = mockPostRequest();

    const { sut, mockedAxios } = makeSut();

    const promise = sut.post(request);

    const promiseResolvedValue = mockedAxios.post.mock.results[0].value;

    expect(promise).toEqual(promiseResolvedValue);
  });
});
