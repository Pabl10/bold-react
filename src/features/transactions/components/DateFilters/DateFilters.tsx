import React from 'react';
import { useFilterStore, useDateFilter } from '@/features/transactions/store/useFilterStore';
import { DateFilter } from '@/features/transactions/types/transaction.types';
import './DateFilters.scss';

/**
 * Componente para los filtros de fecha (Hoy, Esta semana, Junio)
 */
export const DateFilters: React.FC = () => {
  const { setDateFilter } = useFilterStore();
  const currentDateFilter = useDateFilter();
  
  const dateFilters: { key: DateFilter; label: string }[] = [
    { key: 'today', label: 'Hoy' },
    { key: 'week', label: 'Esta semana' },
    { key: 'october', label: 'Octubre' },
  ];
  
  const handleFilterChange = (filter: DateFilter) => {
    setDateFilter(filter);
  };
  
  return (
    <div className="date-filters">
      {dateFilters.map(({ key, label }) => (
        <button
          key={key}
          className={`date-filters__button ${
            currentDateFilter === key ? 'date-filters__button--active' : ''
          }`}
          onClick={() => handleFilterChange(key)}
          type="button"
        >
          {label}
        </button>
      ))}
    </div>
  );
};
