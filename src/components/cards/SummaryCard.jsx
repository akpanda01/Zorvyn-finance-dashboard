import React from "react";
import "./SummaryCard.css";

const SummaryCard = ({ title, amount, icon: Icon, type, trend, trendLabel }) => {
  return (
    <div className={`summary-card summary-card--${type} animate-fade-in`}>
      <div className="summary-card-top">
        <div className="summary-card-icon-wrap">
          <Icon size={18} />
        </div>
        {trend !== undefined && (
          <span className={`summary-card-trend ${trend >= 0 ? "trend--up" : "trend--down"}`}>
            {trend >= 0 ? "▲" : "▼"} {Math.abs(trend)}%
          </span>
        )}
      </div>

      <div className="summary-card-body">
        <p className="summary-card-label">{title}</p>
        <h2 className="summary-card-amount">{amount}</h2>
        {trendLabel && (
          <p className="summary-card-trend-label">{trendLabel}</p>
        )}
      </div>

      <div className="summary-card-glow" />
    </div>
  );
};

export default SummaryCard;