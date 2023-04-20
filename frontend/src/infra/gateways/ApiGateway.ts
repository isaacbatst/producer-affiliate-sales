import { ProductDto } from "@/domain/ProductDto";
import { Seller } from "@/domain/Seller";
import { TransactionDto } from "@/domain/TransactionDto";
import { UserDto } from "@/domain/UserDto";

export interface ApiGateway {
  processTransactions(transactionsFile: File): Promise<void>;
  getTransactions(): Promise<TransactionDto[]>
  getSeller(id: string): Promise<Seller>
  getProduct(id: string): Promise<ProductDto>
  getProductTransactions(id: string): Promise<TransactionDto[]>
  getSellerTransactions(id: string): Promise<TransactionDto[]>
  validateAuth(cookie?: string | undefined): Promise<UserDto>
  login(email: string, password: string): Promise<void>
  logout(): Promise<void>
}