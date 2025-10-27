// src/Component/ProductModal.jsx

/*import React from 'react';
// IMPORTANTE: Asegúrate que esta ruta a tu hook sea correcta
import { useCartStorage } from '../context/CartContext'; 

const ProductModal = ({ product, onClose }) => {
    // Usamos el hook dentro del modal si necesitas añadir productos
    const { addToCart } = useCartStorage(); 

    const handleAddToCart = () => {
        addToCart(product);
        onClose(); // Cerrar el modal después de añadir
    };

    return (
        // 1. OVERLAY (Fondo): Debe cubrir la pantalla y ser visible
        <div
            // CLASES DE PRUEBA EXTREMA: Fondo rojo sólido y z-index máximo
            className="fixed inset-0 bg-red-700 bg-opacity-95 flex items-center justify-center z-[99999] p-4" 
            onClick={onClose} // Cierra el modal al hacer clic en el fondo
        >
            
            <div 
                // Detiene la propagación del clic para que no se cierre al hacer clic dentro
                onClick={(e) => e.stopPropagation()} 
                className="bg-white rounded-lg shadow-2xl max-w-4xl w-full p-6 relative flex gap-6"
            >
                {
                <button 
                    onClick={onClose} 
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                >
                    &times;
                </button>

                /*   {/* Columna de Imagen */}
                /*<div className="w-1/3 flex items-center justify-center">
                    <img src={product.image} alt={product.name} className="max-h-80 object-contain" />
                </div>

                {/* Columna de Detalles */}
                /*<div className="w-2/3">
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-2">{product.name}</h2>
                    <p className="text-pink-600 text-4xl font-black my-3">${product.price.toFixed(2)}</p>
                    <p className="text-gray-600 mb-4">{product.description || "Descripción detallada del producto."}</p>
                    
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition mt-4"
                    >
                        Añadir al Carrito
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;*/