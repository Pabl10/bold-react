import React, { useState, useRef, RefObject, useMemo } from 'react';
import { useFilterStore, useTransactionTypeFilter } from '@/features/transactions/store/useFilterStore';
import { TransactionTypeFilter } from '@/features/transactions/types/transaction.types';
import { useClickOutside } from '@/features/shared/hooks/useClickOutside';
import './FilterButton.scss';

export const FilterButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentFilter = useTransactionTypeFilter();
  const [tempFilters, setTempFilters] = useState<TransactionTypeFilter[]>(currentFilter);
  const { setTransactionTypeFilter } = useFilterStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Cerrar dropdown al hacer click fuera
  useClickOutside(dropdownRef as RefObject<HTMLDivElement>, () => setIsOpen(false));
  
  const filterOptions: { key: TransactionTypeFilter; label: string }[] = [
    { key: 'terminal', label: 'Cobro con datáfono' },
    { key: 'payment_link', label: 'Cobro con link de pago' },
    { key: 'all', label: 'Ver todos' },
  ];
  
  const handleTempFilterChange = (filter: TransactionTypeFilter) => {
    setTempFilters(prev => prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]);
  };
  
  const handleApplyFilter = () => {
    setTransactionTypeFilter(tempFilters);
    setIsOpen(false);
  };
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const getFilterLabel = useMemo(() => {
    return tempFilters.length === 0 ? 'Filtrar' : `Filtros: ${tempFilters.map(filter => filterOptions.find(option => option.key === filter)?.label).join(', ')}`;
  }, [tempFilters]);
  
  return (
    <div className="filter-button" ref={dropdownRef}>
      <button
        className="filter-button__trigger"
        onClick={toggleDropdown}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {
          getFilterLabel
        }
        <span className={`filter-button__icon ${isOpen ? 'filter-button__icon--open' : ''}`}>
          ▼
        </span>
      </button>
      
      {isOpen && (
        <div className="filter-button__dropdown">
          <div className="filter-button__dropdown-content">
            {filterOptions.map(({ key, label }) => (
              <label key={key} className="filter-button__option">
                <input
                  type="checkbox"
                  name="transactionType"
                  value={key}
                  checked={tempFilters.includes(key)}
                  onChange={() => handleTempFilterChange(key)}
                  className="filter-button__checkbox"
                />
                <span className="filter-button__label">{label}</span>
              </label>
            ))}
            <button
              className="filter-button__apply"
              onClick={handleApplyFilter}
              type="button"
            >
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
