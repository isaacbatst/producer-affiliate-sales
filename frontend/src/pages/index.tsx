import Header from '@/components/Header'
import SalesForm from '@/components/Home/SalesForm'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`${inter.className} flex flex-col min-h-screen`}>
      <Header />
      <SalesForm />
    </main>
  )
}
