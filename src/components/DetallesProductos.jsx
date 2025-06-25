import React, { useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { FaShoppingCart, FaArrowLeft, FaLeaf, FaBox, FaCalendar, FaBarcode } from 'react-icons/fa'

const DetallesProductos = () => {
  const { productos, handleAddToCart, getCantidadEnCarrito } = useContext(CartContext)
  const [cantidad, setCantidad] = useState(1)
  const { id } = useParams()

  const product = productos.find(producto => producto.id == id)

  if (!product) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto h-24 w-24 text-gray-300">
          <i className="fa-solid fa-exclamation-triangle text-6xl"></i>
        </div>
        <h3 className="mt-2 text-sm font-semibold text-gray-900">Producto no encontrado</h3>
        <p className="mt-1 text-sm text-gray-500">El producto con ID {id} no pudo ser encontrado.</p>
        <div className="mt-6">
          <Link
            to="/productos"
            className="text-sm font-semibold leading-6 text-emerald-600 hover:text-emerald-500"
          >
            <span aria-hidden="true">←</span> Volver a productos
          </Link>
        </div>
      </div>
    )
  }

  // Calcular cantidad disponible para este producto
  const cantidadEnCarrito = getCantidadEnCarrito(product.id);
  const cantidadDisponible = product.stock - cantidadEnCarrito;

  const incrementarCantidad = () => {
    if (cantidad < cantidadDisponible) {
      setCantidad(prev => prev + 1);
    }
  }

  const decrementarCantidad = () => {
    if (cantidad > 1) {
      setCantidad(prev => prev - 1);
    }
  }

  const handleAddToCartClick = () => {
    handleAddToCart({...product, cantidad: cantidad})
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        <div className="pb-8 pt-6 sm:pb-12 sm:pt-8 lg:pb-24 lg:pt-12 xl:pb-32">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-12">
            <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-4 xl:col-span-6">
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                {product.nombre}
              </h1>
              
              <div className="mt-6 flex items-center gap-x-6">
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                  {product.categoria}
                </span>
                <span className="text-2xl font-bold text-gray-900">
                  ${product.precio}
                </span>
              </div>

              <p className="mt-4 text-lg leading-8 text-gray-600">
                {product.descripcion}
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-x-4">
                  <FaBox className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Stock disponible: <span className={`font-semibold ${cantidadDisponible > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {cantidadDisponible} unidades
                    </span>
                    {cantidadEnCarrito > 0 && (
                      <span className="text-gray-500 ml-2">
                        ({cantidadEnCarrito} en carrito)
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-x-4">
                  <FaBarcode className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">SKU: {product.id * 1250}</span>
                </div>
                <div className="flex items-center gap-x-4">
                  <FaCalendar className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Fecha de lanzamiento: {new Date().toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-x-6">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={decrementarCantidad}
                    disabled={cantidad <= 1}
                    className={`px-3 py-2 text-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
                      cantidad <= 1 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'hover:text-gray-900'
                    }`}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{cantidad}</span>
                  <button
                    onClick={incrementarCantidad}
                    disabled={cantidad >= cantidadDisponible}
                    className={`px-3 py-2 text-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
                      cantidad >= cantidadDisponible 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'hover:text-gray-900'
                    }`}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCartClick}
                  disabled={cantidadDisponible === 0}
                  className={`flex items-center gap-2 rounded-md px-6 py-3 text-base font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
                    cantidadDisponible === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-500'
                  }`}
                >
                  <FaShoppingCart className="text-sm" />
                  {cantidadDisponible === 0 ? 'Sin stock' : 'Agregar al Carrito'}
                </button>
              </div>

              <div className="mt-6">
                <Link
                  to="/productos"
                  className="inline-flex items-center gap-2 text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600"
                >
                  <FaArrowLeft className="text-sm" />
                  Volver a productos
                </Link>
              </div>
            </div>
            <div className="relative mt-8 aspect-square overflow-hidden rounded-3xl bg-gray-900 sm:mt-12 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
              <img
                src={product.imagen}
                alt={product.nombre}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetallesProductos
