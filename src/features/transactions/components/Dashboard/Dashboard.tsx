import React, { useState } from 'react';
import { Transaction } from '@/features/transactions/types/transaction.types';
import { useTransactions } from '@/features/transactions/hooks/useTransactions';
import { useDateFilter } from '@/features/transactions/store/useFilterStore';
import { getTableTitle } from '@/features/transactions/utils/filters';
import { SalesCard } from '../SalesCard/SalesCard';
import { DateFilters } from '../DateFilters/DateFilters';
import { FilterButton } from '../FilterButton/FilterButton';
import { SearchBar } from '../SearchBar/SearchBar';
import { TransactionsTable } from '../TransactionsTable/TransactionsTable';
import { TransactionDetailModal } from '../TransactionDetailModal/TransactionDetailModal';
import './Dashboard.scss';

/**
 * Componente principal del dashboard que integra todos los componentes
 */
export const Dashboard: React.FC = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { filteredTransactions, totalAmount, loading, error } = useTransactions();
  const dateFilter = useDateFilter();
  
  const tableTitle = getTableTitle(dateFilter);
  const successfulTransactions = filteredTransactions.filter(t => t.status === 'SUCCESSFUL');
  
  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };
  
  if (error) {
    return (
      <div className="dashboard">
        <div className="dashboard__error">
          <h2>Error al cargar las transacciones</h2>
          <p>{error}</p>
          <button 
            className="dashboard__retry-button"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <div className="dashboard__content-header">
          <SalesCard 
            totalAmount={totalAmount}
            transactionCount={successfulTransactions.length}
          />
          <div className="dashboard__filters-section">
            <DateFilters />
            <FilterButton />
          </div>

        </div>
        
        {/* Sección de transacciones */}
        <div className="dashboard__transactions-section">
          <div className="dashboard__transactions-header">
            <h2 className="dashboard__transactions-title">{tableTitle}</h2>
          </div>
          
          <div className="dashboard__search-section">
            <SearchBar />
          </div>
          
          <div className="dashboard__table-section">
            <TransactionsTable
              transactions={filteredTransactions}
              onTransactionClick={handleTransactionClick}
              loading={loading}
            />
          </div>
        </div>
      </div>
      
      {/* Modal de detalle */}
      <TransactionDetailModal
        transaction={selectedTransaction}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};
