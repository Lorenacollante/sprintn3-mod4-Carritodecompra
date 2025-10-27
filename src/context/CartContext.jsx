// src/context/CartContext.jsx (LÓGICA FUNCIONAL)

import React, { createContext, useContext, useState, useEffect } from 'react';

const CART_STORAGE_KEY = 'shoppingCart';
const CartContext = createContext();

export const useCartStorage = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  // 1. Inicializa el carrito desde localStorage
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Error al leer localStorage:", error);
      return []; 
    }
  });

  // 2. Guarda el carrito en localStorage cada vez que cambia
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Error al guardar en localStorage:", error);
    }
  }, [cart]);

  // Funciones principales:

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);

      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  //  1. FUNCIÓN DE ELIMINAR (FILTRA EL ARRAY)
  const removeFromCart = (id) => {
    // Retorna un array nuevo que NO incluye el item con ese 'id'
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  //  2. FUNCIÓN DE INCREMENTAR (MAPEA Y DEVUELVE UN ARRAY NUEVO)
  const increaseQuantity = (id) => {
    setCart(prevCart =>
      prevCart.map(item =>
        // Usa la sintaxis de spread operator {...item} para crear una copia del objeto
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  //  3. FUNCIÓN DE DECREMENTAR (MAPEA Y FILTRA SI LLEGA A CERO)
  const decreaseQuantity = (id) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
      ).filter(item => item.quantity > 0) // Elimina si la cantidad es 0
    );
  };
  const clearCart = () => {
    setCart([]);
  };
  
  // Cálculos
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const contextValue = {
    cart,
    totalItems,
    totalAmount,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};