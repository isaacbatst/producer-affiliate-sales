import { ApiGateway } from "./ApiGateway";
import { ApiGatewayAxios } from "./ApiGatewayAxios";
import { ApiGatewayFake } from "./ApiGatewayFake";

export class ApiGatewayFactory {
  static make(): ApiGateway {
    const apiUrl = process.env.API_URL

    if(!apiUrl) {
      throw new Error("API_URL is not defined")
    }

    if(process.env.NODE_ENV === 'test') {
      return new ApiGatewayFake()
    }

    return new ApiGatewayAxios(apiUrl)
  }
}