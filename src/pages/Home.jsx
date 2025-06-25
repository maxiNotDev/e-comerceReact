import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'
import ProductList from '../components/ProductList'
import loading from '../assets/loading.gif'
import { CartContext } from '../context/CartContext'

const Home = () => {
  const { cargando } = useContext(CartContext)
  const navigate = useNavigate()

  const handleComprarAhora = () => {
    navigate('/productos')
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Sección Hero */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Texto del Hero */}
          <div className="relative z-10">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Descubre el arte del
              <span className="text-emerald-600"> té</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Experimenta los aromas complejos y sabores delicados de nuestra colección premium de té. 
              Cada mezcla está cuidadosamente elaborada para brindarte momentos de tranquilidad y bienestar.
            </p>
            <div className="mt-10 flex justify-center items-center gap-x-6">
              <button 
                onClick={handleComprarAhora}
                className="rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                Comprar Ahora
              </button>
            </div>
          </div>
          
          {/* Imagen del Hero */}
          <div className="relative max-w-md mx-auto lg:mx-0">
            <img 
              src="https://cdn.prod.website-files.com/6765d66f89f7f0b8ec80660c/6765d66f89f7f0b8ec8067f6_%D0%A3%D0%BB%D1%83%D0%BD%20%D0%A2%D0%B5%D0%B3%D1%83%D0%B0%D0%BD%D1%8C%D0%B8%D0%BD%D1%8C%20%D0%B2%20%D0%9A%D1%83%D0%B3%D1%83%D0%B0%2C%20%D0%BF%D1%80%D0%BE%D0%B6%D0%B0%D1%80%D0%B5%D0%BD%D0%BD%D1%8B%D0%B8%CC%86%20%D0%B8%20%D0%B2%D1%8B%D0%B4%D0%B5%D1%80%D0%B6%D0%B0%D0%BD%D0%BD%D1%8B%D0%B8%CC%86%2C%202019%20%D0%B3(3)-min.jpg"
              alt="Té premium en taza"
              className="w-full h-auto rounded-3xl shadow-2xl transition-all duration-300 hover:shadow-3xl"
            />
          </div>
        </div>
      </section>

      {/* Sección Elige Tu Estilo */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Elige Tu Estilo</h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Encuentra el té perfecto para tu estado de ánimo y estilo de vida
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <i className="fa-solid fa-leaf text-emerald-600 text-xl"></i>
            </div>
            <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">Estilo Relajante</h3>
            <p className="mt-2 text-base leading-7 text-gray-600">Tés que te ayudan a encontrar tu calma interior y relajarte</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <i className="fa-solid fa-heart text-blue-600 text-xl"></i>
            </div>
            <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">Estilo Vital</h3>
            <p className="mt-2 text-base leading-7 text-gray-600">Diseñados para promover el bienestar y equilibrio en tu vida diaria</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
              <i className="fa-solid fa-bolt text-yellow-600 text-xl"></i>
            </div>
            <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">Estilo Energético</h3>
            <p className="mt-2 text-base leading-7 text-gray-600">Perfecto para quienes buscan un impulso natural de energía</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
              <i className="fa-solid fa-eye text-purple-600 text-xl"></i>
            </div>
            <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">Estilo Consciente</h3>
            <p className="mt-2 text-base leading-7 text-gray-600">Tés que te ayudan a desacelerar y reconectarte contigo mismo</p>
          </div>
        </div>
      </section>

      {/* Sección Productos */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Más Vendidos</h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Nuestras selecciones de té más populares
          </p>
        </div>
        <div className="mt-16">
          {cargando ? (
            <div className="flex justify-center items-center h-96">
              <img src={loading} alt='cargando' className="w-24 h-24" />
            </div>
          ) : (
            <ProductList />
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
