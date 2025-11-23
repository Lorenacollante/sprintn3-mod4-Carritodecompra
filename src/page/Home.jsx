import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      // CAMBIO CLAVE AQUÍ:
      // 1. 'items-center' lo dejamos para móvil.
      // 2. 'md:items-start': En pantallas medianas/grandes, alinea la caja a la IZQUIERDA.
      // 3. 'md:pl-24': Agrega un margen a la izquierda en PC para que no pegue al borde.
      className="flex flex-col items-center md:items-start justify-center p-6 md:pl-24 text-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/imagen/corazon2.jpg')" }}
    >
      {/* Contenedor de la tarjeta (Glassmorphism) */}
      <div className="bg-white/90 p-10 rounded-2xl shadow-2xl max-w-xl w-full backdrop-blur-sm">
        <h1 className="text-5xl font-extrabold text-pink-700 dark:text-pink-600 mb-4">
          Mi Lucero
        </h1>

        <h2 className="text-3xl font-semibold mt-4 mb-6 text-gray-800">
          Sistema de Gestión de Ítems
        </h2>

        <p className="text-lg text-gray-700 mb-8 font-medium">
          Administra tu catálogo fácilmente. Utiliza las opciones de abajo para
          gestionar tus productos.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/items")}
            className="bg-pink-600 text-white py-3 px-6 rounded-full font-bold hover:bg-pink-700 hover:scale-105 transition transform shadow-lg"
          >
            Ver Catálogo
          </button>
          <button
            onClick={() => navigate("/items/create")}
            className="bg-blue-600 text-white py-3 px-6 rounded-full font-bold hover:bg-blue-700 hover:scale-105 transition transform shadow-lg"
          >
            Crear Nuevo
          </button>
        </div>
      </div>
    </div>
  );
}
