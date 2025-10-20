import { useEffect, RefObject } from 'react';

/**
 * Hook personalizado para detectar clicks fuera de un elemento
 * @param ref Referencia al elemento
 * @param callback Función a ejecutar cuando se hace click fuera
 */
export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  callback: () => void
): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    // Agregar el event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup: remover el event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};
