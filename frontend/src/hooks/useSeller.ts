import { ApiGateway } from '@/infra/gateways/ApiGateway'
import useSWR from 'swr'

export const useSeller = (id: string, apiGateway: ApiGateway) => {
  const {data, isLoading} = useSWR(`seller/${id}`, () => apiGateway.getSeller(id))

  return {
    seller: data,
    isLoading
  }
}