import faker from 'faker';
import { HttpStatusCode } from '@/data/protocols/http';
import { HttpPostClientSpy } from '@/data/test';
import { UnexpectedError } from '@/domain/errors';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { AccountModel } from '@/domain/models';
import { mockAuthentication, mockAccountModel } from '@/domain/test';
import { Credentials } from '@/domain/usecases';
import { RemoteAuthentication } from './remote-authentication';

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
