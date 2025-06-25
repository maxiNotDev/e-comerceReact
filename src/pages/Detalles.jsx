import React, { useEffect } from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'
import DetallesProductos from '../components/DetallesProductos'

const Detalles = () => {
  // Hacer scroll hacia arriba cuando se monta el componente
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
    

      {/* Sección de Detalles del Producto */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8">
        <DetallesProductos />
      </section>

      <Footer />
    </div>
  )
}

export default Detalles 