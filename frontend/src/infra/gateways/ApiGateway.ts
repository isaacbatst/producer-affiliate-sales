import { Transaction } from "@/domain/Transaction";

export interface ApiGateway {
  processTransactions(transactionsFile: File): Promise<void>;
  getTransactions(): Promise<Transaction[]>
}