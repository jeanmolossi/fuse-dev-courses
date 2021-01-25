import faker from 'faker';
import { HttpParams } from '@/data/protocols/http';

export const mockPostRequest = (): HttpParams<string> => ({
  url: faker.internet.url(),
  method: faker.random.arrayElement(['post', 'get', 'put', 'delete']),
  body: faker.random.objectElement(),
});
