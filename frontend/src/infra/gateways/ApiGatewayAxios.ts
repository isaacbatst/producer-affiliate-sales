import { Transaction } from "@/domain/Transaction";
import { ApiGateway } from "./ApiGateway";
import axios, {AxiosInstance} from 'axios'

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

  async getTransactions(): Promise<Transaction[]> {
    const response = await this.axios.get('/transactions')
    return response.data
  }
}