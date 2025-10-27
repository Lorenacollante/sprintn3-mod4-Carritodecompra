// 💾 src/Hooks/useCartStorage.js

import { useState, useEffect, useMemo } from "react";

// Nota: No necesitas el CartContext.jsx si usas este hook directamente
// en los componentes que lo necesitan (pero Home.jsx no lo usa).
// Si usas un CartContext para envolver la app, adapta este código a tu contexto.

export default function useCartStorage(key = "shoppingCart", initialValue = []) {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      const parsed = stored ? JSON.parse(stored) : initialValue;
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Error al leer localStorage:", error);
      return Array.isArray(initialValue) ? initialValue : [];
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(items));
  }, [key, items]);

  // ---------- API del Carrito ----------

  const addToCart = (product) => {
    setItems((prevItems) => {
      const existing = prevItems.find((p) => p.id === product.id);
      if (existing) {
        return prevItems.map((p) =>
          p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) =>
    setItems((prev) => prev.filter((p) => p.id !== id));

  // Nuevo: Incrementa la cantidad por 1
  const increaseQuantity = (id) => {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p))
    );
  };

  //  Nuevo: Decrementa la cantidad por 1, eliminando si llega a 0
  const decreaseQuantity = (id) => {
    setItems(
      (prev) =>
        prev
          .map((p) => (p.id === id ? { ...p, quantity: p.quantity - 1 } : p))
          .filter((p) => p.quantity > 0) // Filtra el item si la cantidad es 0
    );
  };

  // (Mantengo tu función original, aunque ya no es necesaria en CartProduct.jsx)
  const updateQuantity = (id, newQuantity) => {
    setItems((prev) => {
      const q = Math.max(0, Number(newQuantity) || 0);
      if (q === 0) {
        return prev.filter((p) => p.id !== id);
      }
      return prev.map((p) => (p.id === id ? { ...p, quantity: q } : p));
    });
  };

  // Cálculo del Precio Total
  const totalPrice = useMemo(() => {
    if (!Array.isArray(items)) return 0;
    return items.reduce(
      (sum, it) => sum + (Number(it.price) || 0) * (Number(it.quantity) || 0),
      0
    );
  }, [items]);

  // Total de items para el contador
  const totalItems = useMemo(() => {
    if (!Array.isArray(items)) return 0;
    return items.reduce((sum, it) => sum + (Number(it.quantity) || 0), 0);
  }, [items]);

  // Objeto de Retorno
  return {
    cart: items,
    addToCart,
    removeFromCart,
    updateQuantity,
    increaseQuantity, // <-- Función esencial para el botón '+'
    decreaseQuantity, // <-- Función esencial para el botón '−'
    clearCart: () => setItems([]),
    totalAmount: totalPrice, // Renombrada para coincidir con tu contexto
    totalItems,
  };
}
