import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useItems } from "../context/ItemContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Obtener las funciones del Contexto
  const { getItemById, deleteItem } = useItems();

  // Hooks para manejar el estado local
  const [item, setItem] = useState(null);
  const [loadingLocal, setLoadingLocal] = useState(true);
  const [errorLocal, setErrorLocal] = useState(null);

  // Efecto para cargar el ítem al montar el componente
  useEffect(() => {
    const fetchItem = async () => {
      setLoadingLocal(true);
      setErrorLocal(null);

      if (!id) {
        setErrorLocal("ID de ítem no proporcionado.");
        setLoadingLocal(false);
        return;
      }

      try {
        const fetchedItem = await getItemById(id);

        if (fetchedItem) {
          setItem(fetchedItem);
        } else {
          setErrorLocal(`No se encontró el ítem con ID: ${id}.`);
          toast.error("Ítem no encontrado.");
        }
      } catch (err) {
        setErrorLocal("Error al cargar los detalles del ítem.");
        console.error("Fetch Item Error:", err);
      } finally {
        setLoadingLocal(false);
      }
    };
    fetchItem();
  }, [id, getItemById]);

  // FUNCIÓN PARA MANEJAR LA ELIMINACIÓN (con SweetAlert2)
  const handleDelete = async () => {
    if (!id) return toast.error("No hay ID para eliminar.");

    const result = await MySwal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción es irreversible y el ítem se eliminará permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, ¡Eliminarlo!",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await deleteItem(id);
        toast.success("🗑️ Ítem eliminado correctamente.");
        navigate("/items");
      } catch (err) {
        console.error("Error al eliminar el ítem:", err);
        toast.error("Error al intentar eliminar el ítem.");
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      toast.info("Eliminación cancelada.");
    }
  };

  // Manejo de Estados de Carga y Error
  if (loadingLocal) {
    return (
      <div className="text-center p-10 pt-20 text-xl font-semibold dark:text-gray-200">
        Cargando detalles del ítem ID: {id}... 🔄
      </div>
    );
  }

  if (errorLocal) {
    return (
      <div className="text-center p-10 pt-20">
        <p className="text-xl font-semibold text-red-500 mb-4">
          Error: {errorLocal}
        </p>
        <button
          onClick={() => navigate("/items")}
          className="bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition"
        >
          Volver al Catálogo
        </button>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="text-center p-10 pt-20 text-xl font-semibold dark:text-gray-200">
        Ítem no disponible.
      </div>
    );
  }

  // Renderizado del Detalle del Ítem
  return (
    <div className="container mx-auto p-4 pt-8">
      <h1 className="text-3xl font-bold mb-6 text-pink-700 dark:text-pink-300 border-b pb-2">
        Detalle del Ítem: {item.name}
      </h1>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl flex flex-col md:flex-row gap-8">
        {/* Columna de Imagen */}
        <div className="md:w-1/2 flex items-center justify-center">
          <img
            src={item.image}
            alt={item.name}
            className="max-h-[400px] w-auto object-contain rounded-lg shadow-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/400?text=No+Image";
            }}
          />
        </div>

        {/* Columna de Contenido */}
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            {item.name}
          </h2>

          <p className="text-3xl font-bold text-pink-600 dark:text-pink-400">
            Precio: ${Number(item.price).toFixed(2)}
          </p>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              Descripción
            </h3>
            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
              {item.description ||
                "Este producto no tiene una descripción detallada."}
            </p>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
            ID de MockAPI: <span className="font-mono">{item.id}</span>
          </p>

          {/* Botones de Acción: ¡ESTE BLOQUE FUE CORREGIDO! */}
          <div className="flex space-x-4 pt-6">
            {/* Botón Editar */}
            <button
              onClick={() => navigate(`/items/${item.id}/edit`)}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              ✏️ Editar Ítem
            </button>

            {/* Botón Eliminar con SweetAlert2 */}
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-red-600 transition"
            >
              🗑️ Eliminar
            </button>

            {/* Botón Volver */}
            <button
              onClick={() => navigate("/items")}
              className="bg-gray-300 text-gray-800 py-2 px-6 rounded-lg font-semibold hover:bg-gray-400 transition dark:bg-gray-700 dark:text-white"
            >
              ← Volver al Listado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
