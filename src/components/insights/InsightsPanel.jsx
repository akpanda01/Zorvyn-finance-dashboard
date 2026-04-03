import React, { useMemo } from "react";
import {
  Flame, TrendingUp, TrendingDown, PiggyBank,
  BarChart2, Lightbulb, ArrowUp, ArrowDown, Minus,
  Wallet, CreditCard, Activity, AlertCircle, Star,
} from "lucide-react";
import { useTransactions } from "../../hooks/useTransactions";
import { CATEGORY_COLORS } from "../../data/mockData";
import { formatCurrency, shortMonth } from "../../utils/helpers";
import "./Insights.css";

/* ─── helpers ─── */
const getSavingsClass = (rate) => {
  if (rate >= 30) return "good";
  if (rate >= 10) return "warn";
  return "bad";
};

/* ─── sub-components ─── */

const TopCategoryCard = ({ categoryTotals, summary }) => {
  const top = categoryTotals[0];
  if (!top) return null;
  const pct = summary.totalExpense
    ? ((top.value / summary.totalExpense) * 100).toFixed(1)
    : 0;

  return (
    <div className="insight-card animate-fade-in delay-1">
      <div className="insight-card-header">
        <div className="insight-card-title-wrap">
          <p className="insight-card-title">Highest Spending Category</p>
          <p className="insight-card-sub">Where most money goes</p>
        </div>
        <div className="insight-card-icon insight-icon--orange">
          <Flame size={17} />
        </div>
      </div>

      <p className="top-category-name">{top.name}</p>
      <p className="top-category-amount">{formatCurrency(top.value)}</p>

      <div className="top-category-bar-wrap">
        <div
          className="top-category-bar"
          style={{
            width: `${pct}%`,
            backgroundColor: CATEGORY_COLORS[top.name] || "var(--accent-primary)",
          }}
        />
      </div>
      <p className="top-category-pct">{pct}% of total expenses</p>
    </div>
  );
};

