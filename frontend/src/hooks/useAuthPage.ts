import { ApiGateway } from "@/infra/gateways/ApiGateway";
import { useRouter } from "next/router";
import { useAuth } from "./useAuth";

export const useAuthPage = (apiGateway: ApiGateway) => {
  const {isLoading, error , user} = useAuth(apiGateway)
  const router = useRouter();

  if(error) {
    router.push('/')
  }

  return {
    isLoading,
    user
  }
}