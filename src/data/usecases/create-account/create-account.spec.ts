import { HttpClientSpy } from '@/data/test';
import { UnexpectedError } from '@/domain/errors';
import { mockAccountCredentials } from '@/domain/test';
import { CreateAccountModel } from '@/domain/usecases';
import { CreateAccountUseCase } from './create-account';

const makeSut = () => {
  const httpClientSpy = new HttpClientSpy<
    CreateAccountModel.Credentials,
    CreateAccountModel.UserAccountModel
  >();

  const sut = new CreateAccountUseCase(httpClientSpy);

  return {
    httpClientSpy,
    sut,
  };
};

describe('CreateAccount', () => {
  test('Should call CreateAccount with correct credentials', async () => {
    const { sut, httpClientSpy } = makeSut();

    const credentials = mockAccountCredentials();

    await sut.createAccountWithEmailAndPassword(credentials);

    expect(httpClientSpy.body).toEqual(credentials);
  });

  test('Should throw UnexpectedError if fails on create', async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response = {
      statusCode: 403,
    };

    const credentials = mockAccountCredentials();

    const promise = sut.createAccountWithEmailAndPassword(credentials);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