const MonthComparisonCard = ({ lastTwoMonths }) => {
  if (!lastTwoMonths) {
    return (
      <div className="insight-card animate-fade-in delay-2">
        <div className="insight-card-header">
          <div className="insight-card-title-wrap">
            <p className="insight-card-title">Monthly Comparison</p>
            <p className="insight-card-sub">Current vs previous month</p>
          </div>
          <div className="insight-card-icon insight-icon--blue">
            <BarChart2 size={17} />
          </div>
        </div>
        <div className="empty-state"><p>Not enough data yet.</p></div>
      </div>
    );
  }

  const { current, previous, expenseDiff, pct } = lastTwoMonths;
  const maxExpense = Math.max(current.expense, previous.expense);
  const isUp      = expenseDiff > 0;
  const isNeutral = expenseDiff === 0;

  const deltaClass = isNeutral
    ? "month-compare-delta--neutral"
    : isUp
    ? "month-compare-delta--up"
    : "month-compare-delta--down";

  const DeltaIcon = isNeutral ? Minus : isUp ? ArrowUp : ArrowDown;

  return (
    <div className="insight-card animate-fade-in delay-2">
      <div className="insight-card-header">
        <div className="insight-card-title-wrap">
          <p className="insight-card-title">Monthly Comparison</p>
          <p className="insight-card-sub">Expenses: current vs previous</p>
        </div>
        <div className="insight-card-icon insight-icon--blue">
          <BarChart2 size={17} />
        </div>
      </div>

      <div className="month-compare-row">
        <div className="month-compare-item">
          <div className="month-compare-label">
            <span className="month-compare-name">
              {shortMonth(current.month)} (Current)
            </span>
            <span className="month-compare-val">
              {formatCurrency(current.expense)}
            </span>
          </div>
          <div className="month-compare-bar-wrap">
            <div
              className="month-compare-bar month-compare-bar--current"
              style={{ width: `${maxExpense ? (current.expense / maxExpense) * 100 : 0}%` }}
            />
          </div>
        </div>

        <div className="month-compare-item">
          <div className="month-compare-label">
            <span className="month-compare-name">
              {shortMonth(previous.month)} (Previous)
            </span>
            <span className="month-compare-val">
              {formatCurrency(previous.expense)}
            </span>
          </div>
          <div className="month-compare-bar-wrap">
            <div
              className="month-compare-bar month-compare-bar--previous"
              style={{ width: `${maxExpense ? (previous.expense / maxExpense) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      <div className={`month-compare-delta ${deltaClass}`}>
        <DeltaIcon size={14} />
        {isNeutral
          ? "No change from last month"
          : `Expenses ${isUp ? "up" : "down"} by ${formatCurrency(Math.abs(expenseDiff))} (${Math.abs(pct)}%)`}
      </div>
    </div>
  );
};

const SavingsRateCard = ({ summary }) => {
  const rate = summary.totalIncome
    ? (((summary.totalIncome - summary.totalExpense) / summary.totalIncome) * 100).toFixed(1)
    : 0;
  const cl = getSavingsClass(parseFloat(rate));

  const hints = {
    good: "Excellent savings discipline. You're building a strong financial cushion.",
    warn: "Moderate savings rate. Consider trimming discretionary spending.",
    bad:  "Low savings rate. Review your largest expense categories to improve.",
  };

  return (
    <div className="insight-card animate-fade-in delay-3">
      <div className="insight-card-header">
        <div className="insight-card-title-wrap">
          <p className="insight-card-title">Savings Rate</p>
          <p className="insight-card-sub">Income retained after expenses</p>
        </div>
        <div className="insight-card-icon insight-icon--green">
          <PiggyBank size={17} />
        </div>
      </div>

      <p className={`savings-rate-big savings-rate-big--${cl}`}>{rate}%</p>
      <p className="savings-rate-label">of total income saved</p>

      <div className="savings-rate-bar-wrap">
        <div
          className={`savings-rate-bar savings-rate-bar--${cl}`}
          style={{ width: `${Math.min(Math.max(parseFloat(rate), 0), 100)}%` }}
        />
      </div>

      <p className="savings-rate-hint">{hints[cl]}</p>
    </div>
  );
};

const AvgTransactionCard = ({ transactions }) => {
  const incomes  = transactions.filter((t) => t.type === "income");
  const expenses = transactions.filter((t) => t.type === "expense");

  const avgIncome  = incomes.length
    ? incomes.reduce((s, t) => s + t.amount, 0) / incomes.length
    : 0;
  const avgExpense = expenses.length
    ? expenses.reduce((s, t) => s + t.amount, 0) / expenses.length
    : 0;

  return (
    <div className="insight-card animate-fade-in delay-4">
      <div className="insight-card-header">
        <div className="insight-card-title-wrap">
          <p className="insight-card-title">Avg Transaction</p>
          <p className="insight-card-sub">Per transaction value</p>
        </div>
        <div className="insight-card-icon insight-icon--yellow">
          <Activity size={17} />
        </div>
      </div>

      <div className="avg-txn-grid">
        <div className="avg-txn-item">
          <span className="avg-txn-item-label">Avg Income</span>
          <span className="avg-txn-item-value avg-txn-item-value--income">
            {formatCurrency(Math.round(avgIncome))}
          </span>
          <span className="avg-txn-item-count">{incomes.length} transactions</span>
        </div>
        <div className="avg-txn-item">
          <span className="avg-txn-item-label">Avg Expense</span>
          <span className="avg-txn-item-value avg-txn-item-value--expense">
            {formatCurrency(Math.round(avgExpense))}
          </span>
          <span className="avg-txn-item-count">{expenses.length} transactions</span>
        </div>
        <div className="avg-txn-item">
          <span className="avg-txn-item-label">Total Records</span>
          <span className="avg-txn-item-value avg-txn-item-value--neutral">
            {transactions.length}
          </span>
          <span className="avg-txn-item-count">all time</span>
        </div>
        <div className="avg-txn-item">
          <span className="avg-txn-item-label">Net Flow</span>
          <span
            className={`avg-txn-item-value ${
              incomes.length > expenses.length
                ? "avg-txn-item-value--income"
                : "avg-txn-item-value--expense"
            }`}
          >
            {incomes.length > expenses.length ? "Positive" : "Watch out"}
          </span>
          <span className="avg-txn-item-count">overall trend</span>
        </div>
      </div>
    </div>
  );
};

const CategoryBreakdownCard = ({ categoryTotals, summary }) => {
  const top8 = categoryTotals.slice(0, 8);

  return (
    <div className="insight-card insights-grid--full animate-fade-in delay-2">
      <div className="insight-card-header">
        <div className="insight-card-title-wrap">
          <p className="insight-card-title">Full Category Breakdown</p>
          <p className="insight-card-sub">Expense distribution across all categories</p>
        </div>
        <div className="insight-card-icon insight-icon--orange">
          <Wallet size={17} />
        </div>
      </div>

      {top8.length === 0 ? (
        <div className="empty-state"><p>No expense data available.</p></div>
      ) : (
        <div className="category-breakdown">
          {top8.map((cat) => {
            const pct = summary.totalExpense
              ? (cat.value / summary.totalExpense) * 100
              : 0;
            return (
              <div key={cat.name} className="category-breakdown-row">
                <div className="category-breakdown-label">
                  <span
                    className="category-breakdown-dot"
                    style={{ backgroundColor: CATEGORY_COLORS[cat.name] || "#7f8c8d" }}
                  />
                  {cat.name}
                </div>
                <div className="category-breakdown-bar-wrap">
                  <div
                    className="category-breakdown-bar"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: CATEGORY_COLORS[cat.name] || "#7f8c8d",
                      opacity: 0.85,
                    }}
                  />
                </div>
                <div className="category-breakdown-value">
                  {formatCurrency(cat.value)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const ObservationsCard = ({ summary, categoryTotals, lastTwoMonths, transactions }) => {
  const observations = useMemo(() => {
    const obs = [];
    const top = categoryTotals[0];

    if (top) {
      const pct = summary.totalExpense
        ? ((top.value / summary.totalExpense) * 100).toFixed(1)
        : 0;
      obs.push({
        icon:    Flame,
        iconCls: "obs-icon--orange",
        title:   `${top.name} dominates spending`,
        desc:    `${pct}% of your total expenses go to ${top.name}. Consider setting a monthly cap.`,
      });
    }

    const savingsRate = summary.totalIncome
      ? ((summary.totalIncome - summary.totalExpense) / summary.totalIncome) * 100
      : 0;

    if (savingsRate >= 30) {
      obs.push({
        icon:    Star,
        iconCls: "obs-icon--green",
        title:   "Strong savings discipline",
        desc:    `You're saving ${savingsRate.toFixed(1)}% of your income — well above the recommended 20%.`,
      });
    } else if (savingsRate < 10) {
      obs.push({
        icon:    AlertCircle,
        iconCls: "obs-icon--red",
        title:   "Savings rate needs attention",
        desc:    `You're only saving ${savingsRate.toFixed(1)}% of your income. Review your top expense categories.`,
      });
    }

    if (lastTwoMonths) {
      const { expenseDiff, pct, current } = lastTwoMonths;
      if (expenseDiff > 0 && Math.abs(pct) >= 10) {
        obs.push({
          icon:    TrendingUp,
          iconCls: "obs-icon--red",
          title:   "Expenses rising month-on-month",
          desc:    `Spending in ${shortMonth(current.month)} rose by ${Math.abs(pct)}%. Check what drove the increase.`,
        });
      } else if (expenseDiff < 0 && Math.abs(pct) >= 10) {
        obs.push({
          icon:    TrendingDown,
          iconCls: "obs-icon--green",
          title:   "Good cost reduction this month",
          desc:    `Spending in ${shortMonth(current.month)} dropped by ${Math.abs(pct)}% — great progress!`,
        });
      }
    }

    const incomeCount  = transactions.filter((t) => t.type === "income").length;
    const expenseCount = transactions.filter((t) => t.type === "expense").length;
    if (expenseCount > incomeCount * 3) {
      obs.push({
        icon:    CreditCard,
        iconCls: "obs-icon--yellow",
        title:   "High transaction frequency",
        desc:    `You have ${expenseCount} expense entries vs ${incomeCount} income entries — many small purchases add up.`,
      });
    }

    const freelance = transactions
      .filter((t) => t.category === "Freelance" && t.type === "income")
      .reduce((s, t) => s + t.amount, 0);
    if (freelance > 0) {
      obs.push({
        icon:    Wallet,
        iconCls: "obs-icon--blue",
        title:   "Freelance income detected",
        desc:    `You earned ${formatCurrency(freelance)} from freelance work. Great income diversification!`,
      });
    }

    return obs;
  }, [summary, categoryTotals, lastTwoMonths, transactions]);

  return (
    <div className="insight-card insights-grid--full animate-fade-in delay-3">
      <div className="insight-card-header">
        <div className="insight-card-title-wrap">
          <p className="insight-card-title">Smart Observations</p>
          <p className="insight-card-sub">Auto-generated from your data</p>
        </div>
        <div className="insight-card-icon insight-icon--yellow">
          <Lightbulb size={17} />
        </div>
      </div>

      {observations.length === 0 ? (
        <div className="empty-state"><p>Add more transactions to generate insights.</p></div>
      ) : (
        <div className="observation-list">
          {observations.map((obs, i) => (
            <div key={i} className={`observation-item animate-fade-in delay-${i + 1}`}>
              <div className={`observation-icon ${obs.iconCls}`}>
                <obs.icon size={15} />
              </div>
              <div className="observation-text-wrap">
                <p className="observation-title">{obs.title}</p>
                <p className="observation-desc">{obs.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── main panel ─── */
const InsightsPanel = () => {
  const {
    transactions, summary,
    categoryTotals, lastTwoMonths,
  } = useTransactions();

  return (
    <div className="insights-grid">
      <TopCategoryCard    categoryTotals={categoryTotals} summary={summary} />
      <MonthComparisonCard lastTwoMonths={lastTwoMonths} />
      <SavingsRateCard    summary={summary} />
      <AvgTransactionCard transactions={transactions} />
      <CategoryBreakdownCard categoryTotals={categoryTotals} summary={summary} />
      <ObservationsCard
        summary={summary}
        categoryTotals={categoryTotals}
        lastTwoMonths={lastTwoMonths}
        transactions={transactions}
      />
    </div>
  );
};

export default InsightsPanel;