import { Encrypter } from './Encrypter';
import * as bcrypt from 'bcrypt';

export class EncrypterBcrypt implements Encrypter {
  private static readonly HASH_ROUNDS = 10;
  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, EncrypterBcrypt.HASH_ROUNDS);
  }
  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
