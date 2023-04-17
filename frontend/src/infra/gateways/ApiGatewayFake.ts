import { ProductDto } from "@/domain/ProductDto";
import { Seller } from "@/domain/Seller";
import { TransactionDto } from "@/domain/TransactionDto";
import { ApiGateway } from "./ApiGateway";

export class ApiGatewayFake implements ApiGateway {
  processTransactions(): Promise<void> {
    return Promise.resolve();
  }

  async getProduct(): Promise<ProductDto> {
    return {
      id: "1",
      name: "Product 1",
      affiliates: [
        {
          id: "1",
          name: "Affiliate 1",
        }
      ],
      creator: {
        id: "1",
        name: "Creator 1",
      }
    }
  }

  async getTransactions(): Promise<TransactionDto[]> {
    return [
      {
        id: "1",
        type: 1,
        date: "2022-12-01",
        product: {
          id: "1",
          name: "Product 1",
          affiliates: [
            {
              id: "1",
              name: "Affiliate 1",
            }
          ],
          creator: {
            id: "1",
            name: "Creator 1",
          }
        },
        value: 100,
        seller: {
          id: "1",
          name: "Seller 1",
        },
      }
    ]
  }

  async getSeller(): Promise<Seller> {
    return {
      id: "1",
      name: "Seller 1",
      balance: 100,
    }
  }
}