// 💾 src/Hooks/useCartStorage.js

import { useState, useEffect, useMemo } from "react";

export default function useCartStorage(
  key = "shoppingCart",
  initialValue = []
) {
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

  // 💾 Guarda los cambios del carrito en localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(items));
  }, [key, items]);

  // ------------------ 🛒 Lógica del Carrito ------------------

  // ➕ Agregar producto al carrito
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

  // ❌ Eliminar producto por ID
  const removeFromCart = (id) =>
    setItems((prev) => prev.filter((p) => p.id !== id));

  // 🔼 Incrementar cantidad
  const increaseQuantity = (id) => {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p))
    );
  };

  // 🔽 Decrementar cantidad (elimina si llega a 0)
  const decreaseQuantity = (id) => {
    setItems((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, quantity: p.quantity - 1 } : p))
        .filter((p) => p.quantity > 0)
    );
  };

  // 🔢 Actualizar cantidad manualmente
  const updateQuantity = (id, newQuantity) => {
    setItems((prev) => {
      const q = Math.max(0, Number(newQuantity) || 0);
      if (q === 0) {
        return prev.filter((p) => p.id !== id);
      }
      return prev.map((p) => (p.id === id ? { ...p, quantity: q } : p));
    });
  };

  // 💰 Calcular total general
  const totalPrice = useMemo(() => {
    if (!Array.isArray(items)) return 0;
    return items.reduce(
      (sum, it) => sum + (Number(it.price) || 0) * (Number(it.quantity) || 0),
      0
    );
  }, [items]);

  // 🧮 Total de ítems
  const totalItems = useMemo(() => {
    if (!Array.isArray(items)) return 0;
    return items.reduce((sum, it) => sum + (Number(it.quantity) || 0), 0);
  }, [items]);

  // ------------------ 🚀 Retorno del Hook ------------------
  return {
    cart: items,
    addItemToCart: addToCart, // ✅ alias compatible con tus componentes
    addToCart, // también lo dejamos por si lo usás directo
    removeFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart: () => setItems([]),
    totalAmount: totalPrice,
    totalItems,
  };
}
