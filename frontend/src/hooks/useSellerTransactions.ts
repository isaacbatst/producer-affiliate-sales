import { ApiGateway } from '@/infra/gateways/ApiGateway'
import useSWR from 'swr'

export const useSellerTransactions = (id: string, apiGateway: ApiGateway) => {
  const {data, isLoading} = useSWR(
    `product/${id}/transactions`, 
    () => apiGateway.getSellerTransactions(id)
  )

  return {
    transactions: data,
    isLoading
  }
}