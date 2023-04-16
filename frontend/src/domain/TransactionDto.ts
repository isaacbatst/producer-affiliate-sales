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
}