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

  constructor(private readonly idGenerator: IdGenerator) {}

  public async create(
    inputs: Input[],
    registeredSellers: Seller[],
  ): Promise<Transaction[]> {
    const transactions: Transaction[] = [];

    for (const input of inputs) {
      const seller = await this.getSeller(input.sellerName, registeredSellers);
      const transaction = await this.createTransaction(input, seller);
      transactions.push(transaction);
    }

    return transactions;
  }

  public getUnregisteredSellers(): Seller[] {
    return this.unregisteredSellers;
  }

  private async createTransaction(
    input: Input,
    seller: Seller,
  ): Promise<Transaction> {
    const transactionId = await this.idGenerator.generate();

    return TransactionFactory.create({
      ...input,
      id: transactionId,
      seller,
    });
  }

  private async getSeller(
    sellerName: string,
    registeredSellers: Seller[],
  ): Promise<Seller> {
    const registeredSeller = registeredSellers.find(
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
