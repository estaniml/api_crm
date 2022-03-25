import React from 'react'

const Alerta = ({children}) => {
  return (
    <div className='text-left my-4 text-red-600 p-3'>
        {children}
    </div>
  )
}

export default Alerta