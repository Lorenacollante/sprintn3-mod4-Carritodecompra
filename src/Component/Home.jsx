// src/Component/Home.jsx (VERSIÓN FINAL CON md: CUADRÍCULA)

import React from 'react';
import ProductList from './ProductList';
import CartProduct from './CartProduct'; 

export default function Home() {
  return (
    // CLAVE: Usamos 'md:grid-cols-3' para activar la división 2/3 y 1/3.
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* 1. SECCIÓN PRODUCTOS: Ocupa 2 de 3 columnas */}
      <main className="md:col-span-2">
        <ProductList />
      </main>

      {/* 2. SECCIÓN CARRITO: Ocupa 1 de 3 columnas */}
      <aside className="md:col-span-1">
        <div className="sticky top-20">
          <CartProduct /> 
        </div>
      </aside>
      
    </div>
  );
}