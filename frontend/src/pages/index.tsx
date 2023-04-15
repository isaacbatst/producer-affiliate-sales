import Header from '@/components/Header'
import SalesForm from '@/components/Home/SalesForm'
import TransactionsList from '@/components/Home/TransactionsList'
import { ApiGatewayFactory } from '@/infra/gateways/ApiGatewayFactory'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const apiGateway = ApiGatewayFactory.make()

export default function Home() {
  return (
    <main className={`${inter.className} flex flex-col min-h-screen`}>
      <Header />
      <SalesForm apiGateway={apiGateway} />
      <TransactionsList apiGateway={apiGateway} />
    </main>
  )
}
