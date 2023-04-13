import { IdGenerator } from 'src/infra/common/IdGenerator/IdGenerator';
import { Seller } from '../Seller/Seller';
import { Transaction } from './Transaction';
import { TransactionFactory } from './TransactionFactory';

type Input = {
  type: number;
  date: Date;
  product: string;
  value: number;
  sellerName: string;
};

export class TransactionsListFactory {
  private unregisteredSellers: Seller[] = [];

  constructor(
    private readonly inputs: Input[],
    private readonly registeredSellers: Seller[],
    private readonly idGenerator: IdGenerator,
  ) {}

  async create(): Promise<{
    transactions: Transaction[];
    unregisteredSellers: Seller[];
  }> {
    const transactions = await Promise.all(
      this.inputs.map((input) => this.createTransaction(input)),
    );

    return {
      transactions,
      unregisteredSellers: this.unregisteredSellers,
    };
  }

  private async createTransaction(input: Input): Promise<Transaction> {
    const transactionId = await this.idGenerator.generate();

    return TransactionFactory.create({
      ...input,
      id: transactionId,
      seller: await this.getSeller(input.sellerName),
    });
  }

  private async getSeller(sellerName: string): Promise<Seller> {
    const registeredSeller = this.registeredSellers.find(
      (seller) => seller.getName() === sellerName,
    );
    if (!registeredSeller) {
      return this.getUnregisteredSeller(sellerName);
    }

    return registeredSeller;
  }

  private async getUnregisteredSeller(sellerName: string): Promise<Seller> {
    const unregisteredSeller = this.unregisteredSellers.find(
      (seller) => seller.getName() === sellerName,
    );

    if (!unregisteredSeller) {
      return this.createAndPushUnregisteredSeller(sellerName);
    }

    return unregisteredSeller;
  }

  private async createAndPushUnregisteredSeller(
    sellerName: string,
  ): Promise<Seller> {
    const sellerId = await this.idGenerator.generate();
    const seller = new Seller({
      id: sellerId,
      name: sellerName,
      balance: 0,
    });
    this.unregisteredSellers.push(seller);

    return seller;
  }
}
