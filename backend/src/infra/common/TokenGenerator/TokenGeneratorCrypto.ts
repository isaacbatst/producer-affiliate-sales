import { TokenGenerator } from './TokenGenerator';
import * as crypto from 'node:crypto';

export class TokenGeneratorCrypto implements TokenGenerator {
  async generate(): Promise<string> {
    const token = crypto.randomBytes(32).toString('hex');
    return token;
  }
}
