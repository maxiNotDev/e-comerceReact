import React, { useContext, useState, useEffect } from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'
import Productos from '../components/Productos'
import loading from '../assets/loading.gif'
import { CartContext } from '../context/CartContext'

const GaleriaDeProductos = () => {
  const { cargando, productosFiltrados, busqueda, setBusqueda } = useContext(CartContext)
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(8)

  // Reiniciar página a 1 cuando cambia la búsqueda
  useEffect(() => {
    setCurrentPage(1)
  }, [busqueda])

  // Obtener productos actuales
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = productosFiltrados.slice(indexOfFirstProduct, indexOfLastProduct)

  // Cambiar página
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  const totalPages = Math.ceil(productosFiltrados.length / productsPerPage)

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Sección Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-24 pb-12 sm:px-8 sm:pt-20 sm:pb-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl whitespace-nowrap">
            Nuestra Colección de <span className="text-emerald-600">Té</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Explora nuestra cuidadosamente seleccionada colección de tés premium, cada uno con su propio carácter único e historia.
          </p>
        </div>
      </section>

      {/* Sección de Búsqueda */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="relative">
            <input 
              type='text'
              placeholder='Busca tu té perfecto...'
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full rounded-full border-0 px-6 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-6">
              <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Productos */}
      <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-8  sm:pb-32">
        {cargando ? (
          <div className="flex justify-center items-center h-96">
            <img src={loading} alt='cargando' className="w-24 h-24" />
          </div>
        ) : currentProducts && currentProducts.length > 0 ? (
          <>
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4 pt-16">
              {currentProducts.map((producto) => (
                <Productos key={producto.id} producto={producto} />
              ))}
            </div>
            {/* Paginación */}
            {totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-4">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>

                <span className="text-sm text-gray-700">
                  Página {currentPage} de {totalPages}
                </span>

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto h-24 w-24 text-gray-300">
              <i className="fa-solid fa-magnifying-glass text-6xl"></i>
            </div>
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No se encontraron tés</h3>
            <p className="mt-1 text-sm text-gray-500">Intenta ajustar tus términos de búsqueda.</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}

export default GaleriaDeProductos
