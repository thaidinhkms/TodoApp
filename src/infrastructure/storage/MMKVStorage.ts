import { MMKV } from 'react-native-mmkv';
import IStorage from '../contracts/IStorage';

export class MMKVStorage implements IStorage {
  storage = new MMKV({
    id: 'app_storage',
    encryptionKey: 'secret',
  });
  getString(key: string): Promise<string | null> {
    return Promise.resolve(this.storage.getString(key) ?? null);
  }
  setString(key: string, value: string): Promise<void> {
    this.storage.set(key, value);
    return Promise.resolve();
  }
  remove(key: string): Promise<void> {
    this.storage.delete(key);
    return Promise.resolve();
  }
  clearAll(): Promise<void> {
    this.storage.clearAll();
    return Promise.resolve();
  }
  getObject<T>(key: string): Promise<T | null> {
    const objStr = this.storage.getString(key);
    if (!objStr?.length) return Promise.resolve(null);
    try {
      return Promise.resolve(JSON.parse(objStr));
    } catch (e: unknown) {
      console.error('Error parsing data: ', e);
      return Promise.resolve(null);
    }
  }
  setObject<T>(key: string, value: T): Promise<void> {
    this.storage.set(key, JSON.stringify(value));
    return Promise.resolve();
  }
}
