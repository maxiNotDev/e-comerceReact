import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const {email, setEmail, password, setPassword, handleSubmit, errors} = useAuth()

  return (
    <div className="min-h-screen bg-white">
      {/* Sección de Login Centrada */}
      <section className="flex items-center justify-center min-h-screen px-6 sm:px-8">
        <div className="w-full max-w-md">
          {/* Título */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Iniciar Sesión
            </h1>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Accede a tu cuenta para continuar
            </p>
          </div>

          {/* Formulario */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="formBasicEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Correo Electrónico
                </label>
                <input
                  id="formBasicEmail"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full rounded-md border px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:border-emerald-500'
                  }`}
                />
                {errors.email && (
                  <div className="text-red-600 text-sm mt-2">
                    {errors.email}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="formBasicPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña
                </label>
                <input
                  id="formBasicPassword"
                  type="password"
                  placeholder="Tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full rounded-md border px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                    errors.password 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:border-emerald-500'
                  }`}
                />
                {errors.password && (
                  <div className="text-red-600 text-sm mt-2">
                    {errors.password}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-colors"
              >
                Iniciar Sesión
              </button>
            </form>

            {/* Enlaces adicionales */}
            <div className="mt-6 text-center space-y-3">
              <p className="text-sm text-gray-600">
                ¿No tienes una cuenta?{' '}
                <a href="#" className="font-semibold text-emerald-600 hover:text-emerald-500 transition-colors">
                  Regístrate aquí
                </a>
              </p>
              <div className="pt-2 border-t border-gray-200">
                <Link 
                  to="/" 
                  className="text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-arrow-left"></i>
                  Volver al inicio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
