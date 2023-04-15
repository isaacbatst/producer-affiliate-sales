import { ApiGateway } from "./ApiGateway";
import { ApiGatewayAxios } from "./ApiGatewayAxios";
import { ApiGatewayFake } from "./ApiGatewayFake";

export class ApiGatewayFactory {
  static make(): ApiGateway {
    if(process.env.NODE_ENV === 'test') {
      return new ApiGatewayFake()
    }

    return new ApiGatewayAxios('http://localhost:3000')
  }
}