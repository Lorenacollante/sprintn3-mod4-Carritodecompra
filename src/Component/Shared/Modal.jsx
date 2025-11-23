// src/Component/Shared/Modal.jsx

import React from "react";
import { createPortal } from "react-dom"; // Recomendado para asegurar que el modal esté siempre encima

// Un modal ideal para React y Tailwind CSS
export default function Modal({
  isOpen,
  onClose,
  children,
  title = "Mi Carrito",
}) {
  if (!isOpen) return null;

  // Usamos createPortal para renderizar el modal fuera del DOM principal de la aplicación,
  // lo que ayuda a evitar problemas de z-index (superposición) con otros elementos.
  return createPortal(
    // Fondo Oscuro (Overlay)
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end items-start"
      onClick={onClose} // Cierra el modal al hacer clic en el fondo
    >
      {/* Contenido del Modal (Panel Lateral Derecho) */}
      <div
        // w-full max-w-sm es clave para que ocupe todo el ancho en móvil y se limite en escritorio
        className="bg-white dark:bg-gray-800 h-full w-full max-w-sm overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del modal lo cierre
      >
        {/* Cabecera del Modal (Fija con sticky) */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-800 z-10">
          <h3 className="text-xl font-bold text-pink-600 dark:text-pink-300">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-3xl font-light leading-none"
            aria-label="Cerrar modal"
          >
            &times;
          </button>
        </div>

        {/* Cuerpo del Modal */}
        <div className="p-4">
          {children}{" "}
          {/* Aquí es donde se insertará el componente CartProduct */}
        </div>
      </div>
    </div>,
    // Asume que tienes un div con id="modal-root" en tu index.html.
    document.getElementById("modal-root") || document.body
  );
}
