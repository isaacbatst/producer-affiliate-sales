import { TransactionDto } from "@/domain/TransactionDto";
import { ApiGateway } from "./ApiGateway";
import axios, {AxiosInstance} from 'axios'
import { Seller } from "@/domain/Seller";
import { ProductDto } from "@/domain/ProductDto";

export class ApiGatewayAxios implements ApiGateway {
  private axios: AxiosInstance;

  constructor(baseUrl: string){
    this.axios = axios.create({
      baseURL: baseUrl,
    })
  }

  async processTransactions(transactionsFile: File): Promise<void> {
    await this.axios.post('/transactions/process', { sales: transactionsFile }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
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
}