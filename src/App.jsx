// src/App.jsx (CÓDIGO COMPLETO Y FINAL CON MODAL)

import React, { useState } from "react"; // 🚨 Agregamos useState
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import Header from "./Component/Shared/Header"; 
import Footer from "./Component/Shared/Footer"; 
import ProductList from "./Component/ProductList";
import CartProduct from "./Component/CartProduct"; 
import Modal from "./Component/Modal"; // 🚨 Importamos el componente Modal

function AppContent() {
    const { darkMode } = useTheme();
    const themeClass = darkMode ? 'dark' : '';
    
    // 🚨 ESTADO CLAVE: Controla si el modal del carrito está abierto
    const [isCartOpen, setIsCartOpen] = useState(false); 
    
    return (
        // CLAVE: EL TEXTO EN MODO OSCURO DEBE SER CLARO (text-white)
        <div className={`${themeClass} min-h-screen flex flex-col bg-app-bg-light dark:bg-app-bg-dark text-pink-900 dark:text-white transition-colors duration-500`}>

            {/* 🚨 Pasar la función para abrir el carrito al Header */}
            <Header onCartClick={() => setIsCartOpen(true)} />
            
            <main className="flex-1 container mx-auto px-4 py-8">
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* COLUMNA 1: Productos (Ocupa 2 de 3) */}
                    <div className="lg:col-span-2">
                        <h1 className="text-4xl font-extrabold mb-8 text-center text-pink-600 dark:text-pink-300">
                            Catálogo de Productos
                        </h1>
                        <ProductList />
                    </div>

                    {/* COLUMNA 2: Carrito (Ocupa 1 de 3) */}
                    {/* 🚨 CLAVE: El carrito lateral es 'hidden' en móvil, y 'lg:block' en PC */}
                    <div className="lg:col-span-1 hidden lg:block"> 
                        <aside className="sticky top-20">
                            <CartProduct /> 
                        </aside>
                    </div>

                </div>
            </main>
            
            <Footer />
            
            {/* 🚨 MODAL DEL CARRITO: Renderizado Condicional */}
            {/* Solo se muestra si isCartOpen es true y solo en pantallas pequeñas (lg:hidden) */}
            {isCartOpen && (
                <div className="lg:hidden"> 
                    <Modal onClose={() => setIsCartOpen(false)}>
                        <CartProduct /> 
                    </Modal>
                </div>
            )}
        </div>
    );
}

function App() {
    return (
        <ThemeProvider>
            <CartProvider>
                <AppContent /> 
            </CartProvider>
        </ThemeProvider>
    );
}

export default App;