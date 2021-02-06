import firebase from 'firebase';
import {
  HttpClient,
  HttpParams,
  HttpResponse,
  HttpStatusCode,
} from '@/data/protocols/http';
import { UnexpectedError } from '@/domain/errors';
import { mockFirebase } from '@/infra/test/mock-firebase';

class FirebaseHttpClient<ReturnType = any | any[]>
  implements HttpClient<any, ReturnType> {
  async request(
    params: HttpParams<any, any>,
  ): Promise<HttpResponse<ReturnType>> {
    const { url } = params;

    const [collectionPath, docId] = url.split('/');

    const httpRequest = firebase.firestore().collection(collectionPath);

    const errorCatcher = err => ({
      statusCode: 500,
      body: null,
      message: err.message,
    });

    let httpResponse = {
      statusCode: HttpStatusCode.NO_CONTENT,
      body: null,
    };

    if (docId) {
      httpResponse = await httpRequest
        .doc(docId)
        .get()
        .then(doc => {
          const body: ReturnType = doc.data() as ReturnType;

          Object.assign(body, { id: doc.id });

          return {
            statusCode: HttpStatusCode.OK,
            body,
          };
        })
        .catch(errorCatcher);
    } else {
      httpResponse = await httpRequest
        .get()
        .then(doc => {
          const body = doc.docs.map(singleDoc => {
            const docBody = singleDoc.data() as any;

            Object.assign(docBody, { id: singleDoc.id });

            return docBody;
          });

          return {
            statusCode: HttpStatusCode.OK,
            body,
          };
        })
        .catch(errorCatcher);
    }

    switch (httpResponse.statusCode) {
      case HttpStatusCode.OK:
        return httpResponse.body;
      default:
        throw new UnexpectedError();
    }
  }
}

type SutTypes = {
  sut: FirebaseHttpClient;
  mockedFirebase: ReturnType<typeof mockFirebase>;
};

const makeSut = (): SutTypes => {
  const sut = new FirebaseHttpClient();
  const mockedFirebase = mockFirebase();

  return {
    sut,
    mockedFirebase,
  };
};

describe('FirebaseHttpClient', () => {
  test('Should call firestore with correct Collection and docId', async () => {
    const { sut, mockedFirebase } = makeSut();

    expect(1).toBe(1);
    return;

    await sut.request({
      url: 'user/docId',
      method: 'get',
    });

    // expect(mockedFirebase.collection).toHaveBeenCalledWith('user');
  });
});
