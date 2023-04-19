import { Encrypter } from './Encrypter';

export class EncrypterFake implements Encrypter {
  hashValue = 'any_hash_value';
  isValidPassword = true;
  async hash(): Promise<string> {
    return this.hashValue;
  }
  async compare(): Promise<boolean> {
    return this.isValidPassword;
  }
}
