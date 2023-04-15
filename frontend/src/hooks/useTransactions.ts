import { ApiGateway } from '@/infra/gateways/ApiGateway';
import useSWR from 'swr'

export const useTransactions = (apiGateway: ApiGateway) => {
  const {data, isLoading} = useSWR('transactions', () => apiGateway.getTransactions());

  return {
    transactions: data,
    isLoading
  }
}