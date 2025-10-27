// tailwind.config.js (CORREGIDO y ACOMODADO)

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta inspirada en Zoe Moda
        beige: "#f5f0e8",
        gold: "#c9a34e",
        pink: {
          // Definición completa de la paleta 'pink'
          100: "#fce4ec",
          200: "#f8bbd0",
          300: "#f48fb1",
          500: "#ec407a",
          600: "#d81b60",
          700: "#c2185b",
          900: "#880e4f",
        },
        turquoise: {
          500: "#40e0d0",
          600: "#2ac4b5",
        }, // 🔑 COMA AGREGADA AQUÍ para separar 'turquoise' de 'app-bg-light' // Colores de Fondo y Tarjetas
        "app-bg-light": "#fffaf7",
        "app-bg-dark": "#1f1f1f", // Fondo oscuro principal // Colores de Tarjetas
        "card-bg-light": "#ffffff",
        "card-bg-dark": "#880e4f", // pink-900 (Tu opción de color oscuro)
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
