import faker from 'faker';
import { HttpPostClientSpy } from '@/data/test/mock-http-client';
import {
  mockAuthentication,
  mockAccountModel,
} from '@/domain/test/mock-account';
import { RemoteAuthentication } from './remote-authentication';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import { Credentials } from '@/domain/usecases/authentication';
import { AccountModel } from '@/domain/models/account-model';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy<Credentials, AccountModel>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<Credentials, AccountModel>();

  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return {
    sut,
    httpPostClientSpy,
  };
};

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url();

    const { sut, httpPostClientSpy } = makeSut(url);

    await sut.auth(mockAuthentication());

    expect(httpPostClientSpy.url).toBe(url);
  });

  test('Should call HttpPostClient with correct Body', async () => {
    const { sut, httpPostClientSpy } = makeSut();

    const credentials = mockAuthentication();

    await sut.auth(credentials);

    expect(httpPostClientSpy.body).toEqual(credentials);
  });

  test('Should thrown InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.UNAUTHORIZED,
    };

    const credentials = mockAuthentication();

    const promise = sut.auth(credentials);

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  test('Should thrown UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.BAD_REQUEST,
    };

    const credentials = mockAuthentication();

    const promise = sut.auth(credentials);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should thrown UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.NOT_FOUND,
    };

    const credentials = mockAuthentication();

    const promise = sut.auth(credentials);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should thrown UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.BAD_REQUEST,
    };

    const credentials = mockAuthentication();

    const promise = sut.auth(credentials);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should thrown AccountModel if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut();

    const httpResult = mockAccountModel();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.OK,
      body: httpResult,
    };

    const credentials = mockAuthentication();

    const account = await sut.auth(credentials);

    await expect(account).toEqual(httpResult);
  });
});
