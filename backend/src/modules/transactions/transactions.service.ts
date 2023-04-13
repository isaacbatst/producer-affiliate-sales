import { Inject, Injectable } from '@nestjs/common';
import { TransactionsListFactory } from '../../domain/Transaction/TransactionListFactory';
import { IdGenerator } from '../../infra/common/IdGenerator/IdGenerator';
import { SellersRepository } from '../sellers/sellers.repository';
import { TransactionsRepository } from './transactions.repository';

type Input = {
  type: number;
  date: Date;
  product: string;
  value: number;
  sellerName: string;
};

@Injectable()
export class TransactionsService {
  constructor(
    @Inject('TRANSACTIONS_REPOSITORY')
    private readonly transactionsRepository: TransactionsRepository,
    @Inject('SELLERS_REPOSITORY')
    private readonly sellersRepository: SellersRepository,
    @Inject('ID_GENERATOR')
    private readonly idGenerator: IdGenerator,
  ) {}

  async processTransactions(inputs: Input[]) {
    const sellersNames = inputs.map((input) => input.sellerName);
    const registeredSellers = await this.sellersRepository.getByNames(
      sellersNames,
    );
    const transactionsListFactory = new TransactionsListFactory(
      this.idGenerator,
    );
    const transactions = await transactionsListFactory.create(
      inputs,
      registeredSellers,
    );

    const unregisteredSellers =
      transactionsListFactory.getUnregisteredSellers();

    transactions.forEach((transaction) => {
      transaction.apply();
    });

    await Promise.all([
      this.sellersRepository.createMany(unregisteredSellers),
      this.sellersRepository.updateMany(registeredSellers),
      this.transactionsRepository.createMany(transactions),
    ]);
  }
}
