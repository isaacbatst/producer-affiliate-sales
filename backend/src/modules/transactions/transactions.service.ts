import { Inject, Injectable } from '@nestjs/common';
import { SellerType } from '../../domain/Seller/SellerType';
import { IdGenerator } from '../../infra/common/IdGenerator/IdGenerator';
import { ProductsRepository } from '../products/products.repository';
import { SellersRepository } from '../sellers/sellers.repository';
import { TransactionsListFactory } from './factories/TransactionListFactory';
import { CreateTransactionDto, TransactionDto } from './transactions.dto';
import { TransactionsMapper } from './transactions.mapper';
import { TransactionsRepository } from './transactions.repository';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject('TRANSACTIONS_REPOSITORY')
    private readonly transactionsRepository: TransactionsRepository,
    @Inject('SELLERS_REPOSITORY')
    private readonly sellersRepository: SellersRepository,
    @Inject('PRODUCTS_REPOSITORY')
    private readonly productsRepository: ProductsRepository,
    @Inject('ID_GENERATOR')
    private readonly idGenerator: IdGenerator,
  ) {}

  async processTransactions(inputs: CreateTransactionDto[]) {
    const registeredSellers = await this.getRegisteredSellers(inputs);
    const registeredProducts = await this.getRegisteredProducts(inputs);
    const transactionsListFactory = new TransactionsListFactory(
      this.idGenerator,
      registeredSellers,
      registeredProducts,
    );
    const { transactions } = await transactionsListFactory.createBatch(inputs);

    transactions.forEach((transaction) => {
      const sellerType = transaction.getSellerType();
      const isAffiliateTransaction = sellerType === SellerType.AFFILIATE;
      if (isAffiliateTransaction) {
        const product = transaction.getProduct();
        const seller = transaction.getSeller();
        product.addAffiliate(seller);
      }
      transaction.apply();
    });

    await Promise.all([
      this.sellersRepository.updateMany(registeredSellers),
      this.transactionsRepository.createMany(transactions),
    ]);
  }

  async getAll(): Promise<TransactionDto[]> {
    const transactions = await this.transactionsRepository.getAll();
    return transactions.map(TransactionsMapper.toDto);
  }

  private getRegisteredSellers(inputs: CreateTransactionDto[]) {
    const sellersNames = inputs.map((input) => input.sellerName);
    return this.sellersRepository.getByNames(sellersNames);
  }

  private getRegisteredProducts(inputs: CreateTransactionDto[]) {
    const productsNames = inputs.map((input) => input.product);
    return this.productsRepository.getByNames(productsNames);
  }
}
