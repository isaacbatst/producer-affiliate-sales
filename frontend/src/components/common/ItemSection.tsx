import React, { PropsWithChildren } from 'react'

type Props = {
  title: string
}
const ItemSection = ({children, title}: PropsWithChildren<Props>) => {
  return (
    <section className='bg-theme-yellow-500 flex flex-1'>
      <div className="container py-10 px-5 md:px-0 mx-auto flex flex-col md:flex-row md:items-center flex-1 gap-10">
        <div className='lg:flex-1 justify-center flex'>
          <h1 className='text-xl lg:text-4xl font-semibold'>{title}</h1>
        </div>
        <div className='lg:grow-[2] flex-1  text-white'>
          <div className='bg-slate-900 rounded-lg p-5 lg:p-14 shadow-lg shadow-black'>
            {children}
          </div>
        </div>
      </div>
    </section>  )
}

export default ItemSection