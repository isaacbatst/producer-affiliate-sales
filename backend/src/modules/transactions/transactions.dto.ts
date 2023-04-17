import { ProductDto } from '../products/product.dto';

export type TransactionDto = {
  id: string;
  type: number;
  date: string;
  product: ProductDto;
  value: number;
  seller: {
    id: string;
    name: string;
  };
};

export type CreateTransactionDto = {
  type: number;
  date: string;
  product: string;
  value: number;
  sellerName: string;
};
