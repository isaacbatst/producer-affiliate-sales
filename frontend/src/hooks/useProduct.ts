import { ApiGateway } from '@/infra/gateways/ApiGateway'
import useSWR from 'swr'

export const useProduct = (id: string, apiGateway: ApiGateway) => {
  const {data, isLoading} = useSWR(`product/${id}`, () => apiGateway.getProduct(id))

  return {
    product: data,
    isLoading
  }
}