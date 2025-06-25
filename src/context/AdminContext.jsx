import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
export const AdminContext = createContext()

export const AdminProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false)
    const [seleccionado, setSeleccionado] = useState(null)
    const [openEditor, setOpenEditor] = useState(false)
    const apiUrl = 'https://68571a6421f5d3463e54770b.mockapi.io/talentotech'

    // Función helper para manejar precios correctamente
    const parsePrecio = (precio) => {
        // Convertir a número y redondear a 2 decimales para evitar problemas de precisión
        return Math.round(parseFloat(precio) * 100) / 100;
    }

    useEffect(() => {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                console.log('=== PRODUCTOS CARGADOS DESDE LA API ===');
                console.log('Total de productos:', data.length);
                console.log('Estructura del primer producto:', data[0]);
                console.log('IDs de todos los productos:', data.map(p => ({ id: p.id, nombre: p.nombre })));
                
                // Normalizar todos los productos para asegurar estructura consistente
                const productosNormalizados = data.map(producto => ({
                    id: parseInt(producto.id), // Asegurar que ID sea número
                    nombre: producto.nombre,
                    precio: parsePrecio(producto.precio),
                    stock: parseInt(producto.stock),
                    imagen: producto.imagen,
                    categoria: producto.categoria,
                    descripcion: producto.descripcion,
                    cantidad: producto.cantidad || 0 // Agregar cantidad si no existe
                }));
                
                console.log('Productos normalizados:', productosNormalizados);
                
                setTimeout(() => {
                    setProductos(productosNormalizados);
                    setLoading(false);
                }, 2000);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    const cargarProductos = async () => {
        try {
            const res = await fetch(apiUrl)
            const data = await res.json()
            
            // Normalizar todos los productos para asegurar estructura consistente
            // Filtrar solo los campos que necesitamos y ignorar los que agrega MockAPI
            const productosNormalizados = data.map(producto => ({
                id: parseInt(producto.id), // Asegurar que ID sea número
                nombre: producto.nombre || producto.name || '', // MockAPI puede usar 'name' en lugar de 'nombre'
                precio: parsePrecio(producto.precio),
                stock: parseInt(producto.stock),
                imagen: producto.imagen,
                categoria: producto.categoria,
                descripcion: producto.descripcion,
                cantidad: producto.cantidad || 0 // Agregar cantidad si no existe
            }));
            
            // Eliminar duplicados por ID (por si acaso)
            const productosUnicos = productosNormalizados.filter((producto, index, self) => 
                index === self.findIndex(p => p.id === producto.id)
            );
            
            setProductos(productosUnicos)
            
            // Verificar sincronización
            console.log('=== SINCRONIZACIÓN DE PRODUCTOS ===');
            console.log('Productos en API:', productosUnicos.length);
            console.log('IDs en API:', productosUnicos.map(p => p.id));
            console.log('Campos extra detectados:', data.filter(p => p.createdAt || p.name || p.avatar).length, 'productos');
        } catch (error) {
            console.error("Error al cargar productos:", error);
        }
    }

    const agregarProducto = async (nuevoProducto) => {
        try {
            console.log('=== AGREGANDO NUEVO PRODUCTO ===');
            console.log('Datos originales:', nuevoProducto);
            
            // Preparar los datos para enviar a MockAPI
            const productoParaEnviar = {
                nombre: nuevoProducto.nombre,
                precio: parsePrecio(nuevoProducto.precio),
                stock: parseInt(nuevoProducto.stock),
                imagen: nuevoProducto.imagen,
                categoria: nuevoProducto.categoria,
                descripcion: nuevoProducto.descripcion
            };
            
            console.log('Datos a enviar a MockAPI:', productoParaEnviar);
            
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productoParaEnviar)
            })
            
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            
            const data = await res.json()
            console.log('Respuesta de MockAPI:', data);
            
            // Limpiar y normalizar los datos recibidos de MockAPI
            const productoNormalizado = {
                id: parseInt(data.id), // Convertir ID a número
                nombre: data.nombre,
                precio: parsePrecio(data.precio),
                stock: parseInt(data.stock),
                imagen: data.imagen,
                categoria: data.categoria,
                descripcion: data.descripcion,
                cantidad: 0 // Agregar campo cantidad que tienen los otros productos
            };
            
            console.log('Producto normalizado:', productoNormalizado);
            
            // Agregar al estado local
            setProductos([...productos, productoNormalizado])
            setOpen(false)
            
            Swal.fire({
                title: 'Éxito!',
                text: 'Producto agregado correctamente',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
        } catch (error) {
            console.error("Error al agregar producto:", error);
            Swal.fire({
                title: 'Error!',
                text: 'Hubo un problema al agregar el producto',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }

    const actulizarProducto = async (productoActualizado) => {
        try {
            console.log('=== INICIANDO ACTUALIZACIÓN DE PRODUCTO ===');
            console.log('Producto a actualizar:', productoActualizado);
            
            // Buscar el producto original
            const productoOriginal = productos.find(p => p.id === productoActualizado.id);
            if (!productoOriginal) {
                throw new Error('Producto no encontrado en el estado local');
            }
            
            console.log('Producto original:', productoOriginal.nombre);
            
            // MockAPI no permite PUT/PATCH, solo GET, POST y DELETE
            // Estrategia: Verificar si existe, eliminar si existe, y crear uno nuevo
            
            // 1. Verificar si el producto existe en la API
            const checkUrl = `${apiUrl}/${productoActualizado.id}`;
            console.log('Verificando si el producto existe:', checkUrl);
            
            const checkRes = await fetch(checkUrl);
            
            if (checkRes.ok) {
                // El producto existe, procedemos a eliminarlo
                console.log('Producto encontrado en la API, procediendo a eliminar...');
                
                const deleteRes = await fetch(checkUrl, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                if (!deleteRes.ok) {
                    throw new Error(`Error al eliminar producto: HTTP ${deleteRes.status}`);
                }
                
                console.log('Producto eliminado exitosamente de la API');
            } else if (checkRes.status === 404) {
                console.log('Producto no encontrado en la API, continuando con la creación...');
            } else {
                throw new Error(`Error al verificar producto: HTTP ${checkRes.status}`);
            }
            
            // 2. Crear el producto actualizado
            const productoParaEnviar = {
                nombre: productoActualizado.nombre,
                precio: parsePrecio(productoActualizado.precio),
                stock: parseInt(productoActualizado.stock),
                imagen: productoActualizado.imagen,
                categoria: productoActualizado.categoria,
                descripcion: productoActualizado.descripcion
            };
            
            console.log('Creando producto actualizado:', productoParaEnviar);
            
            const createRes = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productoParaEnviar)
            });
            
            if (!createRes.ok) {
                throw new Error(`Error al crear producto actualizado: HTTP ${createRes.status}`);
            }
            
            const nuevoProducto = await createRes.json();
            console.log('Producto actualizado creado:', nuevoProducto);
            
            // 3. Actualizar el estado local inmediatamente para evitar duplicados
            const productoNormalizado = {
                id: parseInt(nuevoProducto.id),
                nombre: nuevoProducto.nombre,
                precio: parsePrecio(nuevoProducto.precio),
                stock: parseInt(nuevoProducto.stock),
                imagen: nuevoProducto.imagen,
                categoria: nuevoProducto.categoria,
                descripcion: nuevoProducto.descripcion,
                cantidad: 0
            };
            
            // Reemplazar el producto en el estado local
            setProductos(prevProductos => 
                prevProductos.map(producto => 
                    producto.id === productoActualizado.id ? productoNormalizado : producto
                )
            );
            
            setOpenEditor(false);
            
            // Recargar productos después de un breve delay para asegurar sincronización
            setTimeout(async () => {
                await cargarProductos();
            }, 1000);
            
            console.log('Actualización completada exitosamente');
            
            Swal.fire({
                title: '¡Actualizado!',
                text: `"${productoActualizado.nombre}" ha sido actualizado correctamente`,
                icon: 'success',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#059669'
            });
            
            return productoNormalizado;
        } catch (error) {
            console.error("=== ERROR EN ACTUALIZACIÓN ===");
            console.error("Error completo:", error);
            console.error("Stack trace:", error.stack);
            
            Swal.fire({
                title: 'Error!',
                text: `Hubo un problema al actualizar el producto: ${error.message}`,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            throw error;
        }
    }

    const eliminarProducto = async (id) => {
        // Buscar el producto antes de mostrar la confirmación
        const productToDelete = productos.find(p => p.id === id);
        if (!productToDelete) {
            Swal.fire({
                title: 'Error!',
                text: 'Producto no encontrado',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return;
        }

        // Mostrar confirmación con SweetAlert2
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: `¿Realmente quieres eliminar "${productToDelete.nombre}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
            customClass: {
                popup: 'rounded-lg',
                confirmButton: 'rounded-md',
                cancelButton: 'rounded-md'
            }
        });

        if (result.isConfirmed) {
            try {
                console.log('=== ELIMINANDO PRODUCTO ===');
                console.log('ID del producto a eliminar:', id);
                console.log('Producto a eliminar:', productToDelete.nombre);
                
                // Hacer la llamada DELETE a MockAPI
                const deleteUrl = `${apiUrl}/${id}`;
                console.log('URL de eliminación:', deleteUrl);
                
                const res = await fetch(deleteUrl, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                
                console.log('Producto eliminado exitosamente de MockAPI');
                
                // Recargar productos desde la API para asegurar sincronización
                await cargarProductos();
                
                Swal.fire({
                    title: "¡Eliminado!",
                    text: `"${productToDelete.nombre}" ha sido eliminado correctamente`,
                    icon: "success",
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#059669'
                });
            } catch (error) {
                console.error("Error al eliminar producto:", error);
                Swal.fire({
                    title: 'Error!',
                    text: `Hubo un problema al eliminar "${productToDelete.nombre}": ${error.message}`,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }
        }
    }

    return (
        <AdminContext.Provider value={{
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
        }}>
            {children}
        </AdminContext.Provider>
    )
}