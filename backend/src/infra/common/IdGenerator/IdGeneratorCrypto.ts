import { IdGenerator } from './IdGenerator';
import * as crypto from 'node:crypto';

export class IdGeneratorCrypto implements IdGenerator {
  async generate(): Promise<string> {
    return crypto.randomUUID();
  }
}
