import React, { useState } from "react";
import { useItems } from "../context/ItemContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const INITIAL_STATE = {
  id: "",
  name: "",
  description: "",
  price: "",
  image: "",
};

export default function ItemCreate() {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const { createItem, loading } = useItems();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const priceAsNumber = Number(formData.price); // 1. Validación

    if (!formData.name.trim()) {
      toast.warn("El nombre del producto es obligatorio.");
      return;
    }

    if (
      formData.price.trim() === "" ||
      isNaN(priceAsNumber) ||
      priceAsNumber < 0
    ) {
      toast.warn("Por favor, introduce un precio válido y no negativo.");
      return;
    } // 2. 🚨 NUEVA LÓGICA: Imagen Aleatoria

    let imageURL = formData.image; // Si la URL de la imagen está vacía, generamos una aleatoria de Picsum Photos
    if (!imageURL) {
      // Usamos Date.now() para asegurar que cada imagen nueva sea diferente (evitar caché del navegador)
      imageURL = `https://picsum.photos/300/200?random=${Date.now()}`;
      toast.info("Asignando imagen aleatoria del catálogo.");
    } // 3. Preparación de Datos

    const newItemData = {
      ...formData,
      image: imageURL, // Usamos la URL (la del usuario o la aleatoria)
      price: priceAsNumber,
    };

    delete newItemData.id;

    try {
      await createItem(newItemData); // 🎯 Feedback de Éxito

      toast.success("✨ Ítem creado con éxito."); // 4. Redirección

      navigate("/items");
    } catch (error) {
      console.error("Error al crear ítem:", error);
      toast.error("Error al intentar crear el ítem."); // Feedback de error
    }
  };

  return (
    <div className="container mx-auto p-4 pt-8">
      
      <h1 className="text-3xl font-bold mb-6 text-pink-700 dark:text-pink-300 border-b pb-2">
         ➕ Crear Nuevo Ítem 
      </h1>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-lg mx-auto">
      
        <form onSubmit={handleSubmit}>
           {/* Campo Nombre */}
          <div className="mb-4">
            
            <label
              className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
              htmlFor="name"
            >
             Nombre del Producto
            </label>
            
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Ej: Cartera 'Mi Lucero' Premium"
            />
            
          </div>
          {/* Campo Precio */}
          <div className="mb-4">
          
            <label
              className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
              htmlFor="price"
            >
               Precio ($)
            </label>
          
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Ej: 45.99"
            />
          
          </div>
          {/* Campo Descripción */}
          <div className="mb-4">
            
            <label
              className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Descripción
            </label>
            
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Detalles sobre el producto..."
            ></textarea>
            
          </div>
         {/* Campo URL de Imagen */}
          <div className="mb-6">
            
            <label
              className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
              htmlFor="image"
            >
              URL de la Imagen (Opcional)
            </label>
            
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="https://ejemplo.com/mi-cartera.jpg"
            />
          </div>
          {/* Botones de Envío y Regreso */}
          <div className="flex items-center justify-between">
            {/* Botón de Envío */}
            <button
              type="submit"
              disabled={loading}
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 disabled:bg-pink-400"
            >
              {loading ? "Creando..." : "Guardar Ítem"}
            </button>
            {/* Botón de Regresar */}
            <button
              type="button"
              onClick={() => navigate("/items")}
              className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-400 transition"
            >
            Regresar al Catálogo
            </button>
            
          </div>
        
        </form>
        
      </div>
      
    </div>
  );
}