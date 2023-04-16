import { Seller } from '../Seller/Seller';
import { Product } from './Product';

const makeSut = () => {
  return new Product({
    id: 'product-id',
    name: 'product-name',
    price: 0,
    creator: new Seller({
      id: 'creator-id',
      name: 'creator-name',
      balance: 0,
    }),
  });
};

describe('Product', () => {
  it('should create an instance', () => {
    const product = makeSut();
    expect(product).toBeTruthy();
    expect(product.getId()).toEqual('product-id');
    expect(product.getName()).toEqual('product-name');
    expect(product.getPrice()).toEqual(0);
    expect(product.getCreator().getId()).toEqual('creator-id');
    expect(product.getCreator().getName()).toEqual('creator-name');
    expect(product.getCreator().getBalance()).toEqual(0);
    expect(product.getAffiliates()).toHaveLength(0);
  });

  it('should add affiliates', () => {
    const product = makeSut();
    const affiliate = new Seller({
      id: 'affiliate-id',
      name: 'name',
      balance: 0,
    });

    product.addAffiliate(affiliate);
    expect(product.getAffiliates()).toHaveLength(1);
  });

  it('should not add repeated affiliates', () => {
    const product = makeSut();
    const affiliate = new Seller({
      id: 'affiliate-id',
      name: 'name',
      balance: 0,
    });
    product.addAffiliate(affiliate);
    expect(() => {
      product.addAffiliate(affiliate);
    }).toThrowError();
  });

  it('should not add creator as affiliate', () => {
    const product = makeSut();
    expect(() => {
      product.addAffiliate(product.getCreator());
    }).toThrowError();
  });
});
