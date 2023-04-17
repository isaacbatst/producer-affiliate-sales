import { Transaction } from 'src/domain/Transaction/Transaction';
import { TransactionDto } from './transactions.dto';
import { ProductsMapper } from '../products/products.mapper';

export class TransactionsMapper {
  static toDto(transaction: Transaction): TransactionDto {
    const product = transaction.getProduct();
    return {
      id: transaction.getId(),
      type: transaction.getType(),
      date: transaction.getDate().toISOString(),
      product: ProductsMapper.toDto(product),
      value: transaction.getValue(),
      seller: {
        id: transaction.getSeller().getId(),
        name: transaction.getSeller().getName(),
      },
    };
  }
}
