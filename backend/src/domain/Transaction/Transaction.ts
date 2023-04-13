import { Seller } from '../Seller/Seller';
import { TransactionType } from './TransactionType';

export type TransactionParams = {
  type: TransactionType;
  date: Date;
  product: string;
  value: number;
  seller: Seller;
  id: string;
};

export abstract class Transaction {
  private readonly id: string;
  private readonly date: Date;
  private readonly product: string;
  private readonly value: number;
  protected readonly type: TransactionType;
  protected readonly seller: Seller;

  constructor(params: TransactionParams) {
    this.type = params.type;
    this.date = params.date;
    this.product = params.product;
    this.value = params.value;
    this.seller = params.seller;
    this.id = params.id;
  }

  public abstract apply(): void;

  public getId(): string {
    return this.id;
  }

  public getType(): TransactionType {
    return this.type;
  }

  public getDate(): Date {
    return this.date;
  }

  public getProduct(): string {
    return this.product;
  }

  public getValue(): number {
    return this.value;
  }

  public getSeller(): Seller {
    return this.seller;
  }
}
