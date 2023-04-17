import Header from '@/components/common/Header'
import SalesForm from '@/components/Home/SalesForm'
import TransactionsList from '@/components/Home/TransactionsList'
import { ApiGatewayFactory } from '@/infra/gateways/ApiGatewayFactory'

const apiGateway = ApiGatewayFactory.make()

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <SalesForm apiGateway={apiGateway} />
      <TransactionsList apiGateway={apiGateway} />
    </main>
  )
}
