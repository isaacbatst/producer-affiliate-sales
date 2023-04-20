import { TransactionDto } from "@/domain/TransactionDto";
import { ApiGateway } from "./ApiGateway";
import axios, {AxiosInstance} from 'axios'
import { Seller } from "@/domain/Seller";
import { ProductDto } from "@/domain/ProductDto";
import { UserDto } from "@/domain/UserDto";

export class ApiGatewayAxios implements ApiGateway {
  private axios: AxiosInstance;

  constructor(baseUrl: string){
    this.axios = axios.create({
      baseURL: baseUrl,
      withCredentials: true
    })
  }

  async processTransactions(transactionsFile: File): Promise<void> {
    await this.axios.post('/transactions/process', { sales: transactionsFile }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    })
  }

  async getTransactions(): Promise<TransactionDto[]> {
    const response = await this.axios.get('/transactions')
    return response.data
  }

  async getSeller(id: string): Promise<Seller> {
    const response = await this.axios.get(`/sellers/${id}`)
    return response.data
  }

  async getProduct(id: string): Promise<ProductDto> {
    const response = await this.axios.get(`/products/${id}`)
    return response.data
  }

  async getProductTransactions(id: string): Promise<TransactionDto[]> {
    const response = await this.axios.get(`/products/${id}/transactions`)
    return response.data
  }

  async getSellerTransactions(id: string): Promise<TransactionDto[]> {
    const response = await this.axios.get(`/sellers/${id}/transactions`)
    return response.data
  }

  async validateAuth(cookie: string | undefined): Promise<UserDto> {
    const response = await this.axios.post('/auth/validate', {}, {
      headers: {
        cookie
      }
    })
    return response.data 
  }

  async login(email: string, password: string): Promise<void> {
    await this.axios.post('/auth/login', { email, password })
  }

  async logout(): Promise<void> {
    await this.axios.post('/auth/logout')
  }
}
