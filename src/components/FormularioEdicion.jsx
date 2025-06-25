import React, { useState, useEffect } from 'react';

function FormularioEdicion({ productoSeleccionado, onActualizar, onClose }) {
    const [producto, setProducto] = useState(productoSeleccionado);

    useEffect(() => {
        setProducto(productoSeleccionado)
    }, [productoSeleccionado])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="bg-blue-50 px-6 py-4 border-b border-blue-200">
                    <h2 className="text-xl font-semibold text-blue-900">Editar Producto</h2>
                </div>
                
                <form onSubmit={(e) => {
                    e.preventDefault()
                    onActualizar(producto)
                }} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* ID (solo lectura) */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ID del Producto
                            </label>
                            <input
                                type="number"
                                name="id"
                                value={producto.id || ''}
                                onChange={handleChange}
                                readOnly
                                className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-500 bg-gray-50 cursor-not-allowed"
                            />
                        </div>

                        {/* Nombre */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre del Producto *
                            </label>
                            <input
                                type="text"
                                name="nombre"
                                value={producto.nombre || ''}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Nombre del producto"
                            />
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
                                    value={producto.precio || ''}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    step="0.01"
                                    className="w-full rounded-md border border-gray-300 pl-8 pr-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        {/* Stock */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Stock Disponible *
                            </label>
                            <input
                                type="number"
                                name="stock"
                                value={producto.stock || ''}
                                onChange={handleChange}
                                required
                                min="0"
                                className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="0"
                            />
                        </div>

                        {/* Categoría */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Categoría *
                            </label>
                            <select
                                name="categoria"
                                value={producto.categoria || ''}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                        </div>

                        {/* URL de Imagen */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                URL de la Imagen *
                            </label>
                            <input
                                type="url"
                                name="imagen"
                                value={producto.imagen || ''}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="https://ejemplo.com/imagen.jpg"
                            />
                        </div>

                        {/* Vista previa de la imagen */}
                        {producto.imagen && (
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Vista Previa
                                </label>
                                <div className="flex items-center gap-4">
                                    <img
                                        src={producto.imagen}
                                        alt="Vista previa"
                                        className="h-20 w-20 rounded-lg object-cover border border-gray-200"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                    <div className="text-sm text-gray-500">
                                        <p>Imagen actual del producto</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Descripción */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Descripción *
                            </label>
                            <textarea
                                name="descripcion"
                                value={producto.descripcion || ''}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                                placeholder="Describe los beneficios y características del producto..."
                            />
                        </div>
                    </div>

                    {/* Botones */}
                    <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            Actualizar Producto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormularioEdicion;