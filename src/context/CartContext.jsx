// 📄 src/context/CartContext.jsx
import React, { createContext, useContext } from "react";
import useCartStorageHook from "../Hooks/useCartStorage.js";

// 1️⃣ Creamos el contexto
const CartContext = createContext();

// 2️⃣ Proveedor del contexto
export function CartProvider({ children }) {
  const cartFunctions = useCartStorageHook();
  return (
    <CartContext.Provider value={cartFunctions}>
      {children}
    </CartContext.Provider>
  );
}

// 3️⃣ Hook personalizado para usar el contexto
export function useCartStorage() {
  return useContext(CartContext);
}
