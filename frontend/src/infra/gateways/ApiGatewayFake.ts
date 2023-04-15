import { Transaction } from "@/domain/Transaction";
import { ApiGateway } from "./ApiGateway";

export class ApiGatewayFake implements ApiGateway {
  processTransactions(): Promise<void> {
    return Promise.resolve();
  }

  async getTransactions(): Promise<Transaction[]> {
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
}