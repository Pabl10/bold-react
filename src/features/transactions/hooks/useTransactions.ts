import { useState, useEffect, useMemo } from 'react';
import { Transaction, UseTransactionsReturn } from '../types/transaction.types';
import { fetchTransactions } from '../services/transactionService';
import { useFilters } from '../store/useFilterStore';
import { applyFilters } from '../utils/filters';
import { calculateTotalAmount } from '../utils/formatters';

/**
 * Hook personalizado para manejar las transacciones
 * Incluye fetch de datos, filtrado y cálculos
 */
export const useTransactions = (): UseTransactionsReturn => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const filters = useFilters();
  
  /**
   * Función para obtener las transacciones desde la API
   */
  const refetch = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchTransactions();
      setTransactions(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al cargar las transacciones';
      setError(errorMessage);
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Cargar transacciones al montar el componente
   */
  useEffect(() => {
    refetch();
  }, []);
  
  /**
   * Aplicar filtros a las transacciones
   */
  const filteredTransactions = useMemo(() => {
    return applyFilters(transactions, filters);
  }, [transactions, filters]);
  
  /**
   * Calcular el total de ventas de las transacciones filtradas
   */
  const totalAmount = useMemo(() => {
    return calculateTotalAmount(filteredTransactions);
  }, [filteredTransactions]);
  
  return {
    transactions,
    filteredTransactions,
    totalAmount,
    loading,
    error,
    refetch,
  };
};
