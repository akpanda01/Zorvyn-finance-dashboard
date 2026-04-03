import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
} from "react";
import { INITIAL_TRANSACTIONS } from "../data/mockData";

// ===== ROLES =====
export const ROLES = {
  ADMIN:  "Admin",
  VIEWER: "Viewer",
};

// ===== INITIAL STATE =====
const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem("fd_transactions");
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  } catch {
    return INITIAL_TRANSACTIONS;
  }
};

const initialState = {
  transactions: loadFromStorage(),
  role: localStorage.getItem("fd_role") || ROLES.ADMIN,
  filters: {
    search:   "",
    type:     "all",      // "all" | "income" | "expense"
    category: "all",
    dateFrom: "",
    dateTo:   "",
    sortBy:   "date_desc", // "date_desc" | "date_asc" | "amount_desc" | "amount_asc"
  },
  activeModal: null,       // null | "add" | "edit"
  editingTransaction: null,
};

// ===== ACTION TYPES =====
export const ACTIONS = {
  SET_ROLE:               "SET_ROLE",
  SET_FILTER:             "SET_FILTER",
  RESET_FILTERS:          "RESET_FILTERS",
  ADD_TRANSACTION:        "ADD_TRANSACTION",
  EDIT_TRANSACTION:       "EDIT_TRANSACTION",
  DELETE_TRANSACTION:     "DELETE_TRANSACTION",
  OPEN_MODAL:             "OPEN_MODAL",
  CLOSE_MODAL:            "CLOSE_MODAL",
  SET_EDITING:            "SET_EDITING",
};

// ===== REDUCER =====
const appReducer = (state, action) => {
  switch (action.type) {

    case ACTIONS.SET_ROLE:
      return { ...state, role: action.payload };

    case ACTIONS.SET_FILTER:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };

    case ACTIONS.RESET_FILTERS:
      return { ...state, filters: initialState.filters };

    case ACTIONS.ADD_TRANSACTION:
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };

    case ACTIONS.EDIT_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };

    case ACTIONS.DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };

    case ACTIONS.OPEN_MODAL:
      return { ...state, activeModal: action.payload };

    case ACTIONS.CLOSE_MODAL:
      return { ...state, activeModal: null, editingTransaction: null };

    case ACTIONS.SET_EDITING:
      return { ...state, editingTransaction: action.payload };

    default:
      return state;
  }
};

// ===== CONTEXT =====
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Persist transactions to localStorage
  useEffect(() => {
    localStorage.setItem("fd_transactions", JSON.stringify(state.transactions));
  }, [state.transactions]);

  // Persist role to localStorage
  useEffect(() => {
    localStorage.setItem("fd_role", state.role);
  }, [state.role]);

  // ===== DERIVED: FILTERED + SORTED TRANSACTIONS =====
  const filteredTransactions = useMemo(() => {
    let result = [...state.transactions];
    const { search, type, category, dateFrom, dateTo, sortBy } = state.filters;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    if (type !== "all") {
      result = result.filter((t) => t.type === type);
    }

    if (category !== "all") {
      result = result.filter((t) => t.category === category);
    }

    if (dateFrom) {
      result = result.filter((t) => t.date >= dateFrom);
    }

    if (dateTo) {
      result = result.filter((t) => t.date <= dateTo);
    }

    switch (sortBy) {
      case "date_asc":
        result.sort((a, b) => a.date.localeCompare(b.date));
        break;
      case "date_desc":
        result.sort((a, b) => b.date.localeCompare(a.date));
        break;
      case "amount_asc":
        result.sort((a, b) => a.amount - b.amount);
        break;
      case "amount_desc":
        result.sort((a, b) => b.amount - a.amount);
        break;
      default:
        break;
    }

    return result;
  }, [state.transactions, state.filters]);

  // ===== DERIVED: SUMMARY STATS =====
  const summary = useMemo(() => {
    const totalIncome  = state.transactions.filter((t) => t.type === "income") .reduce((s, t) => s + t.amount, 0);
    const totalExpense = state.transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    };
  }, [state.transactions]);

  // ===== ACTION HELPERS =====
  const setRole         = (role)    => dispatch({ type: ACTIONS.SET_ROLE,           payload: role });
  const setFilter       = (filter)  => dispatch({ type: ACTIONS.SET_FILTER,         payload: filter });
  const resetFilters    = ()        => dispatch({ type: ACTIONS.RESET_FILTERS });
  const openModal       = (mode)    => dispatch({ type: ACTIONS.OPEN_MODAL,         payload: mode });
  const closeModal      = ()        => dispatch({ type: ACTIONS.CLOSE_MODAL });
  const setEditing      = (txn)     => dispatch({ type: ACTIONS.SET_EDITING,        payload: txn });

  const addTransaction = (txn) => {
    const newTxn = {
      ...txn,
      id: "t" + Date.now(),
    };
    dispatch({ type: ACTIONS.ADD_TRANSACTION, payload: newTxn });
  };

  const editTransaction = (txn) => {
    dispatch({ type: ACTIONS.EDIT_TRANSACTION, payload: txn });
  };

  const deleteTransaction = (id) => {
    dispatch({ type: ACTIONS.DELETE_TRANSACTION, payload: id });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        filteredTransactions,
        summary,
        setRole,
        setFilter,
        resetFilters,
        addTransaction,
        editTransaction,
        deleteTransaction,
        openModal,
        closeModal,
        setEditing,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};