import React, { useState } from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Contactos = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Acá iría la lógica para enviar el formulario
    console.log('Formulario enviado:', formData)
    
    // Mostrar toast de éxito
    toast.success('¡Mensaje enviado con éxito! Te contactaremos pronto.', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
    
    setFormData({ nombre: '', email: '', telefono: '', mensaje: '' })
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Sección Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-12 sm:px-8 sm:pt-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Contáctanos
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos lo antes posible.
          </p>
        </div>
      </section>

      {/* Sección de Contacto */}
      <section className="mx-auto max-w-7xl px-6 pb-12 sm:px-8 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Columna Izquierda - Formulario */}
          <div>
            {/* Título del Formulario */}
            <div>
              <h2 className="text-2xl text-center font-bold tracking-tight text-gray-900 mb-8 mt-5">
                Envíanos un Mensaje
              </h2>
            </div>
            
            {/* Formulario de Contacto */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="Tu nombre completo"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="tu@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono (opcional)
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="+54 11 1234-5678"
                  />
                </div>
                
                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows={11}
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full rounded-md bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-colors"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>

          {/* Columna Derecha - Mapa */}
          <div>
            <h3 className="text-2xl text-center font-bold tracking-tight text-gray-900 mb-8 mt-5">
              Nuestra Ubicación
            </h3>
            <div className="lg:sticky lg:top-8">
              <div className="bg-gray-50 rounded-2xl p-8 h-full">
                <div className="aspect-square rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.016887889546!2d-58.38157042353754!3d-34.60373887253766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4aa9f0a6da5edb%3A0x11bead4e234e558b!2sObelisco!5e0!3m2!1ses-419!2sar!4v1703123456789!5m2!1ses-419!2sar"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación de nuestra tienda"
                  ></iframe>
                </div>
                <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">Cómo Llegar</h4>
                  <p className="text-sm text-gray-600">
                    Nos encontramos en el corazón de CABA, a pocas cuadras del Obelisco. 
                    Fácil acceso por transporte público y estacionamiento disponible en la zona.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Información de Contacto */}
      <section className="bg-gray-50 pt-12 pb-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Información de Contacto
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Encuéntranos fácilmente y contáctanos de la manera que prefieras
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <FaMapMarkerAlt className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Dirección</h3>
              <p className="text-gray-600">
                Av. Corrientes 1234<br />
                CABA, Buenos Aires<br />
                C1043, Argentina
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <FaPhone className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Teléfono</h3>
              <p className="text-gray-600">
                +54 11 1234-5678<br />
                +54 11 9876-5432
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <FaEnvelope className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">
                info@tiendadete.com<br />
                ventas@tiendadete.com
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <FaClock className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Horarios</h3>
              <p className="text-gray-600">
                Lun-Vie: 9:00 - 18:00<br />
                Sábados: 10:00 - 16:00<br />
                Domingos: Cerrado
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ToastContainer />
    </div>
  )
}

export default Contactos 