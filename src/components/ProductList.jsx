import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import Productos from './Productos'

const ProductList = () => {
  const { productos } = useContext(CartContext)

  return (
    <div className="mx-auto max-w-7xl px-6 sm:px-8">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4">
        {productos.slice(0, 4).map((producto) => (
          <Productos key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  )
}

export default ProductList
