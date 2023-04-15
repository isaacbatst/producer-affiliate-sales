import { Transaction } from "@/domain/Transaction";
import { ApiGateway } from "./ApiGateway";

export class ApiGatewayFake implements ApiGateway {
  processTransactions(): Promise<void> {
    return Promise.resolve();
  }

  getTransactions(): Promise<Transaction[]> {
    return Promise.resolve([]);
  }
}