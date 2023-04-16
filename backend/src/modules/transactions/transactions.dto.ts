export type TransactionDto = {
  id: string;
  type: number;
  date: string;
  product: {
    id: string;
    name: string;
    creator: {
      id: string;
      name: string;
    };
    affiliates: {
      id: string;
      name: string;
    }[];
  };
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
