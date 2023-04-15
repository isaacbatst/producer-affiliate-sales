export type TransactionDto = {
  id: string;
  type: number;
  date: string;
  product: string;
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
