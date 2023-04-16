export interface TransactionDto {
  id: string;
  type: number;
  date: string;
  product: string;
  value: number;
  seller: {
    id: string;
    name: string;
  }
}