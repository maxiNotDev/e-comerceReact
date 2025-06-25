import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { FaShoppingCart, FaEye, FaMinus, FaPlus } from 'react-icons/fa'

const Productos = ({ producto }) => {
  const { handleAddToCart, getCantidadEnCarrito, validarStock } = useContext(CartContext)
  const [cantidad, setCantidad] = useState(1)

  const incrementarCantidad = () => {
    const cantidadEnCarrito = getCantidadEnCarrito(producto.id);
    const cantidadDisponible = producto.stock - cantidadEnCarrito;
    
    if (cantidad < cantidadDisponible) {
      setCantidad(prev => prev + 1)
    }
  }

  const decrementarCantidad = () => {
    if (cantidad > 1) {
      setCantidad(prev => prev - 1)
    }
  }

  const agregarAlCarrito = () => {
    handleAddToCart({...producto, cantidad: cantidad})
  }

  // Calcular cantidad disponible para este producto
  const cantidadEnCarrito = getCantidadEnCarrito(producto.id);
  const cantidadDisponible = producto.stock - cantidadEnCarrito;

  return (
    <article className="flex flex-col h-full p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div className="flex flex-col flex-1 max-w-xl">
        <div className="mt-8 flex items-center gap-x-4 text-xs">
          <span className="text-gray-500">{producto.categoria}</span>
          <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
            ${producto.precio}
          </span>
        </div>
        <div className="group relative flex-1">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <span className="absolute inset-0" />
            {producto.nombre}
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 h-16 overflow-hidden">
            {producto.descripcion}
          </p>
        </div>
        
        {/* Mostrar información de stock */}
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Stock disponible: <span className={`font-semibold ${cantidadDisponible > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {cantidadDisponible} unidades
            </span>
            {cantidadEnCarrito > 0 && (
              <span className="text-gray-500 ml-2">
                ({cantidadEnCarrito} en carrito)
              </span>
            )}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={decrementarCantidad}
              disabled={cantidad <= 1}
              className={`flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
                cantidad <= 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              <FaMinus className="text-xs" />
            </button>
            <span className="flex items-center justify-center w-12 h-8 rounded-md border border-gray-300 bg-gray-50 text-gray-900 font-semibold text-sm">
              {cantidad}
            </span>
            <button
              onClick={incrementarCantidad}
              disabled={cantidad >= cantidadDisponible}
              className={`flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
                cantidad >= cantidadDisponible 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              <FaPlus className="text-xs" />
            </button>
          </div>
          <div className="flex items-center gap-x-4">
            <Link
              to={`/productos/${producto.id}`}
              className="flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 w-1/2"
            >
              <FaEye className="text-sm" />
              Detalles
            </Link>
            <button
              onClick={agregarAlCarrito}
              disabled={cantidadDisponible === 0}
              className={`flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 w-1/2 ${
                cantidadDisponible === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-500'
              }`}
            >
              <FaShoppingCart className="text-sm" />
              {cantidadDisponible === 0 ? 'Sin stock' : 'Agregar'}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Productos
