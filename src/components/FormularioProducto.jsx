import React, { useState } from 'react';

function FormularioProducto({ onAgregar, onClose }) {
    const [producto, setProducto] = useState({
        nombre: '',
        precio: '',
        stock: '',
        imagen: '',
        categoria: '',
        descripcion: ''
    });
    const [errores, setErrores] = useState({});
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };

    const validarFormulario = () => {
        const nuevosErrores = {};
        if (!producto.nombre.trim()) {
            nuevosErrores.nombre = 'El nombre es obligatorio.';
        }
        if (!producto.precio || producto.precio <= 0) {
            nuevosErrores.precio = 'El precio debe ser mayor a 0.';
        }
        if (!producto.stock || producto.stock < 0) {
            nuevosErrores.stock = 'El stock debe ser mayor o igual a 0.';
        }
        if (!producto.imagen.trim()) {
            nuevosErrores.imagen = 'La URL de la imagen es obligatoria.';
        }
        if (!producto.categoria.trim()) {
            nuevosErrores.categoria = 'La categoría es obligatoria.';
        }
        if (!producto.descripcion.trim()) {
            nuevosErrores.descripcion = 'La descripción es obligatoria.';
        }
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validarFormulario()) {
            return;
        }
        onAgregar(producto);
        setProducto({
            nombre: '',
            precio: '',
            stock: '',
            imagen: '',
            categoria: '',
            descripcion: ''
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-200">
                    <h2 className="text-xl font-semibold text-emerald-900">Agregar Nuevo Producto</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Nombre */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre del Producto *
                            </label>
                            <input
                                type="text"
                                name="nombre"
                                value={producto.nombre}
                                onChange={handleChange}
                                className={`w-full rounded-md border px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 ${
                                    errores.nombre 
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                                        : 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-500'
                                }`}
                                placeholder="Ej: Té Verde Premium"
                            />
                            {errores.nombre && (
                                <p className="mt-1 text-sm text-red-600">{errores.nombre}</p>
                            )}
                        </div>

                        {/* Precio */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Precio *
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                <input
                                    type="number"
                                    name="precio"
                                    value={producto.precio}
                                    onChange={handleChange}
                                    min="0"
                                    step="0.01"
                                    className={`w-full rounded-md border pl-8 pr-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 ${
                                        errores.precio 
                                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                                            : 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-500'
                                    }`}
                                    placeholder="0.00"
                                />
                            </div>
                            {errores.precio && (
                                <p className="mt-1 text-sm text-red-600">{errores.precio}</p>
                            )}
                        </div>

                        {/* Stock */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Stock Disponible *
                            </label>
                            <input
                                type="number"
                                name="stock"
                                value={producto.stock}
                                onChange={handleChange}
                                min="0"
                                className={`w-full rounded-md border px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 ${
                                    errores.stock 
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                                        : 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-500'
                                }`}
                                placeholder="0"
                            />
                            {errores.stock && (
                                <p className="mt-1 text-sm text-red-600">{errores.stock}</p>
                            )}
                        </div>

                        {/* Categoría */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Categoría *
                            </label>
                            <select
                                name="categoria"
                                value={producto.categoria}
                                onChange={handleChange}
                                className={`w-full rounded-md border px-4 py-3 text-gray-900 focus:outline-none focus:ring-1 ${
                                    errores.categoria 
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                                        : 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-500'
                                }`}
                            >
                                <option value="">Seleccionar categoría</option>
                                <option value="verde">Té Verde</option>
                                <option value="negro">Té Negro</option>
                                <option value="herbal">Té Herbal</option>
                                <option value="oolong">Té Oolong</option>
                                <option value="blanco">Té Blanco</option>
                                <option value="especiado">Té Especiado</option>
                                <option value="mate">Mate</option>
                                <option value="medicinal">Té Medicinal</option>
                            </select>
                            {errores.categoria && (
                                <p className="mt-1 text-sm text-red-600">{errores.categoria}</p>
                            )}
                        </div>

                        {/* URL de Imagen */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                URL de la Imagen *
                            </label>
                            <input
                                type="url"
                                name="imagen"
                                value={producto.imagen}
                                onChange={handleChange}
                                className={`w-full rounded-md border px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 ${
                                    errores.imagen 
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                                        : 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-500'
                                }`}
                                placeholder="https://ejemplo.com/imagen.jpg"
                            />
                            {errores.imagen && (
                                <p className="mt-1 text-sm text-red-600">{errores.imagen}</p>
                            )}
                        </div>

                        {/* Descripción */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Descripción *
                            </label>
                            <textarea
                                name="descripcion"
                                value={producto.descripcion}
                                onChange={handleChange}
                                rows="4"
                                className={`w-full rounded-md border px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 resize-none ${
                                    errores.descripcion 
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                                        : 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-500'
                                }`}
                                placeholder="Describe los beneficios y características del producto..."
                            />
                            {errores.descripcion && (
                                <p className="mt-1 text-sm text-red-600">{errores.descripcion}</p>
                            )}
                        </div>
                    </div>

                    {/* Botones */}
                    <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-emerald-600 text-white text-sm font-medium rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
                        >
                            Agregar Producto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormularioProducto;