import { IdGenerator } from './IdGenerator';

export class IdGeneratorFake implements IdGenerator {
  generated = 'id';

  async generate(): Promise<string> {
    return this.generated;
  }
}
