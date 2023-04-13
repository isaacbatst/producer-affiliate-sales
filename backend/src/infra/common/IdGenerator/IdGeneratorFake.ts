import { IdGenerator } from './IdGenerator';

export class IdGeneratorFake implements IdGenerator {
  count = 0;
  baseId = 'id';

  async generate(): Promise<string> {
    this.count++;
    return `${this.baseId}-${this.count}`;
  }
}
