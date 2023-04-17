import { Product } from '../../domain/Product/Product';
import { ProductDto } from './product.dto';

export class ProductsMapper {
  static toDto(product: Product): ProductDto {
    return {
      id: product.getId(),
      name: product.getName(),
      affiliates: product.getAffiliates().map((affiliate) => ({
        id: affiliate.getId(),
        name: affiliate.getName(),
      })),
      creator: {
        id: product.getCreator().getId(),
        name: product.getCreator().getName(),
      },
    };
  }
}
