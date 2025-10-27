// src/Component/ProductList.jsx

import React from "react"; 
import { useCartStorage } from "../context/CartContext"; 
import products from "../data/products.json"; 

export default function ProductList() {
    
    // Solo necesitamos la función para añadir productos
    const { addToCart } = useCartStorage(); 

    return (
        // El contenedor ahora no tiene el título
        <div className="container mx-auto p-4">
            
            
            
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div
                       key={product.id}
    //  CAMBIO CLAVE: Usa dark:bg-card-bg-dark que ahora es #880e4f
        className="bg-white dark:bg-card-bg-dark rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center justify-between p-4 border border-gray-100 dark:border-gray-700"
>
                        {/* Contenido de la tarjeta */}
                        <div className="w-full h-64 flex items-center justify-center p-4 overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-contain"
                                style={{ maxHeight: '200px', maxWidth: '100%' }}
                            />
                        </div>
                        <div className="text-center w-full mt-3">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 min-h-[3rem] line-clamp-2">
                                {product.name} 
                            </h3>
                            <p className="text-2xl font-extrabold text-pink-600 dark:text-pink-400 my-2">
                                ${product.price.toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-400 line-through">
                                (Ref. ${(product.price * 1.15).toFixed(2)})
                            </p>
                        </div>
                        
                        {/* Botón Añadir al Carrito (CLAVE: Funciona gracias a las correcciones previas) */}
                        <button
                            onClick={() => addToCart(product)}
                            className="mt-3 w-full bg-pink-500 text-white py-2 rounded-lg font-semibold hover:bg-pink-600 transition" 
                        >
                            Añadir al Carrito
                        </button>

                    </div>
                ))}
            </div>

            <div className="mt-10 text-center">
                <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition">
                    Cargar más productos
                </button>
            </div>
        </div>
    );
}