import { TransactionDto } from "@/domain/Transaction";
import { ApiGateway } from "./ApiGateway";
import axios, {AxiosInstance} from 'axios'
import { Seller } from "@/domain/Seller";

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
}