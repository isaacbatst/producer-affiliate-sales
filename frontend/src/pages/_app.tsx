import Layout from '@/components/common/Layout'
import { ApiGatewayContextProvider } from '@/contexts/ApiGatewayContext'
import { ApiGatewayFactory } from '@/infra/gateways/ApiGatewayFactory'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

const apiGateway = ApiGatewayFactory.make()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApiGatewayContextProvider apiGateway={apiGateway}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApiGatewayContextProvider>
  )
}
