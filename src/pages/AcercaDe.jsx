import React from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'

const AcercaDe = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Sección Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-12 sm:px-8 sm:pt-16 pb-20">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Acerca de <span className="text-emerald-600">Nosotros</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Descubre la historia detrás de nuestra pasión por el té y cómo hemos creado una experiencia única para los amantes de esta bebida milenaria.
          </p>
        </div>
      </section>

      {/* Sección Nuestra Historia */}
      <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-8 sm:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
              Nuestra Historia
            </h2>
            <p className="text-lg leading-8 text-gray-600 mb-6">
              Todo comenzó con una simple taza de té en una tarde lluviosa. Desde ese momento, nos embarcamos en un viaje para descubrir los mejores tés del mundo y compartir esa experiencia con personas que, como nosotros, aprecian los pequeños momentos de tranquilidad.
            </p>
            <p className="text-lg leading-8 text-gray-600">
              Hoy, nuestra tienda es más que un lugar para comprar té; es un espacio donde la tradición se encuentra con la innovación, donde cada mezcla cuenta una historia y cada sorbo transporta a lugares lejanos.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://cdn.prod.website-files.com/6765d66f89f7f0b8ec80660c/6765d66f89f7f0b8ec8067f6_%D0%A3%D0%BB%D1%83%D0%BD%20%D0%A2%D0%B5%D0%B3%D1%83%D0%B0%D0%BD%D1%8C%D0%B8%D0%BD%D1%8C%20%D0%B2%20%D0%9A%D1%83%D0%B3%D1%83%D0%B0%2C%20%D0%BF%D1%80%D0%BE%D0%B6%D0%B0%D1%80%D0%B5%D0%BD%D0%BD%D1%8B%D0%B8%CC%86%20%D0%B8%20%D0%B2%D1%8B%D0%B4%D0%B5%D1%80%D0%B6%D0%B0%D0%BD%D0%BD%D1%8B%D0%B8%CC%86%2C%202019%20%D0%B3(3)-min.jpg"
              alt="Nuestra historia del té"
              className="w-full h-auto rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Sección Nuestros Valores */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Nuestros Valores</h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Los principios que guían cada decisión que tomamos
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <i className="fa-solid fa-leaf text-emerald-600 text-xl"></i>
            </div>
            <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">Calidad Premium</h3>
            <p className="mt-2 text-base leading-7 text-gray-600">Seleccionamos solo los mejores tés de las regiones más prestigiosas del mundo</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <i className="fa-solid fa-heart text-blue-600 text-xl"></i>
            </div>
            <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">Sostenibilidad</h3>
            <p className="mt-2 text-base leading-7 text-gray-600">Comprometidos con prácticas responsables y respeto por el medio ambiente</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
              <i className="fa-solid fa-users text-yellow-600 text-xl"></i>
            </div>
            <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">Comunidad</h3>
            <p className="mt-2 text-base leading-7 text-gray-600">Construimos una comunidad de amantes del té que comparten experiencias</p>
          </div>
        </div>
      </section>

      {/* Sección Galería de Fotos */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Nuestro Mundo del Té</h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Un vistazo a nuestro proceso y pasión por el té
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="relative">
            <img 
              src="https://cdn.prod.website-files.com/6765d66f89f7f0b8ec80660c/6765d66f89f7f0b8ec8067f6_%D0%A3%D0%BB%D1%83%D0%BD%20%D0%A2%D0%B5%D0%B3%D1%83%D0%B0%D0%BD%D1%8C%D0%B8%D0%BD%D1%8C%20%D0%B2%20%D0%9A%D1%83%D0%B3%D1%83%D0%B0%2C%20%D0%BF%D1%80%D0%BE%D0%B6%D0%B0%D1%80%D0%B5%D0%BD%D0%BD%D1%8B%D0%B8%CC%86%20%D0%B8%20%D0%B2%D1%8B%D0%B4%D0%B5%D1%80%D0%B6%D0%B0%D0%BD%D0%BD%D1%8B%D0%B8%CC%86%2C%202019%20%D0%B3(3)-min.jpg"
              alt="Selección de tés"
              className="w-full h-64 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 rounded-b-2xl">
              <h3 className="text-white font-semibold">Selección Artesanal</h3>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://cdn.prod.website-files.com/6765d66f89f7f0b8ec80660c/6765d66f89f7f0b8ec8067f6_%D0%A3%D0%BB%D1%83%D0%BD%20%D0%A2%D0%B5%D0%B3%D1%83%D0%B0%D0%BD%D1%8C%D0%B8%D0%BD%D1%8C%20%D0%B2%20%D0%9A%D1%83%D0%B3%D1%83%D0%B0%2C%20%D0%BF%D1%80%D0%BE%D0%B6%D0%B0%D1%80%D0%B5%D0%BD%D0%BD%D1%8B%D0%B8%CC%86%20%D0%B8%20%D0%B2%D1%8B%D0%B4%D0%B5%D1%80%D0%B6%D0%B0%D0%BD%D0%BD%D1%8B%D0%B8%CC%86%2C%202019%20%D0%B3(3)-min.jpg"
              alt="Proceso de mezcla"
              className="w-full h-64 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 rounded-b-2xl">
              <h3 className="text-white font-semibold">Proceso de Mezcla</h3>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://cdn.prod.website-files.com/6765d66f89f7f0b8ec80660c/6765d66f89f7f0b8ec8067f6_%D0%A3%D0%BB%D1%83%D0%BD%20%D0%A2%D0%B5%D0%B3%D1%83%D0%B0%D0%BD%D1%8C%D0%B8%D0%BD%D1%8C%20%D0%B2%20%D0%9A%D1%83%D0%B3%D1%83%D0%B0%2C%20%D0%BF%D1%80%D0%BE%D0%B6%D0%B0%D1%80%D0%B5%D0%BD%D0%BD%D1%8B%D0%B8%CC%86%20%D0%B8%20%D0%B2%D1%8B%D0%B4%D0%B5%D1%80%D0%B6%D0%B0%D0%BD%D0%BD%D1%8B%D0%B8%CC%86%2C%202019%20%D0%B3(3)-min.jpg"
              alt="Experiencia del cliente"
              className="w-full h-64 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 rounded-b-2xl">
              <h3 className="text-white font-semibold">Experiencia Única</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Compromiso */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img 
              src="https://cdn.prod.website-files.com/6765d66f89f7f0b8ec80660c/6765d66f89f7f0b8ec8067f6_%D0%A3%D0%BB%D1%83%D0%BD%20%D0%A2%D0%B5%D0%B3%D1%83%D0%B0%D0%BD%D1%8C%D0%B8%D0%BD%D1%8C%20%D0%B2%20%D0%9A%D1%83%D0%B3%D1%83%D0%B0%2C%20%D0%BF%D1%80%D0%BE%D0%B6%D0%B0%D1%80%D0%B5%D0%BD%D0%BD%D1%8B%D0%B8%CC%86%20%D0%B8%20%D0%B2%D1%8B%D0%B4%D0%B5%D1%80%D0%B6%D0%B0%D0%BD%D0%BD%D1%8B%D0%B8%CC%86%2C%202019%20%D0%B3(3)-min.jpg"
              alt="Nuestro compromiso"
              className="w-full h-auto rounded-3xl shadow-2xl"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
              Nuestro Compromiso
            </h2>
            <p className="text-lg leading-8 text-gray-600 mb-6">
              Nos comprometemos a ofrecer no solo productos excepcionales, sino también una experiencia completa que enriquezca tu relación con el té. Cada taza que preparas con nuestros productos es el resultado de años de experiencia y pasión.
            </p>
            <p className="text-lg leading-8 text-gray-600">
              Trabajamos directamente con productores locales y cooperativas que comparten nuestros valores de calidad y sostenibilidad, asegurando que cada compra tenga un impacto positivo en las comunidades productoras.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AcercaDe
