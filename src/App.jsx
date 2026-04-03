import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/themeContext";
import { AppProvider } from "./context/AppContext";
import "./App.css";
import Sidebar from "./components/layout/Sidebar";
import Topbar  from "./components/layout/Topbar";
import Dashboard        from "./pages/Dashboard";
import TransactionsPage from "./components/transactions/TransactionsPage";
import InsightsPage     from "./components/insights/InsightsPage";
const AppShell = () => {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <Topbar />
        <div className="app-content">
          <Routes>
            <Route path="/"             element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard"    element={<Dashboard />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/insights"     element={<InsightsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
          <AppShell />
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;