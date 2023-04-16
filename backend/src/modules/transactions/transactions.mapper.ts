import { Transaction } from 'src/domain/Transaction/Transaction';
import { TransactionDto } from './transactions.dto';

export class TransactionsMapper {
  static toDto(transaction: Transaction): TransactionDto {
    const product = transaction.getProduct();
    return {
      id: transaction.getId(),
      type: transaction.getType(),
      date: transaction.getDate().toISOString(),
      product: {
        id: product.getId(),
        name: product.getName(),
        creator: {
          id: product.getCreator().getId(),
          name: product.getCreator().getName(),
        },
        affiliates: product.getAffiliates().map((affiliate) => ({
          id: affiliate.getId(),
          name: affiliate.getName(),
        })),
      },
      value: transaction.getValue(),
      seller: {
        id: transaction.getSeller().getId(),
        name: transaction.getSeller().getName(),
      },
    };
  }
}
