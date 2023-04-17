import { Product } from '../Product/Product';
import { Seller } from '../Seller/Seller';
import { SellerType } from '../Seller/SellerType';
import { TransactionType } from './TransactionType';

export type TransactionParams = {
  type: TransactionType;
  date: Date;
  product: Product;
  value: number;
  seller: Seller;
  id: string;
};

export abstract class Transaction {
  private readonly id: string;
  private readonly date: Date;
  private readonly value: number;
  protected readonly product: Product;
  protected readonly type: TransactionType;
  protected readonly seller: Seller;
  protected readonly sellerType: SellerType;

  constructor(params: TransactionParams) {
    this.type = params.type;
    this.date = params.date;
    this.product = params.product;
    this.value = params.value;
    this.seller = params.seller;
    this.id = params.id;
    this.sellerType = this.makeSellerType();
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

  public getProduct(): Product {
    return this.product;
  }

  public getValue(): number {
    return this.value;
  }

  public getSeller(): Seller {
    return this.seller;
  }

  public getSellerType(): SellerType {
    return this.sellerType;
  }

  protected abstract makeSellerType(): SellerType;
}
