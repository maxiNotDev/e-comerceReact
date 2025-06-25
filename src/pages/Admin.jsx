import React, { useState, useEffect, useContext } from "react";
import FormularioProducto from "../components/FormularioProducto";
import FormularioEdicion from "../components/FormularioEdicion";
import { CartContext } from "../context/CartContext";
import { AdminContext } from "../context/AdminContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const { setIsAuth } = useContext(CartContext)
    const { user, logout } = useAuth()
    const {
        productos,
        loading,
        open,
        setOpen,
        openEditor,
        setOpenEditor,
        seleccionado,
        setSeleccionado,
        agregarProducto,
        actulizarProducto,
        eliminarProducto,
    } = useContext(AdminContext)
    const navigate = useNavigate()

    // Verificar que el usuario tenga rol de admin
    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
        }
    }, [user, navigate]);

    // Si no hay usuario o no es admin, no renderizar nada
    if (!user || user.role !== 'admin') {
        return null;
    }

    const handleCloseAddModal = () => {
        setOpen(false);
    };

    const handleCloseEditModal = () => {
        setOpenEditor(false);
        setSeleccionado(null);
    };

    const handleAddProduct = async (nuevoProducto) => {
        await agregarProducto(nuevoProducto);
        handleCloseAddModal();
    };

    const handleUpdateProduct = async (productoActualizado) => {
        await actulizarProducto(productoActualizado);
        handleCloseEditModal();
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-5xl mx-auto">
                {/* NAVBAR */}
                <nav className="flex items-center justify-between bg-white rounded-lg shadow px-6 py-4 mb-8 border border-gray-200">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-emerald-600">Admin</span>
                        <span className="text-gray-400">|</span>
                        <span className="text-lg font-semibold text-gray-700">Panel Administrativo</span>
                        <span className="text-gray-400">|</span>
                        <span className="text-sm text-gray-600">Usuario: {user.name}</span>
                    </div>
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors shadow-sm"
                        onClick={logout}
                        title="Cerrar sesión"
                    >
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <span className="hidden sm:inline">Cerrar sesión</span>
                    </button>
                </nav>

                <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Productos</h1>
                        <button
                            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors shadow-sm font-semibold"
                            onClick={() => setOpen(true)}
                        >
                            + Agregar producto nuevo
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <span className="text-emerald-600 font-semibold text-lg animate-pulse">Cargando...</span>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagen</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {productos.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <img
                                                    src={product.imagen}
                                                    alt={product.nombre}
                                                    className="h-14 w-14 rounded-lg object-cover border border-gray-200"
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-base font-semibold text-gray-900">{product.nombre}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-emerald-700 font-bold">${product.precio}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex gap-2">
                                                    <button
                                                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm font-medium shadow-sm"
                                                        onClick={() => {
                                                            setOpenEditor(true)
                                                            setSeleccionado(product)
                                                        }}
                                                    >Editar</button>
                                                    <button
                                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm font-medium shadow-sm"
                                                        onClick={() => eliminarProducto(product.id)}
                                                    >Eliminar</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* MODALES */}
                {open && (
                    <FormularioProducto 
                        onAgregar={handleAddProduct} 
                        onClose={handleCloseAddModal}
                    />
                )}
                {openEditor && seleccionado && (
                    <FormularioEdicion 
                        productoSeleccionado={seleccionado} 
                        onActualizar={handleUpdateProduct}
                        onClose={handleCloseEditModal}
                    />
                )}
            </div>
        </div>
    );
};

export default Admin;
