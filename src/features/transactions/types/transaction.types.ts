/**
 * Tipos de estado de transacción
 */
export type TransactionStatus = 'SUCCESSFUL' | 'REJECTED';

/**
 * Métodos de pago disponibles
 */
export type PaymentMethod = 'CARD' | 'PSE' | 'DAVIPLATA' | 'NEQUI' | 'BANCOLOMBIA';

/**
 * Tipos de venta
 */
export type SalesType = 'TERMINAL' | 'PAYMENT_LINK';

/**
 * Franquicias de tarjetas
 */
export type CardFranchise = 'VISA' | 'MASTERCARD' | 'AMERICAN_EXPRESS';

/**
 * Interfaz principal de transacción
 */
export interface Transaction {
  id: string;
  status: TransactionStatus;
  paymentMethod: PaymentMethod;
  salesType: SalesType;
  createdAt: number; // timestamp
  transactionReference: number;
  amount: number;
  deduction?: number;
  franchise?: CardFranchise;
}

/**
 * Respuesta de la API
 */
export interface TransactionsResponse {
  data: Transaction[];
}

/**
 * Filtros de fecha disponibles
 */
export type DateFilter = 'today' | 'week' | 'october';

/**
 * Filtros de tipo de transacción
 */
export type TransactionTypeFilter = 'terminal' | 'payment_link' | 'all';

/**
 * Estado de los filtros
 */
export interface FilterState {
  dateFilter: DateFilter;
  transactionTypeFilter: TransactionTypeFilter[];
  searchTerm: string;
}

/**
 * Estado del store de filtros
 */
export interface FilterStore {
  filters: FilterState;
  setDateFilter: (filter: DateFilter) => void;
  setTransactionTypeFilter: (filter: TransactionTypeFilter) => void;
  setSearchTerm: (term: string) => void;
  resetFilters: () => void;
}

/**
 * Estado de carga y error para la API
 */
export interface ApiState {
  loading: boolean;
  error: string | null;
}

/**
 * Hook de transacciones
 */
export interface UseTransactionsReturn {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  totalAmount: number;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}
