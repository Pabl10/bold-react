import React, { useState } from 'react';
import { useDateFilter } from '@/features/transactions/store/useFilterStore';
import { formatCurrency, formatDateByFilter } from '@/features/transactions/utils/formatters';
import { getSalesCardTitle } from '@/features/transactions/utils/filters';
import './SalesCard.scss';

interface SalesCardProps {
  totalAmount: number;
  transactionCount: number;
}

export const SalesCard: React.FC<SalesCardProps> = ({ totalAmount, transactionCount }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const dateFilter = useDateFilter();
  
  const title = getSalesCardTitle(dateFilter);
  const formattedDate = formatDateByFilter(dateFilter);
  
  return (
    <div className="sales-card">
      <div className="sales-card__header">
        <h2 className="sales-card__title">{title}</h2>
        <div className="sales-card__info">
          <button
            className="sales-card__info-button"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            aria-label="Información sobre las ventas"
          >
            <span className="sales-card__info-icon">i</span>
          </button>
          
          {showTooltip && (
            <div className="sales-card__tooltip">
              <p className="sales-card__tooltip-text">
                Total de {transactionCount} transacciones exitosas
              </p>
              <p className="sales-card__tooltip-text">
                Filtrado por: {title.toLowerCase()}
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="sales-card__content">
        <div className="sales-card__amount">
          {formatCurrency(totalAmount)}
        </div>
        <div className="sales-card__date">
          {formattedDate}
        </div>
      </div>
    </div>
  );
};
