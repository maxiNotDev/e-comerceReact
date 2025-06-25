import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link to="/" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Inicio</span>
            <i className="fa-solid fa-home text-lg"></i>
          </Link>
          <Link to="/productos" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Productos</span>
            <i className="fa-solid fa-leaf text-lg"></i>
          </Link>
          <Link to="/acercade" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Acerca de</span>
            <i className="fa-solid fa-info-circle text-lg"></i>
          </Link>
          <Link to="/contacto" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Contacto</span>
            <i className="fa-solid fa-envelope text-lg"></i>
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500">
            &copy; 2025 Tienda de Té. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
