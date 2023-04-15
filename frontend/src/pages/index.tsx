import Header from '@/components/Header'
import SalesForm from '@/components/Home/SalesForm'
import { ApiGatewayFake } from '@/gateways/ApiGatewayFake'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const apiGateway = new ApiGatewayFake()

export default function Home() {
  return (
    <main className={`${inter.className} flex flex-col min-h-screen`}>
      <Header />
      <SalesForm apiGateway={apiGateway} />
    </main>
  )
}
