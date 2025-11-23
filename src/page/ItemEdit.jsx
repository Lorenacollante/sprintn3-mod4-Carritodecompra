import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useItems } from "../context/ItemContext";
import { toast } from "react-toastify";


// Estado inicial para evitar undefined
const INITIAL_STATE = {
  name: "",
  description: "",
  price: "",
  // Añadimos 'image' si tu API la usa, para poder editarla
  image: "",
};

export default function ItemEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getItemById, updateItem } = useItems();

  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Estado para capturar errores de conexión

  // =============================
  // Cargar datos del ítem al entrar
  // =============================
  useEffect(() => {
    if (!id) {
      toast.error("Error: ID no recibido");
      return;
    }

    const loadItem = async () => {
      setLoading(true);
      setError(null);
      try {
        const item = await getItemById(id);

        if (!item) {
          toast.error("No se encontró el ítem con ID: " + id);
          navigate("/items");
          return;
        }

        // ✅ Llenar el formulario con los datos, asegurando que 'price' sea string para el input
        setForm({
          name: item.name ?? "",
          description: item.description ?? "",
          price: String(item.price ?? ""),
          image: item.image ?? "",
        });
      } catch (err) {
        console.error("Error al cargar el ítem:", err);
        setError(
          "Error al cargar el ítem. Problema de conexión o API. Detalles: " +
            (err.message || "Desconocido")
        );
        toast.error("Error al cargar el ítem. ¿API bloqueada?");
      } finally {
        setLoading(false);
      }
    };

    loadItem();
  }, [id, navigate]);

  // Manejo de inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =============================
  // Guardar cambios (PUT)
  // =============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 💡 Aseguramos que el precio sea un número antes de enviarlo a la API
    const priceAsNumber = Number(form.price);

    if (form.name.trim() === "" || form.price === "" || isNaN(priceAsNumber)) {
      toast.warning("Completá nombre y precio válido");
      return;
    }

    try {
      // 💡 Enviamos el formulario con el precio como número
      await updateItem(id, { ...form, price: priceAsNumber });
      toast.success("Ítem actualizado correctamente");
      navigate("/items");
    } catch (err) {
      console.error("Error al intentar guardar:", err);
      toast.error("Error al guardar cambios. Revisa tu consola.");
    }
  };

  // =============================
  // Renderizado
  // =============================

  // Estado de Carga
  if (loading) {
    return (
      <p className="text-center mt-20 text-xl font-bold text-gray-700 dark:text-gray-300">
        ✏️ Cargando datos del ítem ID: {id}...
      </p>
    );
  }

  // Estado de Error (para errores 429 o de conexión)
  if (error) {
    return (
      <div className="text-center mt-20 p-8 max-w-lg mx-auto bg-red-50 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-100 rounded-lg shadow-xl">
        <p className="text-2xl font-bold mb-2">
          ❌ Error al conectar con la API
        </p>
        <p className="text-lg">No se pudo cargar el ítem ID: {id}.</p>
        <p className="mt-4 text-sm font-semibold">
          Posible causa: **MockAPI está bloqueada** (Error 429).
        </p>
        <p className="text-xs mt-1 text-red-600 dark:text-red-300">
          Detalle: {error}
        </p>
        <button
          onClick={() => navigate("/items")}
          className="mt-6 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
        >
          Volver al Catálogo
        </button>
      </div>
    );
  }

  // Formulario de Edición
  return (
    <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-lg mx-auto border border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl font-extrabold mb-8 text-pink-600 dark:text-pink-300 border-b pb-4">
        ✏️ Editar Ítem ID: {id}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo Nombre */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Nombre del Producto
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nombre del producto"
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-pink-500 focus:border-pink-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Campo Precio */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Precio ($)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Precio"
            required
            step="0.01"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-pink-500 focus:border-pink-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Campo Descripción */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Descripción del producto"
            rows="3"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-pink-500 focus:border-pink-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          ></textarea>
        </div>

        {/* Campo Imagen (añadido para ser completo) */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            URL de la Imagen
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://ejemplo.com/imagen.jpg"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-pink-500 focus:border-pink-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Botones */}
        <div className="flex justify-between space-x-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-pink-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-pink-700 transition-colors duration-200 shadow-md"
          >
            Guardar Cambios
          </button>
          <button
            type="button"
            className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg font-bold text-lg hover:bg-gray-400 transition-colors duration-200"
            onClick={() => navigate("/items")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
