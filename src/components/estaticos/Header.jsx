import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { CartContext } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'

const Header = () => {
  const { cart } = useContext(CartContext)
  const { user, logout } = useAuth()

  const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0)

  return (
    <header className="sticky top-0 z-50 -mb-px bg-white/80 backdrop-blur [@supports(backdrop-filter:blur(0))]:bg-white/60">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex h-16 items-center justify-between gap-8">
          <NavLink className="flex items-center gap-2" to="/">
            <span className="text-xl font-semibold text-gray-900">Tienda de Té</span>
          </NavLink>
          
          <nav className="hidden md:flex items-center gap-8">
            <NavLink 
              className="text-sm font-medium text-gray-700 transition hover:text-gray-900" 
              to="/"
            >
              Inicio
            </NavLink>
            <NavLink 
              className="text-sm font-medium text-gray-700 transition hover:text-gray-900" 
              to="/productos"
            >
              Productos
            </NavLink>
            <NavLink 
              className="text-sm font-medium text-gray-700 transition hover:text-gray-900" 
              to="/acercade"
            >
              Acerca de
            </NavLink>
            <NavLink 
              className="text-sm font-medium text-gray-700 transition hover:text-gray-900" 
              to="/contacto"
            >
              Contacto
            </NavLink>
          </nav>

          <div className="flex items-center gap-4">
            <NavLink 
              to="/carrito"
              className="relative text-gray-700 hover:text-gray-900 transition-colors" 
            >
              <FaShoppingCart className="text-lg" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </NavLink>
            
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-emerald-600">
                  ¡Hola, {user.name}!
                </span>
                {user.role === 'admin' && (
                  <NavLink 
                    className="text-sm font-medium text-gray-700 transition hover:text-gray-900" 
                    to="/admin"
                  >
                    Admin
                  </NavLink>
                )}
                <button
                  onClick={logout}
                  className="text-sm font-medium text-gray-700 transition hover:text-red-600"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <>
                <NavLink 
                  className="text-sm font-medium text-gray-700 transition hover:text-gray-900" 
                  to="/login"
                >
                  Iniciar Sesión
                </NavLink>
                <NavLink 
                  className="text-sm font-medium text-gray-700 transition hover:text-gray-900" 
                  to="/login"
                >
                  Admin
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
