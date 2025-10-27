// src/Component/Shared/Modal.jsx (Crea este archivo)

import React from 'react';
import ReactDOM from 'react-dom';

export default function Modal({ children, onClose }) {
    // Usamos createPortal para asegurarnos de que el modal se superponga a todo
    return ReactDOM.createPortal(
        <>
            {/* Overlay Oscuro que cierra el modal al hacer clic */}
            <div 
                className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden" // lg:hidden para asegurar que solo aparezca en móvil
                onClick={onClose}
            ></div>
            
            {/* Contenedor del Modal (el contenido del carrito) */}
            <div className="fixed top-0 right-0 w-full max-w-sm h-full bg-white dark:bg-gray-800 shadow-2xl z-50 transform translate-x-0 transition-transform duration-300 lg:hidden">
                <div className="p-4 overflow-y-auto h-full">
                    
                    {/* Botón de cerrar */}
                    <button 
                        onClick={onClose} 
                        className="absolute top-4 right-4 text-3xl font-bold text-gray-700 dark:text-white hover:text-pink-500 transition"
                    >
                        &times;
                    </button>
                    
                    {/* Contenido del carrito (CartProduct) */}
                    {children}
                </div>
            </div>
        </>,
        // Esto monta el modal directamente en el body del HTML
        document.getElementById('root') 
    );
}