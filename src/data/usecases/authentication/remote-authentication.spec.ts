import { HttpPostClientSpy } from '@/data/test/mock-http-client';
import { mockAuthentication } from '@/domain/test/mock-authentication';
import { RemoteAuthentication } from './remote-authentication';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import faker from 'faker';
import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { UnexpectedError } from '@/domain/errors/unexpected-error';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();

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
});
