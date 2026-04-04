import React, { useState, useRef, useEffect } from "react";
import { Pencil, Trash2, ArrowUpDown, Download, Plus } from "lucide-react";
import { useApp, ROLES } from "../../context/AppContext";
import { CATEGORY_COLORS } from "../../data/mockData";
import { formatCurrency, formatDate, exportToCSV, exportToJSON } from "../../utils/helpers";
import "./Transactions.css";

const TransactionTable = () => {
  const {
    filteredTransactions, role,
    openModal, setEditing,
    deleteTransaction, setFilter, filters,
  } = useApp();

  const [exportOpen, setExportOpen] = useState(false);
  const exportRef = useRef(null);
  const isAdmin   = role === ROLES.ADMIN;

  // Close dropdown on outside click
  useEffect(() => {
    if (!exportOpen) return;
    const handler = (e) => {
      if (exportRef.current && !exportRef.current.contains(e.target)) {
        setExportOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [exportOpen]);

  const handleEdit = (txn) => {
    setEditing(txn);
    openModal("edit");
  };

  const handleSort = (field) => {
    const map = {
      date:   filters.sortBy === "date_desc"   ? "date_asc"   : "date_desc",
      amount: filters.sortBy === "amount_desc" ? "amount_asc" : "amount_desc",
    };
    setFilter({ sortBy: map[field] });
  };

  const getSortIcon = (field) => {
    const active =
      (field === "date"   && filters.sortBy.startsWith("date")) ||
      (field === "amount" && filters.sortBy.startsWith("amount"));
    return <ArrowUpDown size={12} style={{ opacity: active ? 1 : 0.35 }} />;
  };

  // ── export handlers called directly from onClick ──────────────────────────
  const handleExportCSV = () => {
    setExportOpen(false);
    exportToCSV(filteredTransactions);
  };

  const handleExportJSON = () => {
    setExportOpen(false);
    exportToJSON(filteredTransactions);
  };

  return (
    <>
      {/* Toolbar */}
      <div className="txn-toolbar animate-fade-in">
        <div className="txn-toolbar-left">
          <p className="txn-count">
            Showing <span>{filteredTransactions.length}</span> transactions
          </p>
        </div>

        <div className="txn-toolbar-right">

          {/* Export dropdown */}
          <div className="export-wrap" ref={exportRef}>
            <button
              className="btn btn-ghost"
              onClick={() => setExportOpen((p) => !p)}
            >
              <Download size={14} /> Export
            </button>

            {exportOpen && (
              <div className="export-dropdown">
                <button
                  className="export-dropdown-btn"
                  onClick={handleExportCSV}
                >
                  📄 Export CSV
                </button>
                <button
                  className="export-dropdown-btn"
                  onClick={handleExportJSON}
                >
                  📋 Export JSON
                </button>
              </div>
            )}
          </div>

          {/* Add — Admin only */}
          {isAdmin && (
            <button
              className="btn btn-primary"
              onClick={() => openModal("add")}
            >
              <Plus size={15} /> Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* ===== DESKTOP TABLE ===== */}
      <div className="txn-table-wrap animate-fade-in delay-1">
        {filteredTransactions.length === 0 ? (
          <div className="empty-state">
            <p>No transactions match your filters.</p>
          </div>
        ) : (
          <table className="txn-table">
            <thead>
              <tr>
                <th className="sortable" onClick={() => handleSort("date")}>
                  <span className="th-inner">Date {getSortIcon("date")}</span>
                </th>
                <th>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th className="sortable" onClick={() => handleSort("amount")}>
                  <span className="th-inner">Amount {getSortIcon("amount")}</span>
                </th>
                {isAdmin && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((txn, i) => (
                <tr key={txn.id} className={`animate-fade-in delay-${Math.min(i + 1, 5)}`}>
                  <td className="td-date">{formatDate(txn.date)}</td>
                  <td className="td-description"><p>{txn.description}</p></td>
                  <td>
                    <span className="td-category-chip">
                      <span
                        className="td-category-dot"
                        style={{ backgroundColor: CATEGORY_COLORS[txn.category] || "#7f8c8d" }}
                      />
                      {txn.category}
                    </span>
                  </td>
                  <td>
                    <span className={`badge badge-${txn.type}`}>
                      {txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}
                    </span>
                  </td>
                  <td className={`td-amount td-amount--${txn.type}`}>
                    {txn.type === "income" ? "+" : "−"}
                    {formatCurrency(txn.amount)}
                  </td>
                  {isAdmin && (
                    <td>
                      <div className="td-actions">
                        <button
                          className="td-action-btn"
                          onClick={() => handleEdit(txn)}
                          aria-label="Edit"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          className="td-action-btn td-action-btn--delete"
                          onClick={() => deleteTransaction(txn.id)}
                          aria-label="Delete"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ===== MOBILE CARD VIEW ===== */}
      <div className="txn-cards-mobile">
        {filteredTransactions.length === 0 ? (
          <div className="empty-state">
            <p>No transactions match your filters.</p>
          </div>
        ) : (
          filteredTransactions.map((txn) => (
            <div key={txn.id} className="txn-card-mobile">
              <div className="txn-card-mobile-top">
                <div>
                  <p className="txn-card-mobile-desc">{txn.description}</p>
                  <p className="txn-card-mobile-meta">
                    {formatDate(txn.date)} · {txn.category}
                  </p>
                </div>
                <span className={`txn-card-mobile-amount td-amount--${txn.type}`}>
                  {txn.type === "income" ? "+" : "−"}
                  {formatCurrency(txn.amount)}
                </span>
              </div>
              <div className="txn-card-mobile-bottom">
                <span className={`badge badge-${txn.type}`}>
                  {txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}
                </span>
                {isAdmin && (
                  <div className="td-actions">
                    <button className="td-action-btn" onClick={() => handleEdit(txn)}>
                      <Pencil size={13} />
                    </button>
                    <button
                      className="td-action-btn td-action-btn--delete"
                      onClick={() => deleteTransaction(txn.id)}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default TransactionTable;