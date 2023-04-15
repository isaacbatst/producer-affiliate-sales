import { Inject, Injectable } from '@nestjs/common';
import { TransactionsListFactory } from '../../domain/Transaction/TransactionListFactory';
import { IdGenerator } from '../../infra/common/IdGenerator/IdGenerator';
import { SellersRepository } from '../sellers/sellers.repository';
import { TransactionsRepository } from './transactions.repository';
import { CreateTransactionDto, TransactionDto } from './transactions.dto';
import { Transaction } from 'src/domain/Transaction/Transaction';

@Injectable()
export class TransactionsService {
  static toDto(transaction: Transaction): TransactionDto {
    return {
      type: transaction.getType(),
      date: transaction.getDate().toISOString(),
      product: transaction.getProduct(),
      value: transaction.getValue(),
      sellerName: transaction.getSeller().getName(),
      id: transaction.getId(),
    };
  }

  constructor(
    @Inject('TRANSACTIONS_REPOSITORY')
    private readonly transactionsRepository: TransactionsRepository,
    @Inject('SELLERS_REPOSITORY')
    private readonly sellersRepository: SellersRepository,
    @Inject('ID_GENERATOR')
    private readonly idGenerator: IdGenerator,
  ) {}

  async processTransactions(inputs: CreateTransactionDto[]) {
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

  async getAll(): Promise<TransactionDto[]> {
    const transactions = await this.transactionsRepository.getAll();
    return transactions.map(TransactionsService.toDto);
  }
}
