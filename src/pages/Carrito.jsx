import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'
import { CartContext } from '../context/CartContext'
import { FaTrash, FaArrowLeft, FaShoppingBag, FaMinus, FaPlus } from 'react-icons/fa'

const Carrito = () => {
  const { cart, handleDeleteFromCart, handleAddToCart } = useContext(CartContext)

  const total = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)

  const incrementarCantidad = (item) => {
    handleAddToCart({...item, cantidad: item.cantidad + 1})
  }

  const decrementarCantidad = (item) => {
    if (item.cantidad > 1) {
      handleAddToCart({...item, cantidad: item.cantidad - 1})
    } else {
      handleDeleteFromCart(item)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Sección Hero */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Tu <span className="text-emerald-600">Carrito</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Revisa los productos que has seleccionado y completa tu compra.
          </p>
        </div>
      </section>

      {/* Sección del Carrito */}
      <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-8 sm:pb-32">
        <div className="mx-auto max-w-2xl">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <div className="mx-auto h-24 w-24 text-gray-300">
                <FaShoppingBag className="text-6xl mx-auto" />
              </div>
              <h3 className="mt-2 text-sm font-semibold text-gray-900">Tu carrito está vacío</h3>
              <p className="mt-1 text-sm text-gray-500">Comienza a comprar para agregar artículos a tu carrito.</p>
              <div className="mt-6">
                <Link
                  to="/productos"
                  className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-emerald-500"
                >
                  <FaArrowLeft className="text-sm" />
                  Ver Productos
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg">
              {/* Lista de Productos */}
              <div className="px-6 py-8">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Productos en el carrito ({cart.length})</h2>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {cart.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.imagen}
                            alt={item.nombre}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{item.nombre}</h3>
                              <p className="ml-4">${item.precio}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{item.categoria}</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500">Cantidad:</span>
                              <div className="flex items-center border border-gray-300 rounded-md">
                                <button
                                  onClick={() => decrementarCantidad(item)}
                                  className="px-3 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                >
                                  <FaMinus className="text-xs" />
                                </button>
                                <span className="px-3 py-1 border-x border-gray-300 bg-gray-50 font-medium">
                                  {item.cantidad}
                                </span>
                                <button
                                  onClick={() => incrementarCantidad(item)}
                                  className="px-3 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                >
                                  <FaPlus className="text-xs" />
                                </button>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <p className="text-gray-900 font-medium">Subtotal: ${(item.precio * item.cantidad).toFixed(2)}</p>
                              <button
                                type="button"
                                className="font-medium text-red-600 hover:text-red-500 flex items-center gap-1"
                                onClick={() => handleDeleteFromCart(item)}
                              >
                                <FaTrash className="h-4 w-4" />
                                Eliminar
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Resumen y Botón de Compra */}
              <div className="border-t border-gray-200 px-6 py-6">
                <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                  <p>Total</p>
                  <p>${total.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500 mb-6">
                  Envío e impuestos calculados al finalizar la compra.
                </p>
                <div className="flex gap-4">
                  <Link
                    to="/productos"
                    className="flex-1 flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-900 shadow-sm hover:bg-gray-50"
                  >
                    <FaArrowLeft className="text-sm" />
                    Seguir Comprando
                  </Link>
                  <button className="flex-1 flex items-center justify-center rounded-md border border-transparent bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-700">
                    Finalizar Compra
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Carrito 