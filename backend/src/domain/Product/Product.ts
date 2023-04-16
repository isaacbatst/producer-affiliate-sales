import { Seller } from '../Seller/Seller';

type ProductParams = {
  id: string;
  name: string;
  price: number;
  creator: Seller;
};

export class Product {
  private id: string;
  private name: string;
  private price: number;
  private creator: Seller;
  private affiliates: Seller[] = [];

  constructor(params: ProductParams) {
    this.id = params.id;
    this.name = params.name;
    this.price = params.price;
    this.creator = params.creator;
  }

  addAffiliate(seller: Seller) {
    const found = this.affiliates.find(
      (affiliate) => affiliate.getId() === seller.getId(),
    );

    if (found) {
      throw new Error('Repeated affiliate');
    }

    if (seller.getId() === this.creator.getId()) {
      throw new Error('Cannot add affiliate to own product');
    }

    this.affiliates.push(seller);
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }

  getCreator(): Seller {
    return this.creator;
  }

  getAffiliates(): Seller[] {
    return this.affiliates;
  }
}
