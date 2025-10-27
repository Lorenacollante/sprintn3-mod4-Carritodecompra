// src/Component/CartProduct.jsx

import React from 'react';
// Importa el hook o el contexto según cómo lo uses:
import { useCartStorage } from '../context/CartContext'; 
// O si estás usando el hook directamente:
// import useCartStorage from '../Hooks/useCartStorage'; 

export default function CartProduct() {
    //  Desestructu las nuevas funciones y las propiedades calculadas
    const { 
        cart, 
        totalAmount, 
        totalItems, 
        increaseQuantity, 
        decreaseQuantity, 
        removeFromCart,
         clearCart
    } = useCartStorage(); 
    // nuevo 
    const handleFinalizarCompra = () => {
        if (totalAmount > 0) {
            clearCart(); 
            // Opcional: una alerta para confirmar la acción
            alert("¡Compra finalizada con éxito! El carrito ha sido vaciado.");
        }
    };

    return (
        // Contenedor principal del carrito: tarjeta limpia
        <div className="bg-white dark:bg-pink-800 rounded-lg shadow-xl p-4 md:p-6 h-full border border-gray-100 dark:border-gray-700">
            
            {/* Título del Carrito */}
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 border-b pb-2 border-pink-200 dark:border-pink-900 flex items-center justify-between">
                <span>🛒 Mi Carrito de Compras</span>
                {/* Contador de artículos */}
                <span className="text-pink-600 dark:text-pink-400 text-lg">({totalItems} ítems)</span>
            </h2>

            {/* Renderizado de los productos en el carrito */}
            {cart.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-lg text-gray-500 dark:text-gray-400">Tu carrito está vacío 😔</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">¡Agrega productos para empezar!</p>
                </div>
            ) : (
                <>
                    {/* Lista de Productos: Limita la altura con scroll */}
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                        {cart.map((item) => (
                            <div key={item.id} className="flex items-center space-x-4 border-b pb-4 last:border-b-0 last:pb-0 border-gray-100 dark:border-gray-700">
                                
                                {/* IMAGEN PEQUEÑA: w-16 h-16 es CRÍTICO para que no se vea GIGANTE */}
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-md shadow-sm border border-gray-200 dark:border-gray-600"
                                />

                                {/* Detalles y Botones de Cantidad */}
                                <div className="flex-grow">
                                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-tight line-clamp-2">
                                        {item.name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                        ${item.price.toFixed(2)} x {item.quantity}
                                    </p>
                                    <p className="text-sm font-bold text-pink-600 dark:text-pink-400 mt-1">
                                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>

                                {/* Botones de Control de Cantidad */}
                                <div className="flex items-center space-x-1">
                                    <button
                                        //  Usa decreaseQuantity
                                        onClick={() => decreaseQuantity(item.id)}
                                        className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 w-6 h-6 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                                        aria-label="Disminuir cantidad"
                                    >
                                        −
                                    </button>
                                    <span className="text-sm font-medium w-4 text-center text-gray-800 dark:text-gray-100">
                                        {item.quantity}
                                    </span>
                                    <button
                                        //  Usa increaseQuantity
                                        onClick={() => increaseQuantity(item.id)}
                                        className="bg-pink-500 text-white w-6 h-6 rounded text-sm hover:bg-pink-600 transition"
                                        aria-label="Aumentar cantidad"
                                    >
                                        +
                                    </button>
                                </div>
                                
                                {/* Botón de Eliminar */}
                                <button
                                    //  Usa removeFromCart
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 hover:text-red-700 transition"
                                    aria-label="Eliminar producto"
                                >
                                    <span className="text-lg">🗑️</span>
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Total y Botón de Checkout */}
                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xl font-bold text-gray-800 dark:text-gray-100">Total:</span>
                            <span className="text-2xl font-extrabold text-pink-600 dark:text-pink-400">
                                ${totalAmount.toFixed(2)}
                            </span>
                        </div>
                        <button
                            onClick={handleFinalizarCompra} // ⬅️ ASIGNACIÓN DE LA FUNCIÓN
                            disabled={totalAmount <= 0} // ⬅️ Deshabilita si el carrito está vacío
                            className="w-full bg-pink-600 text-white py-3 rounded-lg font-bold text-lg 
                                       hover:bg-pink-700 transition-colors duration-200 shadow-lg disabled:opacity-50"
                         >
                            Finalizar Compra
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}