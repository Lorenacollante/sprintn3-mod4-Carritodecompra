// src/Router/AppRouter.jsx (ADAPTADO)

import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../page/Home";
import ItemList from "../page/ItemList.jsx";
import ItemDetail from "../page/ItemDetail";
import ItemCreate from "../page/ItemCreate";
import ItemEdit from "../page/ItemEdit";
import NotFound from "../page/NotFound";


// Componentes de diseño
import Navbar from "../Component/Shared/Navbar";
import Footer from "../Component/Shared/Footer";


export default function AppRouter({ onCartClick }) {
  return (
    <>
      {/* 🚨 PASAR EL PROP AL NAVBAR */}
      <Navbar onCartClick={onCartClick} />
      <main className="pt-16 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<ItemList />} />
          <Route path="/items/create" element={<ItemCreate />} />
          <Route path="/items/:id" element={<ItemDetail />} />
          <Route path="/items/:id/edit" element={<ItemEdit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
