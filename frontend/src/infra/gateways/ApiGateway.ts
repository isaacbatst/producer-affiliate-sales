import { Seller } from "@/domain/Seller";
import { TransactionDto } from "@/domain/TransactionDto";

export interface ApiGateway {
  processTransactions(transactionsFile: File): Promise<void>;
  getTransactions(): Promise<TransactionDto[]>
  getSeller(id: string): Promise<Seller>
}