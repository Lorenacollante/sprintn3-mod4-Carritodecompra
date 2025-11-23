import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axiosClient from "../api/axiosClient";
import { toast } from "react-toastify";

const ItemContext = createContext();

// 🚨 FUNCIÓN TEMPORAL PARA SIMULAR RETRASO
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const useItems = () => {
  const context = useContext(ItemContext);
  if (context === undefined) {
    throw new Error("useItems debe ser usado dentro de un ItemProvider");
  }
  return context;
};

const RESOURCE_NAME = "products";

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // 🔹 Obtener todos los ítems

  const getItems = useCallback(async () => {
    setLoading(true);
    setError(null);

    // ⬇️ LÍNEA AÑADIDA PARA PAUSAR POR 3 SEGUNDOS (Ver el Skeleton)
    await sleep(6000);

    try {
      const response = await axiosClient.get(`/${RESOURCE_NAME}`); // NORMALIZACIÓN: Convertimos ID a string para evitar errores de comparación
      const normalizedData = response.data.map((item) => ({
        ...item,
        id: String(item.id),
      }));
      setItems(normalizedData);
    } catch (err) {
      console.error("Error al obtener ítems:", err);
      setError("No se pudo cargar la lista de ítems.");
      toast.error("Error al cargar la lista.");
    } finally {
      setLoading(false);
    }
  }, []); // 🔹 getItemById

  const getItemById = async (id) => {
    // 1. Optimización: Buscar primero en la memoria local si ya tenemos los datos
    const existingItem = items.find((item) => String(item.id) === String(id));

    if (existingItem) {
      return existingItem;
    } // 2. Si no está en memoria, buscar en la API por ID directo

    setLoading(true);
    setError(null);
    try {
      const response = await axiosClient.get(`/${RESOURCE_NAME}/${id}`);

      const item = response.data; // Normalizamos el item devuelto
      const normalizedItem = { ...item, id: String(item.id) };

      setLoading(false);
      return normalizedItem;
    } catch (err) {
      console.error(`Error al obtener ítem ${id}:`, err);
      setError(`No se pudo cargar el ítem con ID: ${id}.`);
      setLoading(false);
      return null;
    }
  }; // 🔹 Crear un nuevo ítem

  const createItem = async (newItemData) => {
    try {
      const response = await axiosClient.post(`/${RESOURCE_NAME}`, newItemData);
      const createdItem = { ...response.data, id: String(response.data.id) };

      setItems((prevItems) => [...prevItems, createdItem]);
      toast.success("🎉 Ítem creado exitosamente.");
      return createdItem;
    } catch (err) {
      console.error("Error al crear ítem:", err);
      toast.error("Hubo un error al crear el ítem.");
      throw err;
    }
  }; // 🔹 Actualizar un ítem existente

  const updateItem = async (id, updatedItemData) => {
    try {
      const response = await axiosClient.put(
        `/${RESOURCE_NAME}/${id}`,
        updatedItemData
      );

      const updatedItem = { ...response.data, id: String(response.data.id) };

      setItems((prevItems) =>
        prevItems.map((item) =>
          String(item.id) === String(id) ? updatedItem : item
        )
      );
      toast.success("✅ Ítem actualizado correctamente.");
      return updatedItem;
    } catch (err) {
      console.error(`Error al actualizar ítem ${id}:`, err);
      toast.error("Hubo un error al actualizar el ítem.");
      throw err;
    }
  }; // 🔹 Eliminar un ítem

  const deleteItem = async (id) => {
    try {
      await axiosClient.delete(`/${RESOURCE_NAME}/${id}`);
      setItems((prevItems) =>
        prevItems.filter((item) => String(item.id) !== String(id))
      );
      toast.success("🗑️ Ítem eliminado con éxito.");
    } catch (err) {
      console.error(`Error al eliminar ítem ${id}:`, err);
      toast.error("Error al eliminar el ítem.");
      throw err;
    }
  };

  useEffect(() => {
    getItems();
  }, [getItems]);

  const contextValue = {
    items,
    loading,
    error,
    getItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
  };

  return (
    <ItemContext.Provider value={contextValue}>{children}</ItemContext.Provider>
  );
};
