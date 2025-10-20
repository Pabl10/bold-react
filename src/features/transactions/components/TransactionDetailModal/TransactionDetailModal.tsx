import React, { RefObject, useEffect } from 'react';
import { PaymentMethod, SalesType, Transaction, TransactionStatus } from '@/features/transactions/types/transaction.types';
import { 
  formatCurrency, 
  formatDate, 
  getPaymentMethodName, 
  getSalesTypeName,
  getStatusName,
  getFranchiseName 
} from '@/features/transactions/utils/formatters';
import { useClickOutside } from '@/features/shared/hooks/useClickOutside';
import './TransactionDetailModal.scss';

interface TransactionDetailModalProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal lateral que muestra el detalle completo de una transacción
 */
export const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({
  transaction,
  isOpen,
  onClose,
}) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  
  // Cerrar modal al hacer click fuera
  useClickOutside<HTMLDivElement>(modalRef as RefObject<HTMLDivElement>, onClose);
  
  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);
  
  if (!isOpen || !transaction) {
    return null;
  }
  
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
  
  const getSalesTypeIcon = (salesType: SalesType) => {
    return salesType === 'TERMINAL' ? '🖥️' : '🔗';
  };
  
  return (
    <>
      {/* Overlay */}
      <div className="transaction-modal__overlay" onClick={onClose} />
      
      {/* Modal */}
      <div 
        className={`transaction-modal ${isOpen ? 'transaction-modal--open' : ''}`}
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="transaction-modal__header">
          <h2 id="modal-title" className="transaction-modal__title">
            Detalle de Transacción
          </h2>
          <button
            className="transaction-modal__close"
            onClick={onClose}
            type="button"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>
        
        <div className="transaction-modal__content">
          <div className="transaction-modal__section">
            <h3 className="transaction-modal__section-title">Información General</h3>
            <div className="transaction-modal__field">
              <span className="transaction-modal__label">ID Transacción Bold:</span>
              <span className="transaction-modal__value transaction-modal__value--id">
                {transaction.id}
              </span>
            </div>
            <div className="transaction-modal__field">
              <span className="transaction-modal__label">Estado:</span>
              <div className="transaction-modal__status">
                <span className="transaction-modal__status-icon">
                  {getStatusIcon(transaction.status)}
                </span>
                <span className="transaction-modal__status-text">
                  {getStatusName(transaction.status)}
                </span>
              </div>
            </div>
            <div className="transaction-modal__field">
              <span className="transaction-modal__label">Fecha y Hora:</span>
              <span className="transaction-modal__value">
                {formatDate(transaction.createdAt)}
              </span>
            </div>
          </div>
          
          <div className="transaction-modal__section">
            <h3 className="transaction-modal__section-title">Información de Pago</h3>
            <div className="transaction-modal__field">
              <span className="transaction-modal__label">Método de Pago:</span>
              <div className="transaction-modal__payment">
                <span className="transaction-modal__payment-icon">
                  {getPaymentMethodIcon(transaction.paymentMethod)}
                </span>
                <span className="transaction-modal__payment-method">
                  {getPaymentMethodName(transaction.paymentMethod)}
                </span>
                {transaction.franchise && (
                  <span className="transaction-modal__franchise">
                    ({getFranchiseName(transaction.franchise)})
                  </span>
                )}
              </div>
            </div>
            <div className="transaction-modal__field">
              <span className="transaction-modal__label">Tipo de Pago:</span>
              <div className="transaction-modal__sales-type">
                <span className="transaction-modal__sales-type-icon">
                  {getSalesTypeIcon(transaction.salesType)}
                </span>
                <span className="transaction-modal__sales-type-text">
                  {getSalesTypeName(transaction.salesType)}
                </span>
              </div>
            </div>
            <div className="transaction-modal__field">
              <span className="transaction-modal__label">Referencia:</span>
              <span className="transaction-modal__value">
                {transaction.transactionReference}
              </span>
            </div>
          </div>
          
          <div className="transaction-modal__section">
            <h3 className="transaction-modal__section-title">Información Financiera</h3>
            <div className="transaction-modal__field">
              <span className="transaction-modal__label">Monto:</span>
              <span className="transaction-modal__amount">
                {formatCurrency(transaction.amount)}
              </span>
            </div>
            {transaction.deduction && (
              <div className="transaction-modal__field">
                <span className="transaction-modal__label">Deducción Bold:</span>
                <span className="transaction-modal__deduction">
                  -{formatCurrency(transaction.deduction)}
                </span>
              </div>
            )}
            {transaction.deduction && (
              <div className="transaction-modal__field">
                <span className="transaction-modal__label">Monto Neto:</span>
                <span className="transaction-modal__net-amount">
                  {formatCurrency(transaction.amount - transaction.deduction)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
