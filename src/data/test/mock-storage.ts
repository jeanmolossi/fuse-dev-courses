import { SetStorage } from '../protocols/cache';

export class SetStorageSpy implements SetStorage {
  key: string;
  value: string;

  async set(key: string, value: string): Promise<void> {
    this.key = key;
    this.value = value;
    await Promise.resolve();
  }
}
