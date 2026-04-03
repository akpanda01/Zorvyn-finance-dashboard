import React from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../../context/themeContext";
import { useApp, ROLES } from "../../context/AppContext";
import { Sun, Moon, Shield, Eye } from "lucide-react";
import "./Topbar.css";

const PAGE_TITLES = {
  "/dashboard":    { title: "Dashboard",    sub: "Your financial overview"       },
  "/transactions": { title: "Transactions", sub: "Manage and explore your data"  },
  "/insights":     { title: "Insights",     sub: "Understand your spending"      },
};

const Topbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { role, setRole }       = useApp();
  const { pathname }            = useLocation();

  const current = PAGE_TITLES[pathname] || PAGE_TITLES["/dashboard"];

  const handleRoleChange = (e) => setRole(e.target.value);

  return (
    <header className="topbar">
      {/* Left: Page title */}
      <div className="topbar-left">
        <h2 className="topbar-title">{current.title}</h2>
        <p className="topbar-sub">{current.sub}</p>
      </div>

      {/* Right: Controls */}
      <div className="topbar-right">

        {/* Role Switcher */}
        <div className="topbar-role">
          <span className="topbar-role-icon">
            {role === ROLES.ADMIN ? <Shield size={14} /> : <Eye size={14} />}
          </span>
          <select
            className="topbar-role-select"
            value={role}
            onChange={handleRoleChange}
            aria-label="Switch role"
          >
            <option value={ROLES.ADMIN}>Admin</option>
            <option value={ROLES.VIEWER}>Viewer</option>
          </select>
        </div>

        {/* Theme Toggle */}
        <button
          className="topbar-theme-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>

      </div>
    </header>
  );
};

export default Topbar;