import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { CATEGORIES } from "../../data/mockData";
import { generateId } from "../../utils/helpers";
import "./Transactions.css";

const EMPTY_FORM = {
  description: "",
  amount:      "",
  category:    CATEGORIES[0],
  type:        "expense",
  date:        new Date().toISOString().split("T")[0],
};

const TransactionModal = () => {
  const {
    activeModal, editingTransaction,
    closeModal, addTransaction, editTransaction,
  } = useApp();

  const [form, setForm]     = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const isEdit = activeModal === "edit";

  useEffect(() => {
    if (isEdit && editingTransaction) {
      setForm({
        description: editingTransaction.description,
        amount:      editingTransaction.amount,
        category:    editingTransaction.category,
        type:        editingTransaction.type,
        date:        editingTransaction.date,
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [activeModal, editingTransaction, isEdit]);

  if (!activeModal) return null;

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.description.trim()) errs.description = "Description is required";
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      errs.amount = "Enter a valid amount";
    if (!form.date) errs.date = "Date is required";
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    const txn = {
      id:          isEdit ? editingTransaction.id : generateId(),
      description: form.description.trim(),
      amount:      Number(form.amount),
      category:    form.category,
      type:        form.type,
      date:        form.date,
    };

    isEdit ? editTransaction(txn) : addTransaction(txn);
    closeModal();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal">

        {/* Header */}
        <div className="modal-header">
          <h3>{isEdit ? "Edit Transaction" : "Add Transaction"}</h3>
          <button className="modal-close-btn" onClick={closeModal} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <div className="modal-form">

          {/* Type Toggle */}
          <div className="form-group">
            <span className="form-label">Type</span>
            <div className="form-type-toggle">
              <button
                className={`type-toggle-btn ${form.type === "income" ? "type-toggle-btn--active-income" : ""}`}
                onClick={() => handleChange("type", "income")}
              >
                + Income
              </button>
              <button
                className={`type-toggle-btn ${form.type === "expense" ? "type-toggle-btn--active-expense" : ""}`}
                onClick={() => handleChange("type", "expense")}
              >
                − Expense
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">Description</label>
            <input
              type="text"
              className="input-base"
              placeholder="e.g. Monthly Salary"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
            {errors.description && (
              <span className="form-error">{errors.description}</span>
            )}
          </div>

          {/* Amount + Date */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Amount (₹)</label>
              <input
                type="number"
                className="input-base"
                placeholder="0"
                min="0"
                value={form.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
              />
              {errors.amount && (
                <span className="form-error">{errors.amount}</span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="filter-date-input"
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
              />
              {errors.date && (
                <span className="form-error">{errors.date}</span>
              )}
            </div>
          </div>

          {/* Category */}
          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="filter-select"
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {isEdit ? "Save Changes" : "Add Transaction"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default TransactionModal;