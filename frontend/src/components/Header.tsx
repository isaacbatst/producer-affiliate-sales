import React from 'react'

type Props = {}

const Header: React.FC = (props: Props) => {
  return (
    <header className='py-3 px-5 absolute top-0 bg-theme-yellow-500 w-full'>
      <h1 className='text-2xl font-bold'>Criadores e Afiliados</h1>
    </header>
  )
}

export default Header