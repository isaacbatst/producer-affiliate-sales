import { IdGenerator } from 'src/infra/common/IdGenerator/IdGenerator';

type WithName = {
  getName(): string;
};

type WithId = {
  getId(): string;
};

export type TransactionRelatedFactory<T> = {
  create(id: string, name: string): T;
};

export class TransactionRelatedRetriever<T extends WithName & WithId> {
  private unregisteredList: T[] = [];

  constructor(private idGenerator: IdGenerator, private registeredList: T[]) {}

  async findOrCreate(
    name: string,
    factory: TransactionRelatedFactory<T>,
  ): Promise<T> {
    const found = this.find(name, this.registeredList);

    if (found) {
      return found;
    }

    const id = await this.idGenerator.generate();
    const entity = factory.create(id, name);
    this.unregisteredList.push(entity);
    return entity;
  }

  getUnregisteredList() {
    return this.unregisteredList;
  }

  private find(name: string, registeredList: T[]): T | undefined {
    const registered = this.findRegistered(name, registeredList);

    if (registered) {
      return registered;
    }

    return this.findUnregistered(name);
  }

  private findRegistered(name: string, registeredList: T[]): T | undefined {
    const registered = registeredList.find(
      (entity) => entity.getName() === name,
    );
    return registered;
  }

  private findUnregistered(name: string): T | undefined {
    const unregistered = this.unregisteredList.find(
      (entity) => entity.getName() === name,
    );

    return unregistered;
  }
}
