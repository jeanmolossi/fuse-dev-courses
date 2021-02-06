import faker from 'faker';
import '@/main/config/firebase';

export const mockFirebase = (returnData = faker.random.words()): any => {
  const mockDocData = returnData;

  const mockDockResult = {
    data: () => mockDocData,
  };

  const setMock = jest.fn();
  const getMock = jest.fn(async () => Promise.resolve(mockDockResult));
  const getDocsMock = jest.fn(async () => Promise.resolve([mockDockResult]));

  const docMock = jest.fn((docId?: string) => {
    return {
      set: setMock,
      get: getMock,
      collection: collectionMock,
    };
  });

  const collectionMock = (collectionPath: string) => ({
    add: jest.fn(),
    doc: docMock,
    get: getDocsMock,
  });

  const mockedFirebase = jest.fn(() => ({
    collection: collectionMock,
  }));

  return mockedFirebase;
};
