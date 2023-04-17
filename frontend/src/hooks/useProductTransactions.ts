import { ApiGateway } from '@/infra/gateways/ApiGateway'
import useSWR from 'swr'

export const useProductTransactions = (id: string, apiGateway: ApiGateway) => {
  const {data, isLoading} = useSWR(
    `product/${id}/transactions`, 
    () => apiGateway.getProductTransactions(id)
  )

  return {
    transactions: data,
    isLoading
  }
}