import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FilterState, DateFilter, TransactionTypeFilter } from '../types/transaction.types';

/**
 * Estado inicial de los filtros
 */
const initialFilterState: FilterState = {
  dateFilter: 'today',
  transactionTypeFilter: ['all'],
  searchTerm: '',
};

/**
 * Store de filtros con persistencia en localStorage
 */
export const useFilterStore = create<{
  filters: FilterState;
  setDateFilter: (filter: DateFilter) => void;
  setTransactionTypeFilter: (filter: TransactionTypeFilter[]) => void;
  setSearchTerm: (term: string) => void;
  resetFilters: () => void;
}>()(
  persist(
    (set) => ({
      filters: initialFilterState,
      
      setDateFilter: (filter: DateFilter) =>
        set((state) => ({
          filters: { ...state.filters, dateFilter: filter },
        })),
      
      setTransactionTypeFilter: (filter: TransactionTypeFilter[]) =>
        set((state) => ({
          filters: { ...state.filters, transactionTypeFilter: filter },
        })),
      
      setSearchTerm: (term: string) =>
        set((state) => ({
          filters: { ...state.filters, searchTerm: term },
        })),
      
      resetFilters: () =>
        set({ filters: initialFilterState }),
    }),
    {
      name: 'bold-transactions-filters', // clave en localStorage
      partialize: (state) => ({ filters: state.filters }), // solo persistir los filtros
    }
  )
);

/**
 * Selectores para facilitar el uso del store
 */
export const useDateFilter = () => useFilterStore((state) => state.filters.dateFilter);
export const useTransactionTypeFilter = () => useFilterStore((state) => state.filters.transactionTypeFilter);
export const useSearchTerm = () => useFilterStore((state) => state.filters.searchTerm);
export const useFilters = () => useFilterStore((state) => state.filters);
