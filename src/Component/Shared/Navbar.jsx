// src/Component/Shared/Navbar.jsx (CÓDIGO FINAL ADAPTADO Y RUTA VERIFICADA)

import React from "react";
import { NavLink } from "react-router-dom";
// 🚨 RUTA VERIFICADA
import { useTheme } from "../../context/ThemeContext";
import { useCartStorage } from "../../context/CartContext"; // 🚨 Agregar importación

// 🚨 Recibir el prop onCartClick
export default function Navbar({ onCartClick }) {
  const { toggleTheme, isDarkMode } = useTheme();
  const { totalItems } = useCartStorage(); // 🚨 Obtener totalItems

  // ... (Tu código de enlaces y estructura) ...

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      {/* ... (Contenido de navegación) ... */}

      {/* Íconos de Utilidad (Modo Oscuro y Carrito) */}
      <div className="flex items-center space-x-4">
        {/* Botón de Modo Oscuro */}
        <button
          onClick={toggleTheme}
          className="text-xl text-gray-600 dark:text-gray-300 hover:text-yellow-500 transition"
        >
          {isDarkMode ? "🌙" : "☀️"}
        </button>

        {/* 🚨 ÍCONO DE CARRITO Y CONEXIÓN 🚨 */}
        <button
          onClick={onCartClick} // Llama a la función que abre el Modal
          className="text-2xl text-pink-600 dark:text-pink-400 hover:text-pink-500 transition relative"
          aria-label="Abrir carrito de compras"
        >
          🛒
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </button>
      </div>
      {/* ... */}
    </header>
  );
}
