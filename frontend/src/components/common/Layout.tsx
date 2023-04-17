import { Inter } from 'next/font/google'
import React, { PropsWithChildren } from 'react'

const inter = Inter({ subsets: ['latin'] })

const Layout = ({children}: PropsWithChildren) => {
  return (
    <main className={inter.className}>
      {children}
    </main>
  )
}

export default Layout