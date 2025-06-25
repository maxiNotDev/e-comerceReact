import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(false)
    const [isAuthenticated, setIsAuth] = useState(false)
    const [busqueda, setBusqueda]= useState("")

    // Función helper para manejar precios correctamente
    const parsePrecio = (precio) => {
        return Math.round(parseFloat(precio) * 100) / 100;
    }

    useEffect(() => {
        fetch('https://68571a6421f5d3463e54770b.mockapi.io/talentotech')
            .then(respuesta => respuesta.json())
            .then(datos => {
                // Normalizar productos para asegurar estructura consistente
                const productosNormalizados = datos.map(producto => ({
                    id: parseInt(producto.id),
                    nombre: producto.nombre || producto.name || '',
                    precio: parsePrecio(producto.precio),
                    stock: parseInt(producto.stock),
                    imagen: producto.imagen,
                    categoria: producto.categoria,
                    descripcion: producto.descripcion,
                    cantidad: producto.cantidad || 0
                }));
                
                setTimeout(() => {
                    setProductos(productosNormalizados)
                    setCargando(false)
                }, 2000)
            })
            .catch(error => {
                setCargando(false)
                setError(true)
            })

    }, [])

    const productosFiltrados = productos.filter((producto)=> {
        const nombre = producto?.nombre || producto?.name || '';
        return nombre.toLowerCase().includes(busqueda.toLowerCase());
    })

    // Función para obtener la cantidad actual de un producto en el carrito
    const getCantidadEnCarrito = (productId) => {
        const itemInCart = cart.find(item => item.id === productId);
        return itemInCart ? itemInCart.cantidad : 0;
    }

    // Función para validar si se puede agregar más cantidad
    const validarStock = (productId, cantidadAAgregar) => {
        const producto = productos.find(p => p.id === productId);
        if (!producto) return false;
        
        const cantidadActual = getCantidadEnCarrito(productId);
        const cantidadTotal = cantidadActual + cantidadAAgregar;
        
        return cantidadTotal <= producto.stock;
    }

    const handleAddToCart = (product) => {
        // Validar stock antes de agregar
        if (!validarStock(product.id, product.cantidad)) {
            const producto = productos.find(p => p.id === product.id);
            const cantidadActual = getCantidadEnCarrito(product.id);
            const stockDisponible = producto.stock - cantidadActual;
            
            toast.error(`No hay suficiente stock. Solo puedes agregar ${stockDisponible} unidades más de "${product.nombre}"`);
            return;
        }

        const productInCart = cart.find((item) => item.id === product.id);
        if (productInCart) {
            // Si ya existe en el carrito, sumar la cantidad
            const nuevaCantidad = productInCart.cantidad + product.cantidad;
            if (nuevaCantidad <= product.stock) {
                setCart(cart.map((item) => 
                    item.id === product.id 
                        ? { ...item, cantidad: nuevaCantidad } 
                        : item
                ));
                toast.success(`Se agregaron ${product.cantidad} unidades más de "${product.nombre}" al carrito`);
            } else {
                toast.error(`No hay suficiente stock para agregar ${product.cantidad} unidades más de "${product.nombre}"`);
            }
        } else {
            // Si no existe en el carrito, agregarlo
            toast.success(`"${product.nombre}" se ha agregado al carrito`);
            setCart([...cart, { ...product, cantidad: product.cantidad }]);
        }
    };

    // Función para incrementar cantidad en el carrito
    const incrementarCantidadEnCarrito = (productId) => {
        if (!validarStock(productId, 1)) {
            const producto = productos.find(p => p.id === productId);
            toast.error(`No hay suficiente stock para agregar más unidades de "${producto.nombre}"`);
            return;
        }

        setCart(cart.map((item) => 
            item.id === productId 
                ? { ...item, cantidad: item.cantidad + 1 } 
                : item
        ));
    };

    // Función para decrementar cantidad en el carrito
    const decrementarCantidadEnCarrito = (productId) => {
        console.log('Decrementando producto:', productId, 'tipo:', typeof productId);
        
        setCart(prevCart => {
            // Encontrar el índice del producto
            const productIndex = prevCart.findIndex(item => item.id === productId || item.id == productId);
            
            if (productIndex === -1) {
                console.log('Producto no encontrado en el carrito');
                return prevCart;
            }
            
            const product = prevCart[productIndex];
            console.log('Producto encontrado:', product);
            
            if (product.cantidad <= 1) {
                // Si la cantidad es 1 o menos, eliminar el producto
                console.log('Eliminando producto del carrito');
                return prevCart.filter((_, index) => index !== productIndex);
            } else {
                // Reducir la cantidad en 1
                console.log('Reduciendo cantidad de', product.cantidad, 'a', product.cantidad - 1);
                const newCart = [...prevCart];
                newCart[productIndex] = { ...product, cantidad: product.cantidad - 1 };
                return newCart;
            }
        });
    };

    const handleDeleteFromCart = (product) => {
        toast.error(`El producto ${product.nombre} se ha eliminado del carrito`)
        setCart(prevCart => prevCart.filter(item => item.id !== product.id));
    };

    return (
        <CartContext.Provider 
        value={
            { 
                cart, 
                productos, 
                cargando, 
                error, 
                handleAddToCart, 
                handleDeleteFromCart, 
                incrementarCantidadEnCarrito,
                decrementarCantidadEnCarrito,
                validarStock,
                getCantidadEnCarrito,
                isAuthenticated,
                setIsAuth, 
                productosFiltrados, 
                busqueda, 
                setBusqueda 
            }
        }>
            {children}
        </CartContext.Provider>
    )
}