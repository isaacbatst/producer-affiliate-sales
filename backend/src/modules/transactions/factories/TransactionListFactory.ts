import { IdGenerator } from 'src/infra/common/IdGenerator/IdGenerator';
import { Product } from '../../../domain/Product/Product';
import { Seller } from '../../../domain/Seller/Seller';
import { Transaction } from '../../../domain/Transaction/Transaction';
import { TransactionFactory } from '../../../domain/Transaction/TransactionFactory';
import { TransactionFactoryAffiliateSell } from '../../../domain/Transaction/TransactionFactoryAffiliateSell';
import { TransactionFactoryCommissionPayment } from '../../../domain/Transaction/TransactionFactoryCommissionPayment';
import { TransactionFactoryCommissionReceivement } from '../../../domain/Transaction/TransactionFactoryCommissionReceivement';
import { TransactionFactoryCreatorSell } from '../../../domain/Transaction/TransactionFactoryCreatorSell';
import { TransactionRelatedRetriever } from './TransactionListRelatedFactory';
import { TransactionRelatedFactoryProduct } from './TransactionListRelatedFactoryProduct';
import { TransactionRelatedFactorySeller } from './TransactionListRelatedFactorySeller';

type Input = {
  type: number;
  date: string;
  product: string;
  value: number;
  sellerName: string;
};

export class TransactionsListFactory {
  private sellerRetriever: TransactionRelatedRetriever<Seller>;
  private productRetriever: TransactionRelatedRetriever<Product>;
  private transactionFactories: TransactionFactory[] = [
    new TransactionFactoryCreatorSell(),
    new TransactionFactoryAffiliateSell(),
    new TransactionFactoryCommissionPayment(),
    new TransactionFactoryCommissionReceivement(),
  ];

  constructor(
    private readonly idGenerator: IdGenerator,
    registeredSellers: Seller[],
    registeredProducts: Product[],
  ) {
    this.sellerRetriever = new TransactionRelatedRetriever(
      this.idGenerator,
      registeredSellers,
    );
    this.productRetriever = new TransactionRelatedRetriever(
      this.idGenerator,
      registeredProducts,
    );
  }

  public async createBatch(inputs: Input[]): Promise<{
    transactions: Transaction[];
    unregistered: {
      sellers: Seller[];
      products: Product[];
    };
  }> {
    const transactions: Transaction[] = [];

    for (const input of inputs) {
      const sellerFactory = new TransactionRelatedFactorySeller();
      const seller = await this.sellerRetriever.findOrCreate(
        input.sellerName,
        sellerFactory,
      );
      const productFactory = new TransactionRelatedFactoryProduct(
        seller,
        input.value,
        input.type,
      );
      const product = await this.productRetriever.findOrCreate(
        input.product,
        productFactory,
      );
      const transactionFactory = this.transactionFactories.find((factory) =>
        factory.shouldCreate(input.type),
      );
      if (!transactionFactory) {
        throw new Error('Creating transaction from invalid transaction type');
      }
      const transaction = transactionFactory.create({
        date: new Date(input.date),
        product,
        seller,
        id: await this.idGenerator.generate(),
        value: input.value,
        type: input.type,
      });

      transactions.push(transaction);
    }

    return {
      transactions,
      unregistered: {
        sellers: this.sellerRetriever.getUnregisteredList(),
        products: this.productRetriever.getUnregisteredList(),
      },
    };
  }
}
