export interface ApiGateway {
  processTransactions(transactionsFile: File): Promise<void>;
}