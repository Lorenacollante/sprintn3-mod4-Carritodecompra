import React from "react";
import { useNavigate } from "react-router-dom";
import { useItems } from "../context/ItemContext.jsx";
import { useCartStorage } from "../context/CartContext.jsx";

export default function ItemCard({ item }) {
  const navigate = useNavigate();
  const { deleteItem } = useItems();
  const { addItemToCart } = useCartStorage();

  // ------------------------
  // Función de Navegación (ya existía)
  const handleViewDetails = () => {
    // Esta función nos lleva a la ruta dinámica: /items/:id
    navigate(`/items/${item.id}`);
  };

  const handleDelete = async () => {
    if (window.confirm(`¿Estás seguro de eliminar el ítem: ${item.name}?`)) {
      try {
        await deleteItem(item.id);
      } catch (error) {
        console.error("Error al intentar eliminar:", error);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transform hover:scale-[1.03] transition duration-300 ease-in-out border border-gray-200 dark:border-gray-700">
      {/* La imagen y el nombre seguirán llevando a Detalles también (opcional pero buena UX) */}
      <div
        className="w-full h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center cursor-pointer"
        onClick={handleViewDetails}
      >
        <img
          src={item.image || "/fallback-image.png"}
          alt={item.name}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/fallback-image.png";
          }}
        />
      </div>

      <div className="p-4 flex flex-col justify-between h-auto">
        {/* ... (Nombre y Precio) ... */}
        <div>
          <h3
            className="text-xl font-bold text-gray-800 dark:text-gray-100 line-clamp-2 min-h-[56px] cursor-pointer hover:text-pink-600"
            onClick={handleViewDetails}
          >
            {item.name}
          </h3>
          <p className="text-2xl font-extrabold text-pink-600 dark:text-pink-400 mt-2">
            ${Number(item.price).toFixed(2)}
          </p>
        </div>

        <div className="mt-4 flex flex-col space-y-2">
          <button
            onClick={() => addItemToCart(item)}
            className="bg-pink-600 text-white py-2 rounded-lg font-bold hover:bg-pink-700 transition"
          >
            🛒 Añadir al Carrito
          </button>

          {/* 👇 CONTENEDOR DE LOS TRES BOTONES DE CRUD */}
          <div className="flex justify-between space-x-1">
            {/* 1. DETALLES (REQUISITO EXPLÍCITO) */}
            <button
              onClick={handleViewDetails}
              className="flex-1 bg-gray-500 text-white py-2 rounded-lg text-sm hover:bg-gray-600 transition"
            >
              👀 Detalle
            </button>

            {/* 2. EDITAR */}
            <button
              onClick={() => navigate(`/items/${item.id}/edit`)}
              className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm hover:bg-blue-600 transition"
            >
              📝 Editar
            </button>

            {/* 3. ELIMINAR */}
            <button
              onClick={handleDelete}
              className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm hover:bg-red-600 transition"
            >
              🗑️ Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
