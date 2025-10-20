import React, { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { PaymentMethod, Transaction, TransactionStatus } from '@/features/transactions/types/transaction.types';
import { 
  formatCurrency, 
  formatDate, 
  getPaymentMethodName, 
  getStatusName,
  getLastFourDigits 
} from '@/features/transactions/utils/formatters';
import './TransactionsTable.scss';

interface TransactionsTableProps {
  transactions: Transaction[];
  onTransactionClick: (transaction: Transaction) => void;
  loading?: boolean;
}

/**
 * Componente de tabla de transacciones con scroll horizontal
 */
export const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
  onTransactionClick,
  loading = false,
}) => {
  // Referencia para el contenedor scrollable
  const parentRef = useRef<HTMLDivElement>(null);

  // Configuración del virtualizador
  const rowVirtualizer = useVirtualizer({
    count: transactions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80, // Altura estimada de cada fila en píxeles
    overscan: 2, // Renderizar 2 elementos adicionales fuera de la vista
  });

  const getStatusIcon = (status: TransactionStatus) => {
    return status === 'SUCCESSFUL' ? '✅' : '❌';
  };
  
  const getPaymentMethodIcon = (paymentMethod: PaymentMethod) => {
    const icons: Record<PaymentMethod, string> = {
      CARD: '💳',
      PSE: '🏦',
      DAVIPLATA: '📱',
      NEQUI: '📱',
      BANCOLOMBIA: '🏦',
    };
    return icons[paymentMethod] || '💳';
  };
  
  if (loading) {
    return (
      <div className="transactions-table">
        <div className="transactions-table__loading">
          <div className="transactions-table__spinner"></div>
          <p>Cargando transacciones...</p>
        </div>
      </div>
    );
  }
  
  if (transactions.length === 0) {
    return (
      <div className="transactions-table">
        <div className="transactions-table__empty">
          <p>No se encontraron transacciones</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="transactions-table" role="table" aria-label="Transacciones">
      {/* Contenedor virtualizado */}
      <div
        ref={parentRef}
        className="transactions-table__virtual-container"
        style={{
          height: '500px', // Altura fija para el scroll
          overflow: 'auto',
        }}
      >
            {/* Header fijo */}
            <div className="transactions-table__header-container">
              <div className="transactions-table__header-row" role="row">
                <div className="transactions-table__header-cell transactions-table__header-cell--transaction" role="columnheader">
                  Transacción
                </div>
                <div className="transactions-table__header-cell transactions-table__header-cell--date" role="columnheader">
                  Fecha y hora
                </div>
                <div className="transactions-table__header-cell transactions-table__header-cell--payment" role="columnheader">
                  Método de pago
                </div>
                <div className="transactions-table__header-cell transactions-table__header-cell--id" role="columnheader">
                  ID transacción Bold
                </div>
                <div className="transactions-table__header-cell transactions-table__header-cell--amount" role="columnheader">
                  Monto
                </div>
              </div>
            </div>
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
        
          {rowVirtualizer.getVirtualItems().map((virtualItem) => {
            const transaction = transactions[virtualItem.index];
            return (
              <div
                key={transaction.id}
                className="transactions-table__row"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
                onClick={() => onTransactionClick(transaction)}
              >
                <div className="transactions-table__row-content" role="row">
                  <div className="transactions-table__cell transactions-table__cell--transaction" role="cell">
                    <div className="transactions-table__transaction-info">
                      <div className="transactions-table__status">
                        <span className="transactions-table__status-icon">
                          {getStatusIcon(transaction.status)}
                        </span>
                        <span className="transactions-table__status-text">
                          {getStatusName(transaction.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="transactions-table__cell transactions-table__cell--date" role="cell">
                    {formatDate(transaction.createdAt)}
                  </div>
                  
                  <div className="transactions-table__cell transactions-table__cell--payment" role="cell">
                    <div className="transactions-table__payment-info">
                      <span className="transactions-table__payment-icon">
                        {getPaymentMethodIcon(transaction.paymentMethod)}
                      </span>
                      <div className="transactions-table__payment-details">
                        <span className="transactions-table__payment-method">
                          {getPaymentMethodName(transaction.paymentMethod)}
                        </span>
                        {transaction.franchise && (
                          <span className="transactions-table__franchise">
                            {transaction.franchise}
                          </span>
                        )}
                        <span className="transactions-table__last-digits">
                          **** {getLastFourDigits(transaction.transactionReference)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="transactions-table__cell transactions-table__cell--id" role="cell">
                    {transaction.id}
                  </div>
                  
                  <div className="transactions-table__cell transactions-table__cell--amount" role="cell">
                    <div className="transactions-table__amount-info">
                      <span className="transactions-table__amount">
                        {formatCurrency(transaction.amount)}
                      </span>
                      {transaction.deduction && (
                        <div className="transactions-table__deduction-info">
                          <span className="transactions-table__deduction-label">
                            Deducción Bold
                          </span>
                          <span className="transactions-table__deduction-value">
                            -{formatCurrency(transaction.deduction)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
