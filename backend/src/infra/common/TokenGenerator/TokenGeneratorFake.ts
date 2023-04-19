import { TokenGenerator } from './TokenGenerator';

export class TokenGeneratorFake implements TokenGenerator {
  count = 0;
  baseToken = 'token';
  async generate(): Promise<string> {
    this.count++;
    return `${this.baseToken}-${this.count}`;
  }
}
