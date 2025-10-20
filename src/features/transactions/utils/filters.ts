import { Transaction, DateFilter, TransactionTypeFilter } from '../types/transaction.types';

/**
 * Filtra transacciones por fecha
 * @param transactions Lista de transacciones
 * @param dateFilter Filtro de fecha a aplicar
 * @returns Lista filtrada de transacciones
 */
export const filterByDate = (transactions: Transaction[], dateFilter: DateFilter): Transaction[] => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  switch (dateFilter) {
    case 'today': {
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      return transactions.filter(transaction => {
        const transactionDate = new Date(transaction.createdAt);
        return transactionDate >= today && transactionDate < tomorrow;
      });
    }
    
    case 'week': {
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      
      return transactions.filter(transaction => {
        const transactionDate = new Date(transaction.createdAt);
        return transactionDate >= weekAgo && transactionDate <= now;
      });
    }
    
    case 'october': {
      return transactions.filter(transaction => {
        const transactionDate = new Date(transaction.createdAt);
        return transactionDate.getMonth() === 9; // 9 = octubre (0-indexado)
      });
    }
    
    default:
      return transactions;
  }
};

/**
 * Filtra transacciones por tipo de transacción
 * @param transactions Lista de transacciones
 * @param transactionTypeFilter Array de filtros de tipo de transacción
 * @returns Lista filtrada de transacciones
 */
export const filterByTransactionType = (
  transactions: Transaction[], 
  transactionTypeFilter: TransactionTypeFilter[]
): Transaction[] => {
  if (transactionTypeFilter.includes('all') || transactionTypeFilter.length === 0) {
    return transactions;
  }
  
  // Filtrar por los tipos seleccionados
  return transactions.filter(transaction => {
    return transactionTypeFilter.some(filter => {
      switch (filter) {
        case 'terminal':
          return transaction.salesType === 'TERMINAL';
        case 'payment_link':
          return transaction.salesType === 'PAYMENT_LINK';
        default:
          return false;
      }
    });
  });
};

/**
 * Busca transacciones por término de búsqueda
 * @param transactions Lista de transacciones
 * @param searchTerm Término de búsqueda
 * @returns Lista filtrada de transacciones
 */
export const searchTransactions = (transactions: Transaction[], searchTerm: string): Transaction[] => {
  if (!searchTerm.trim()) {
    return transactions;
  }
  
  const term = searchTerm.toLowerCase().trim();
  
  return transactions.filter(transaction => {
    // Buscar en ID
    if (transaction.id.toLowerCase().includes(term)) return true;
    
    // Buscar en método de pago
    if (transaction.paymentMethod.toLowerCase().includes(term)) return true;
    
    // Buscar en referencia de transacción
    if (transaction.transactionReference.toString().includes(term)) return true;
    
    // Buscar en monto (convertir a string)
    if (transaction.amount.toString().includes(term)) return true;
    
    // Buscar en fecha
    const transactionDate = new Date(transaction.createdAt);
    const dateString = transactionDate.toLocaleDateString('es-CO'); // dd/mm/yyyy
    const timeString = transactionDate.toLocaleTimeString('es-CO', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }); // hh:mm
    const fullDateTime = `${dateString} ${timeString}`;
    
    if (dateString.includes(term) || timeString.includes(term) || fullDateTime.includes(term)) return true;
    
    // Buscar en franquicia si existe
    if (transaction.franchise && transaction.franchise.toLowerCase().includes(term)) return true;
    
    return false;
  });
};

/**
 * Aplica todos los filtros a una lista de transacciones
 * @param transactions Lista de transacciones
 * @param filters Objeto con todos los filtros
 * @returns Lista filtrada de transacciones
 */
export const applyFilters = (
  transactions: Transaction[],
  filters: {
    dateFilter: DateFilter;
    transactionTypeFilter: TransactionTypeFilter[];
    searchTerm: string;
  }
): Transaction[] => {
  let filtered = transactions;
  
  // Aplicar filtro de fecha
  filtered = filterByDate(filtered, filters.dateFilter);
  
  // Aplicar filtro de tipo de transacción
  filtered = filterByTransactionType(filtered, filters.transactionTypeFilter);
  
  // Aplicar búsqueda
  filtered = searchTransactions(filtered, filters.searchTerm);
  
  return filtered;
};

/**
 * Obtiene el título de la tabla según el filtro de fecha
 * @param dateFilter Filtro de fecha activo
 * @returns Título de la tabla
 */
export const getTableTitle = (dateFilter: DateFilter): string => {
  switch (dateFilter) {
    case 'today':
      return 'Tus ventas de hoy';
    case 'week':
      return 'Tus ventas de esta semana';
    case 'october':
      return 'Tus ventas de octubre';
    default:
      return 'Tus ventas';
  }
};

/**
 * Obtiene el título de la card de totales según el filtro de fecha
 * @param dateFilter Filtro de fecha activo
 * @returns Título de la card
 */
export const getSalesCardTitle = (dateFilter: DateFilter): string => {
  switch (dateFilter) {
    case 'today':
      return 'Total de ventas de hoy';
    case 'week':
      return 'Total de ventas de esta semana';
    case 'october':
      return 'Total de ventas de octubre';
    default:
      return 'Total de ventas';
  }
};
