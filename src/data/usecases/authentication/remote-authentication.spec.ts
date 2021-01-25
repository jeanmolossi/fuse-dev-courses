import faker from 'faker';
import { HttpStatusCode } from '@/data/protocols/http';
import { HttpClientSpy } from '@/data/test';
import { UnexpectedError } from '@/domain/errors';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { AccountModel } from '@/domain/models';
import { mockAuthentication, mockAccountModel } from '@/domain/test';
import { Credentials } from '@/domain/usecases';
import { RemoteAuthentication } from './remote-authentication';

type SutTypes = {
  sut: RemoteAuthentication;
  httpClientSpy: HttpClientSpy<Credentials, AccountModel.AccessModel>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<
    Credentials,
    AccountModel.AccessModel
  >();

  const sut = new RemoteAuthentication(url, httpClientSpy);

  return {
    sut,
    httpClientSpy,
  };
};

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url();

    const { sut, httpClientSpy } = makeSut(url);

    await sut.auth(mockAuthentication());

    expect(httpClientSpy.url).toBe(url);
  });

  test('Should call HttpPostClient with correct Body', async () => {
    const { sut, httpClientSpy } = makeSut();

    const credentials = mockAuthentication();

    await sut.auth(credentials);

    expect(httpClientSpy.body).toEqual(credentials);
  });

  test('Should thrown InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.UNAUTHORIZED,
    };

    const credentials = mockAuthentication();

    const promise = sut.auth(credentials);

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  test('Should thrown UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.BAD_REQUEST,
    };

    const credentials = mockAuthentication();

    const promise = sut.auth(credentials);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should thrown UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.NOT_FOUND,
    };

    const credentials = mockAuthentication();

    const promise = sut.auth(credentials);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should thrown UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.BAD_REQUEST,
    };

    const credentials = mockAuthentication();

    const promise = sut.auth(credentials);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should thrown AccountModel if HttpPostClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut();

    const httpResult = mockAccountModel();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.OK,
      body: httpResult,
    };

    const credentials = mockAuthentication();

    const account = await sut.auth(credentials);

    await expect(account).toEqual(httpResult);
  });
});
