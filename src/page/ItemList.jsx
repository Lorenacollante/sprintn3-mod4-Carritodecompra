import React from "react";
import { useItems } from "../context/ItemContext";
import { useNavigate } from "react-router-dom";
import ItemCard from "../Component/ItemCard";
import CartProduct from "../Component/Shared/CartProduct";

// 🚨 1. IMPORTAR EL COMPONENTE SKELETON
import SkeletonCard from "../Component/SkeletonCard";

export default function ItemList() {
  // Obtener la lista, el estado de carga y el error del Contexto
  const { items, loading, error } = useItems();
  const navigate = useNavigate();

  // Define cuántos esqueletos mostrar mientras se cargan los datos
  const skeletonCount = 6;

  // --- 2. Manejo de Carga (Muestra el Skeleton Loader) ---
  // Si 'loading' es TRUE (ItemContext está obteniendo datos de la API), mostramos los esqueletos.
  if (loading) {
    return (
      <div className="container mx-auto p-4 pt-8">
        <h1 className="text-3xl font-bold mb-6 text-pink-700 dark:text-pink-300 border-b pb-2">
          🛍️ Catálogo de Ítems
        </h1>

        {/* Estructura de Listado y Carrito para el Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* COLUMNA 1: Listado de Productos (3/4 del ancho) */}
          <div className="lg:col-span-3">
            {/* ⬇️ RENDERIZAMOS LA CUADRÍCULA DE ESQUELETOS ⬇️ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Creamos un array vacío con la longitud de skeletonCount y lo mapeamos */}
              {Array(skeletonCount)
                .fill(0)
                .map((_, index) => (
                  <SkeletonCard key={index} /> // Componente SkeletonCard utilizado aquí
                ))}
            </div>
          </div>

          {/* COLUMNA 2: Carrrito Lateral */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 text-center text-gray-500 dark:text-gray-400">
              Cargando Carrito...{" "}
              {/* Se puede añadir un Skeleton para el carrito */}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- 3. Manejo de Errores (Si hay un error después de intentar cargar) ---
  if (error) {
    return (
      <div className="text-center p-10 pt-20">
        <p className="text-xl font-semibold text-red-500 mb-4">
          ⚠️ Error al cargar los ítems: {error}
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition"
        >
          Volver a Inicio
        </button>
      </div>
    );
  }

  // --- 4. Renderizado de la Lista Real (Cuando 'loading' es FALSE y no hay error) ---
  return (
    <div className="container mx-auto p-4 pt-8">
      <h1 className="text-3xl font-bold mb-6 text-pink-700 dark:text-pink-300 border-b pb-2">
        🛍️ Catálogo de Ítems ({items.length})
      </h1>
      <button
        onClick={() => navigate("/items/create")}
        className="mb-8 bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition shadow-md"
      >
        ➕ Crear Nuevo Ítem
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 text-lg py-10">
              No hay ítems para mostrar.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* ⬇️ RENDERIZAMOS LAS TARJETAS REALES ⬇️ */}
              {items.map((item) => (
                <ItemCard key={item.id} item={item} /> // Componente ItemCard utilizado aquí
              ))}
            </div>
          )}
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <CartProduct />
          </div>
        </div>
      </div>
    </div>
  );
}
