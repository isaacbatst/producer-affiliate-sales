import axios from "axios"
import { ApiGatewayFactory } from "./gateways/ApiGatewayFactory"

if(!process.env.BACKEND_API_URL) {
  throw new Error('BACKEND_API_URL is not defined')
}

const apiGateway = ApiGatewayFactory.make(process.env.BACKEND_API_URL)
export const redirectIfUnauthorized = async (cookie: string | undefined) => {
  try {
    const user = await apiGateway.validateAuth(cookie)
    return {
      props: {
        user
      }
    }
  } catch {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
}

export const redirectIfAuthorized = async (cookie: string | undefined) => {
  try {
    const user = await apiGateway.validateAuth(cookie)
    console.log('user', user)
    return {
      redirect: {
        destination: '/home',
        permanent: false
      },
      props: {
        user
      }
    }
  } catch(err) {
    if(axios.isAxiosError(err)){
      console.log('response status', err.code, err.message)
    }
    return {
      props: {}
    }
  }
}