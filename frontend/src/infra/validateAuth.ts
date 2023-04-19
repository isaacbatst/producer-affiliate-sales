import { ApiGateway } from "./gateways/ApiGateway"

export const redirectIfUnauthorized = async (apiGateway: ApiGateway, cookie: string | undefined) => {
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

export const redirectIfAuthorized = async (apiGateway: ApiGateway, cookie: string | undefined) => {
  try {
    const user = await apiGateway.validateAuth(cookie)
    return {
      redirect: {
        destination: '/home',
        permanent: false
      },
      props: {
        user
      }
    }
  } catch {
    return {
      props: {}
    }
  }
}