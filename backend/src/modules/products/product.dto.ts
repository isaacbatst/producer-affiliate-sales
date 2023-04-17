export interface ProductDto {
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
}
