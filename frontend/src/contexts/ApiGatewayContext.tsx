import { ApiGateway } from "@/infra/gateways/ApiGateway";
import React, { PropsWithChildren, createContext, useContext } from "react";

type ApiGatewayContextType = {
  apiGateway: ApiGateway
}

const ApiGatewayContext  = createContext<ApiGatewayContextType>(null as unknown as ApiGatewayContextType)

type Props = {
  apiGateway: ApiGateway
}

export const ApiGatewayContextProvider: React.FC<PropsWithChildren<Props>> = ({children, apiGateway}) => {
  return <ApiGatewayContext.Provider value={{
    apiGateway
  }}>
    {children}
  </ApiGatewayContext.Provider>
}

export const useApiGateway = () => {
  const context = useContext(ApiGatewayContext)
  if (!context) {
    throw new Error("useApiGateway must be used within an ApiGatewayProvider")
  }
  return context
}