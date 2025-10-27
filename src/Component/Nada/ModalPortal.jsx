// src/Component/ModalPortal.jsx

/*import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";

const ModalPortal = ({ children }) => {
  //  Crea el contenedor del portal solo una vez
  const el = useMemo(() => document.createElement("div"), []);
  // Obtiene el ancla donde se inyectará el modal
  const modalRoot = document.getElementById("modal-root");

  useEffect(() => {
    if (!modalRoot) {
      console.error(" ¡ERROR CRÍTICO! #modal-root es NULL. No se puede montar el Portal.");
      return;
    }

    // Se agrega el contenedor al modal-root
    modalRoot.appendChild(el);

    //  Estilo de seguridad (opcional, pero útil)
    el.style.position = "relative";
    el.style.zIndex = 9999;

    // console.log(" Portal montándose."); // Descomentar para debug

    // Limpieza al desmontar el componente
    return () => {
      // console.log(" Portal desmontándose."); // Descomentar para debug
      modalRoot.removeChild(el);
    };
  }, [el, modalRoot]); // Dependencias estables

  // Si no existe el nodo raíz, evita crear el portal
  if (!modalRoot) return null;

  // Renderiza el contenido del modal (children) dentro del div 'el'
  return createPortal(children, el);
};

export default ModalPortal;*/