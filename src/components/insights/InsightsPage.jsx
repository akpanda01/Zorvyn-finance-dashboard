import React from "react";
import InsightsPanel from "./InsightsPanel";
import "./InsightsPage.css";

const InsightsPage = () => {
  return (
    <div className="page-wrapper insights-page">
      <div className="page-header">
        <h2>Insights</h2>
        <p>Auto-generated observations and patterns from your financial data.</p>
      </div>
      <InsightsPanel />
    </div>
  );
};

export default InsightsPage;