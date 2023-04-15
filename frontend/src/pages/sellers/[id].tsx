import Header from '@/components/Header'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'


const SellerPage: NextPage = () => {
  const router = useRouter()
  return (
    <main>
      <Header />
      <div>{router.query.id}</div>
    </main>
  )
}

export default SellerPage