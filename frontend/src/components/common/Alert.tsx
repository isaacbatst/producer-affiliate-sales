import React from 'react'

type Props = {
  message:string
  type: 'success' | 'error'
}

const Alert = ({message, type}: Props) => {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500'
  return (
    <div role='alert' aria-label='Sucesso'
      className={`${bgColor} p-3 rounded-lg text-white text-center w-full font-light`}
    >{message}</div>
  )
}

export default Alert