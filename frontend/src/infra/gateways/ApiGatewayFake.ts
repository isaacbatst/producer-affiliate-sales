import { ApiGateway } from "./ApiGateway";

export class ApiGatewayFake implements ApiGateway {
  processTransactions(): Promise<void> {
    return Promise.resolve();
  }
}