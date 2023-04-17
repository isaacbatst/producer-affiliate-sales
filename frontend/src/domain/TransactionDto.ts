import { ProductDto } from "./ProductDto";

export type TransactionDto = {
  id: string;
  type: number;
  date: string;
  product: ProductDto
  value: number;
  seller: {
    id: string;
    name: string;
  };
}