import React from "react";
import { Search, RotateCcw } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { CATEGORIES } from "../../data/mockData";
import "./Transactions.css";

const TransactionFilters = () => {
  const { filters, setFilter, resetFilters } = useApp();

  const hasActiveFilters =
    filters.search || filters.type !== "all" ||
    filters.category !== "all" || filters.dateFrom || filters.dateTo;

  return (
    <div className="filters-bar animate-fade-in">

      {/* Search */}
      <div className="filter-search-wrap">
        <span className="filter-search-icon"><Search size={15} /></span>
        <input
          type="text"
          className="input-base filter-search-input"
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => setFilter({ search: e.target.value })}
        />
      </div>

      {/* Type */}
      <div className="filter-group">
        <span className="filter-group-label">Type</span>
        <select
          className="filter-select"
          value={filters.type}
          onChange={(e) => setFilter({ type: e.target.value })}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* Category */}
      <div className="filter-group">
        <span className="filter-group-label">Category</span>
        <select
          className="filter-select"
          value={filters.category}
          onChange={(e) => setFilter({ category: e.target.value })}
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Date From */}
      <div className="filter-group">
        <span className="filter-group-label">From</span>
        <input
          type="date"
          className="filter-date-input"
          value={filters.dateFrom}
          onChange={(e) => setFilter({ dateFrom: e.target.value })}
        />
      </div>

      {/* Date To */}
      <div className="filter-group">
        <span className="filter-group-label">To</span>
        <input
          type="date"
          className="filter-date-input"
          value={filters.dateTo}
          onChange={(e) => setFilter({ dateTo: e.target.value })}
        />
      </div>

      {/* Sort */}
      <div className="filter-group">
        <span className="filter-group-label">Sort By</span>
        <select
          className="filter-select"
          value={filters.sortBy}
          onChange={(e) => setFilter({ sortBy: e.target.value })}
        >
          <option value="date_desc">Date (Newest)</option>
          <option value="date_asc">Date (Oldest)</option>
          <option value="amount_desc">Amount (High)</option>
          <option value="amount_asc">Amount (Low)</option>
        </select>
      </div>

      {/* Reset */}
      <div className="filters-actions">
        {hasActiveFilters && (
          <button className="btn btn-ghost" onClick={resetFilters}>
            <RotateCcw size={14} /> Reset
          </button>
        )}
      </div>

    </div>
  );
};

export default TransactionFilters;