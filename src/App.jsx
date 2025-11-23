import React, { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { ItemProvider } from "./context/ItemContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

import CartProduct from "./Component/Shared/CartProduct.jsx";
import Modal from "./Component/Shared/Modal.jsx";
import AppRouter from "./Router/AppRouter.jsx";

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <ThemeProvider>
      <ItemProvider>
        <CartProvider>
          {/* ✅ YA NO HAY BrowserRouter AQUÍ */}
          <AppRouter onCartClick={() => setIsCartOpen(true)} />
          <Modal
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            title="🛒 Mi Carrito de Compras"
          >
            <CartProduct />
          </Modal>
        </CartProvider>
      </ItemProvider>
    </ThemeProvider>
  );
}
