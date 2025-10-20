import { Transaction, PaymentMethod, TransactionStatus, CardFranchise, DateFilter } from '../types/transaction.types';

// Constante para los nombres de los meses en español
const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

/**
 * Formatea un número como moneda colombiana
 * @param amount Monto en centavos
 * @returns String formateado como moneda colombiana
 */
export const formatCurrency = (amount: number): string => {
  const pesos = amount / 100; // Convertir centavos a pesos
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(pesos);
};

/**
 * Formatea un timestamp a fecha y hora legible
 * @param timestamp Timestamp en milisegundos
 * @returns String formateado como dd/mm/yyyy - hh:mm:ss
 */
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  
  return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
};

/**
 * Formatea solo la fecha sin hora
 * @param timestamp Timestamp en milisegundos
 * @returns String formateado como dd/mm/yyyy
 */
export const formatDateOnly = (timestamp: number): string => {
  const date = new Date(timestamp);
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
};

/**
 * Formatea fecha como "Mes, Año" (ej: "Junio, 2024")
 * @param timestamp Timestamp en milisegundos
 * @returns String formateado como "Mes, Año"
 */
export const formatMonthYear = (timestamp: number): string => {
  const date = new Date(timestamp);
  
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  
  return `${month}, ${year}`;
};

/**
 * Obtiene el nombre legible del método de pago
 * @param paymentMethod Método de pago
 * @returns String con el nombre legible
 */
export const getPaymentMethodName = (paymentMethod: PaymentMethod): string => {
  const methodNames: Record<PaymentMethod, string> = {
    CARD: 'Tarjeta',
    PSE: 'PSE',
    DAVIPLATA: 'Daviplata',
    NEQUI: 'Nequi',
    BANCOLOMBIA: 'Bancolombia',
  };
  
  return methodNames[paymentMethod] || paymentMethod;
};

/**
 * Obtiene el nombre legible del tipo de venta
 * @param salesType Tipo de venta
 * @returns String con el nombre legible
 */
export const getSalesTypeName = (salesType: string): string => {
  const typeNames: Record<string, string> = {
    TERMINAL: 'Datáfono',
    PAYMENT_LINK: 'Link de pago',
  };
  
  return typeNames[salesType] || salesType;
};

/**
 * Obtiene el nombre legible del estado de transacción
 * @param status Estado de la transacción
 * @returns String con el nombre legible
 */
export const getStatusName = (status: TransactionStatus): string => {
  const statusNames: Record<TransactionStatus, string> = {
    SUCCESSFUL: 'Cobro exitoso',
    REJECTED: 'Cobro no realizado',
  };
  
  return statusNames[status];
};

/**
 * Obtiene el nombre legible de la franquicia de tarjeta
 * @param franchise Franquicia de la tarjeta
 * @returns String con el nombre legible
 */
export const getFranchiseName = (franchise: CardFranchise): string => {
  const franchiseNames: Record<CardFranchise, string> = {
    VISA: 'Visa',
    MASTERCARD: 'Mastercard',
    AMERICAN_EXPRESS: 'American Express',
  };
  
  return franchiseNames[franchise] || franchise;
};

/**
 * Genera los últimos 4 dígitos de una referencia de transacción
 * @param transactionReference Referencia de la transacción
 * @returns String con los últimos 4 dígitos
 */
export const getLastFourDigits = (transactionReference: number): string => {
  return transactionReference.toString().slice(-4);
};

/**
 * Calcula el total de ventas de una lista de transacciones
 * @param transactions Lista de transacciones
 * @returns Total en centavos
 */
export const calculateTotalAmount = (transactions: Transaction[]): number => {
  return transactions
    .filter(transaction => transaction.status === 'SUCCESSFUL')
    .reduce((total, transaction) => total + transaction.amount, 0);
};

/**
 * Calcula el total de deducciones de una lista de transacciones
 * @param transactions Lista de transacciones
 * @returns Total de deducciones en centavos
 */
export const calculateTotalDeductions = (transactions: Transaction[]): number => {
  return transactions
    .filter(transaction => transaction.status === 'SUCCESSFUL' && transaction.deduction)
    .reduce((total, transaction) => total + (transaction.deduction || 0), 0);
};

/**
 * Formatea la fecha según el filtro de fecha seleccionado
 * @param dateFilter Filtro de fecha activo
 * @returns String formateado según el filtro
 */
export const formatDateByFilter = (dateFilter: DateFilter): string => {
  const now = new Date();
  
  switch (dateFilter) {
    case 'today': {
      const day = now.getDate();
      const month = MONTH_NAMES[now.getMonth()];
      const year = now.getFullYear();
      return `${day} de ${month} ${year}`;
    }
    
    case 'week': {
      const weekAgo = new Date(now);
      weekAgo.setDate(weekAgo.getDate() - 7);
      
      const startMonth = MONTH_NAMES[weekAgo.getMonth()];
      const startYear = weekAgo.getFullYear();
      const endMonth = MONTH_NAMES[now.getMonth()];
      const endYear = now.getFullYear();
      
      if (startMonth === endMonth && startYear === endYear) {
        return `${weekAgo.getDate()} - ${now.getDate()} de ${endMonth} ${endYear}`;
      } else {
        return `${weekAgo.getDate()} de ${startMonth} ${startYear} - ${now.getDate()} de ${endMonth} ${endYear}`;
      }
    }
    
    default:
      return formatMonthYear(now.getTime());
  }
};
