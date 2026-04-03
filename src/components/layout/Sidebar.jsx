import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  TrendingUp,
  Menu,
  X,
} from "lucide-react";
import "./Sidebar.css";

const NAV_ITEMS = [
  { to: "/dashboard",    icon: LayoutDashboard, label: "Dashboard"    },
  { to: "/transactions", icon: ArrowLeftRight,  label: "Transactions" },
  { to: "/insights",     icon: Lightbulb,       label: "Insights"     },
];

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile  = () => setMobileOpen(false);

  return (
    <>
      {/* Mobile hamburger */}
      <button className="sidebar-hamburger" onClick={toggleMobile} aria-label="Toggle menu">
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div className="sidebar-overlay" onClick={closeMobile} />
      )}

      <aside className={`sidebar ${mobileOpen ? "sidebar--open" : ""}`}>
        {/* Brand */}
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <TrendingUp size={18} />
          </div>
          <span className="sidebar-brand-name">FinTrack</span>
        </div>

        <div className="sidebar-divider" />

        {/* Nav label */}
        <p className="sidebar-section-label">MENU</p>

        {/* Nav links */}
        <nav className="sidebar-nav">
          {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeMobile}
              className={({ isActive }) =>
                `sidebar-nav-item ${isActive ? "sidebar-nav-item--active" : ""}`
              }
            >
              <span className="sidebar-nav-icon">
                <Icon size={18} />
              </span>
              <span className="sidebar-nav-label">{label}</span>
              <span className="sidebar-nav-indicator" />
            </NavLink>
          ))}
        </nav>

        {/* Bottom tag */}
        <div className="sidebar-footer">
          <div className="sidebar-footer-card">
            <p className="sidebar-footer-title">Finance Dashboard</p>
            <p className="sidebar-footer-sub">v1.0 · 2024</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;