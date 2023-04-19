import { ApiGateway } from "@/infra/gateways/ApiGateway";
import useSWR from "swr";

export const useAuth = (apiGateway: ApiGateway) => {
  const {isLoading, error, data} = useSWR('auth', () => apiGateway.validateAuth())

  return {
    isLoading,
    error,
    user: data
  }
}