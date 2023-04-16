import { IdGenerator } from 'src/infra/common/IdGenerator/IdGenerator';
import { Product } from '../Product/Product';
import { Seller } from '../Seller/Seller';
import { Transaction } from './Transaction';
import { TransactionFactory } from './TransactionFactory';
import { TransactionFactoryAffiliateSell } from './TransactionFactoryAffiliateSell';
import { TransactionFactoryCommissionPayment } from './TransactionFactoryCommissionPayment';
import { TransactionFactoryCommissionReceivement } from './TransactionFactoryCommissionReceivement';
import { TransactionFactoryCreatorSell } from './TransactionFactoryCreatorSell';
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

  public async create(inputs: Input[]): Promise<{
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
