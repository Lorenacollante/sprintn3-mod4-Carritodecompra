// src/Component/Shared/Header.jsx (CÓDIGO COMPLETO Y FINAL)

import React from 'react';
// Asegúrate de que useCartStorage es el nombre correcto
import { useCartStorage } from '../../context/CartContext'; 
// Asegúrate que esta ruta sea correcta:
import corazonesFondo from '../../../public/imagen/corazon2.jpg'; 
import ThemeButton from './ThemeButton';

// 🚨 CLAVE: Recibir la prop onCartClick para manejar la apertura del carrito
export default function Header({ onCartClick }) {
    // Lógica para el contador del carrito
    const { cart } = useCartStorage();
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Lista de navegación solicitada
    const navItems = ['Inicio', 'Sandalias', 'Carteras', 'Billeteras', 'Accesorios', 'Contacto'];

    return (
        
        <header className="sticky top-0 z-40 shadow-md">
            
            {/* 1. BARRA SUPERIOR DE CONTACTO/INFO */}
            <div className="bg-gray-800 text-white text-xs py-2 hidden sm:block">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <p className="flex gap-4 text-sm">
                        <span>🏩 Local Principal: Av. Siempre Viva 742</span>
                        <span>tele ☎ 3834-234567</span>
                    </p>
                </div>
            </div>

            {/* 2. BARRA PRINCIPAL ('Mi Lucero' con fondo de corazones) */}
            <div 
                className="relative bg-white h-40 border-b border-gray-200" 
                style={{
                    backgroundImage: `url(${corazonesFondo})`, 
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center', 
                }}
            >
                {/* Capa de overlay rosa suave para que el texto resalte */}
                <div className="absolute inset-0 bg-pink-100 opacity-60"></div> 

                {/* Contenedor principal: h-full y flex items-center para centrar verticalmente */}
                <div className="container mx-auto px-4 flex justify-between items-center relative z-10 h-full"> 
                    
                    {/* LOGO PERSONALIZADO: 'Mi Lucero' */}
                    <div className="flex-1 flex justify-center items-center h-full"> 
                        <h1 
                            // Título Grande (6xl), Grueso (extrabold) y Rosa Suave (pink-500)
                            className="text-6xl font-extrabold text-pink-500 drop-shadow-lg"
                        >
                                        Mi Lucero 
                        </h1>
                    </div>

                    {/* ÍCONOS DE ACCIÓN */}
                    <div className="flex space-x-6 items-center text-gray-700">
                        <button className="text-xl hover:text-pink-500 transition" title="Buscar">🔍</button>
                        <button className="text-xl hover:text-pink-500 transition" title="Mi Cuenta">👤</button>
                        {/* 🌗 BOTÓN DE TEMA */}
                        <ThemeButton />
                        
                        {/* ÍCONO DE CARRITO: AÑADIMOS EL onClick */}
                        <button 
                            className="relative text-xl hover:text-pink-500 transition" 
                            title="Carrito"
                            // 🚨 CAMBIO CLAVE: Usa la función para abrir el modal del carrito
                            onClick={onCartClick}
                        >
                            🛒
                            {itemCount > 0 && (
                                <span className="absolute top-[-10px] right-[-10px] bg-red-600 text-white 
                                                rounded-full w-5 h-5 flex items-center justify-center 
                                                text-xs font-bold ring-2 ring-white">
                                    {itemCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* 3. BARRA DE NAVEGACIÓN (Estilos Solicitados) */}
            <nav className="bg-pink-200"> {/* Fondo rosado SUAVE */}
                <div className="container mx-auto px-4">
                    <ul className="flex justify-center space-x-6 py-3 text-sm font-medium"> {/* Separación (space-x-6) */}
                        {navItems.map((item) => (
                            <li key={item}>
                                <a 
                                    href={`#${item.toLowerCase().replace(/\s/g, '-')}`} 
                                    // Rosado FUERTE (pink-700) y más Grueso (font-bold)
                                    className="text-pink-700 hover:text-pink-900 transition tracking-wider uppercase font-bold"
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    );
}