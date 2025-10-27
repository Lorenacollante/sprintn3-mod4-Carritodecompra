export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12 py-10">
      <div className="container mx-auto px-4">
        
        {/* GRID PRINCIPAL DEL FOOTER (3 Columnas) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-gray-700 pb-8">
          
          {/* COLUMNA 1: CONTACTO Y MARCA */}
          <div>
            {/*  CAMBIO DE "Mi Lucero" A "Mi Lucero" */}
            <div className="text-2xl text-center md:text-left font-black text-pink-500 mb-4">
              Mi Lucero
            </div>
            <ul className="space-y-2 text-sm">
              <li>📧 <a href="mailto:info@zoemoda.com.ar" className="hover:text-pink-500">info@MiLucero.com.ar</a></li>
              <li>📍 Local de Produccion-Luis giorgi 335</li>
              <li>📍 Local comercial- rivadavia 2370</li>
              <li>📞 Teléfono: (03834) 4951-2054</li>
              <li>📱 Celular: +54 9 11 3771-0405</li>
            </ul>
          </div>

          {/* COLUMNA 2: SEGUINOS y Enlaces */}
          <div>
            <h4 className="text-xl font-bold text-white mb-4">Seguinos</h4>
            <div className="flex space-x-3 text-2xl mb-6">
              <a href="#" aria-label="Instagram" className="hover:text-pink-500 transition">📸</a>
              <a href="#" aria-label="Facebook" className="hover:text-pink-500 transition">📘</a>
            </div>

            <h4 className="text-xl font-bold text-white mb-4">Ayuda</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-pink-500 transition">Preguntas Frecuentes</a></li>
              <li><a href="#" className="hover:text-pink-500 transition">Política de Devolución</a></li>
            </ul>
          </div>

          {/* COLUMNA 3: Newsletter y Agencia */}
          <div>
            <h4 className="text-xl font-bold text-white mb-4">Agencia</h4>
            <p className="mb-3 text-sm">Suscríbete a nuestras novedades.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Tu email" 
                className="flex-grow p-2 rounded-md bg-gray-700 border border-gray-600 text-sm"
              />
              <button 
                className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-md text-sm font-semibold transition"
              >
                Suscribirse
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-8">Agencia de Diseño Web</p>
            <p className="text-xs text-gray-500">Marketing Digital - Web360</p>
          </div>
        </div>

        {/* BARRA INFERIOR DE COPYRIGHT */}
        <div className="text-center pt-6 text-sm text-gray-500">
          {/*  CAMBIO DE "Mi Lucero" A "Mi Lucero" */}
          <p>&copy; {new Date().getFullYear()} Mi Lucero Carteras y Accesorios. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}