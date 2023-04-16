import { TransactionDto } from "@/domain/TransactionDto";
import { ApiGateway } from "./ApiGateway";
import { Seller } from "@/domain/Seller";

export class ApiGatewayFake implements ApiGateway {
  processTransactions(): Promise<void> {
    return Promise.resolve();
  }

  async getTransactions(): Promise<TransactionDto[]> {
    return [
      {
        id: "1",
        type: 1,
        date: "2022-12-01",
        product: "Product 1",
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