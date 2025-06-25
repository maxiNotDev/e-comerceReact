import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { FaTrash, FaTimes, FaMinus, FaPlus } from 'react-icons/fa'

const Cart = ({ isOpen, onClose }) => {
    const { 
        cart, 
        handleDeleteFromCart, 
        incrementarCantidadEnCarrito, 
        decrementarCantidadEnCarrito,
        productos,
        getCantidadEnCarrito
    } = useContext(CartContext)

    const total = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)

    if (!isOpen) return null

    return (
        <div className="relative z-50">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
            
            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <div className="pointer-events-auto w-screen max-w-md">
                            <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                <div className="px-4 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <h2 className="text-lg font-medium text-gray-900">Carrito de compras</h2>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button
                                                type="button"
                                                className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                onClick={onClose}
                                            >
                                                <span className="absolute -inset-0.5" />
                                                <span className="sr-only">Cerrar panel</span>
                                                <FaTimes className="h-6 w-6" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                    {cart.length === 0 ? (
                                        <div className="text-center py-12">
                                            <div className="mx-auto h-24 w-24 text-gray-300">
                                                <i className="fa-solid fa-shopping-cart text-6xl"></i>
                                            </div>
                                            <h3 className="mt-2 text-sm font-semibold text-gray-900">Tu carrito está vacío</h3>
                                            <p className="mt-1 text-sm text-gray-500">Comienza a comprar para agregar artículos a tu carrito.</p>
                                        </div>
                                    ) : (
                                        <div className="flow-root">
                                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                {cart.map((item) => {
                                                    const producto = productos.find(p => p.id === item.id);
                                                    const cantidadDisponible = producto ? producto.stock - item.cantidad : 0;
                                                    
                                                    return (
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
                                                                    
                                                                    {/* Información de stock */}
                                                                    <p className="mt-1 text-xs text-gray-400">
                                                                        Stock disponible: {cantidadDisponible} unidades
                                                                    </p>
                                                                </div>
                                                                
                                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                                    <div className="flex items-center gap-2">
                                                                        <button
                                                                            onClick={() => {
                                                                                console.log('Botón - presionado para producto:', item.id);
                                                                                decrementarCantidadEnCarrito(item.id);
                                                                            }}
                                                                            className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                                                        >
                                                                            <FaMinus className="text-xs" />
                                                                        </button>
                                                                        <span className="text-gray-900 font-medium">
                                                                            {item.cantidad}
                                                                        </span>
                                                                        <button
                                                                            onClick={() => incrementarCantidadEnCarrito(item.id)}
                                                                            disabled={cantidadDisponible === 0}
                                                                            className={`flex items-center justify-center w-6 h-6 rounded-full border border-gray-300 text-gray-700 ${
                                                                                cantidadDisponible === 0
                                                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                                                    : 'bg-white hover:bg-gray-50'
                                                                            }`}
                                                                        >
                                                                            <FaPlus className="text-xs" />
                                                                        </button>
                                                                    </div>

                                                                    <div className="flex">
                                                                        <button
                                                                            type="button"
                                                                            className="font-medium text-emerald-600 hover:text-emerald-500"
                                                                            onClick={() => handleDeleteFromCart(item)}
                                                                        >
                                                                            <FaTrash className="h-4 w-4" />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                {cart.length > 0 && (
                                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <p>Subtotal</p>
                                            <p>${total.toFixed(2)}</p>
                                        </div>
                                        <p className="mt-0.5 text-sm text-gray-500">Envío e impuestos calculados al finalizar la compra.</p>
                                        <div className="mt-6">
                                            <button className="flex w-full items-center justify-center rounded-md border border-transparent bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-700">
                                                Finalizar Compra
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
