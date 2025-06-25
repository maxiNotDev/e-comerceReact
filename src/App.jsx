import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AcercaDe from './pages/AcercaDe'
import Contactos from './pages/Contactos'
import GaleriaDeProductos from './pages/GaleriaDeProductos'
import NotFound from './pages/NotFound'
import Admin from './pages/Admin'
import Detalles from './pages/Detalles'
import Login from './pages/Login'
import Carrito from './pages/Carrito'
import RutaProtegida from './auth/RutasProtegidas'
import { CartContext } from './context/CartContext'

function App() {
  const { isAuthenticated } = useContext(CartContext)

  return (
    
    <Routes>

      <Route path='/' element={<Home />} />

      <Route path='/acercade' element={<AcercaDe />} />

      <Route path='/productos' element={<GaleriaDeProductos />} />

      <Route path='/productos/:id' element={<Detalles />} />

      <Route path='/carrito' element={<Carrito />} />

      <Route path='/contacto' element={<Contactos />} />

      <Route path='/admin' element={<RutaProtegida isAuthenticated={isAuthenticated} requiredRole="admin"> <Admin /> </RutaProtegida>} />

      <Route path='/login' element={<Login />} />

      <Route path='*' element={<NotFound />} />

    </Routes>
  )
}

export default App
