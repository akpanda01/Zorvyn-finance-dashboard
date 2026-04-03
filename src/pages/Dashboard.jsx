import React from "react";
import { Wallet, TrendingUp, TrendingDown, Clock } from "lucide-react";
import { useTransactions } from "../hooks/useTransactions";
import { formatCurrency, formatDate } from "../utils/helpers";
import SummaryCard      from "../components/cards/SummaryCard";
import BalanceTrendChart from "../components/charts/BalanceTrendChart";
import SpendingPieChart  from "../components/charts/SpendingPieChart";
import "./Dashboard.css";

const Dashboard = () => {
  const { summary, recentTransactions, lastTwoMonths } = useTransactions();

  const expenseTrend = lastTwoMonths
    ? parseFloat(lastTwoMonths.pct)
    : null;

  return (
    <div className="page-wrapper dashboard-page">

      {/* ===== SUMMARY CARDS ===== */}
      <section className="dashboard-cards animate-fade-in">
        <SummaryCard
          title="Total Balance"
          amount={formatCurrency(summary.balance)}
          icon={Wallet}
          type="balance"
          trendLabel="All time net balance"
        />
        <SummaryCard
          title="Total Income"
          amount={formatCurrency(summary.totalIncome)}
          icon={TrendingUp}
          type="income"
          trendLabel="Across all months"
        />
        <SummaryCard
          title="Total Expenses"
          amount={formatCurrency(summary.totalExpense)}
          icon={TrendingDown}
          type="expense"
          trend={expenseTrend}
          trendLabel="vs previous month"
        />
      </section>

      {/* ===== CHARTS ===== */}
      <section className="dashboard-charts">
        <div className="dashboard-chart-main">
          <BalanceTrendChart />
        </div>
        <div className="dashboard-chart-side">
          <SpendingPieChart />
        </div>
      </section>

      {/* ===== RECENT TRANSACTIONS ===== */}
      <section className="dashboard-recent animate-fade-in delay-4">
        <div className="dashboard-recent-header">
          <div className="dashboard-recent-title-wrap">
            <Clock size={16} />
            <h3>Recent Transactions</h3>
          </div>
        </div>

        {recentTransactions.length === 0 ? (
          <div className="empty-state">
            <p>No transactions yet.</p>
          </div>
        ) : (
          <div className="dashboard-recent-list">
            {recentTransactions.map((txn, i) => (
              <div
                key={txn.id}
                className={`recent-txn-row animate-fade-in delay-${i + 1}`}
              >
                <div className="recent-txn-left">
                  <div className={`recent-txn-dot recent-txn-dot--${txn.type}`} />
                  <div className="recent-txn-info">
                    <p className="recent-txn-desc">{txn.description}</p>
                    <p className="recent-txn-meta">{txn.category} · {formatDate(txn.date)}</p>
                  </div>
                </div>
                <span className={`recent-txn-amount recent-txn-amount--${txn.type}`}>
                  {txn.type === "income" ? "+" : "-"}
                  {formatCurrency(txn.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
};

export default Dashboard;