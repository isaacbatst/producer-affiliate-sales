export type TransactionDto = {
  id: string;
  type: number;
  date: string;
  product: string;
  value: number;
  sellerName: string;
};

export type CreateTransactionDto = Omit<TransactionDto, 'id'>;
