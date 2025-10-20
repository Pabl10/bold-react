import React, { useState, useEffect } from 'react';
import { useFilterStore } from '@/features/transactions/store/useFilterStore';
import './SearchBar.scss';

/**
 * Componente de barra de búsqueda con filtrado en tiempo real
 */
export const SearchBar: React.FC = () => {
  const { setSearchTerm } = useFilterStore();
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  
  // Debounce para evitar demasiadas actualizaciones
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(localSearchTerm);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [localSearchTerm, setSearchTerm]);
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(event.target.value);
  };
  
  const handleClear = () => {
    setLocalSearchTerm('');
    setSearchTerm('');
  };
  
  return (
    <div className="search-bar">
      <div className="search-bar__container">
        <div className="search-bar__icon">
          🔍
        </div>
        <input
          type="text"
          className="search-bar__input"
          placeholder="Buscar"
          value={localSearchTerm}
          onChange={handleInputChange}
          aria-label="Buscar transacciones"
        />
        {localSearchTerm && (
          <button
            className="search-bar__clear"
            onClick={handleClear}
            type="button"
            aria-label="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};
