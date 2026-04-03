import React from "react";
import TransactionFilters from "./TransactionFilters";
import TransactionTable   from "./TransactionTable";
import TransactionModal   from "./TransactionModal";

const TransactionsPage = () => {
  return (
    <div className="page-wrapper txn-page">
      <div className="page-header">
        <h2>Transactions</h2>
        <p>View, filter, and manage all your financial records.</p>
      </div>

      <TransactionFilters />
      <TransactionTable />
      <TransactionModal />
    </div>
  );
};

export default TransactionsPage;