import React from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import { useTransactions } from "../../hooks/useTransactions";
import { formatCurrency, shortMonth } from "../../utils/helpers";
import "./Charts.css";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{shortMonth(label)}</p>
      {payload.map((entry) => (
        <div className="chart-tooltip-row" key={entry.dataKey}>
          <span className="chart-tooltip-dot" style={{ backgroundColor: entry.color }} />
          <span>{entry.name}: {formatCurrency(entry.value)}</span>
        </div>
      ))}
    </div>
  );
};

const BalanceTrendChart = () => {
  const { monthlyData } = useTransactions();

  const data = monthlyData.map((m) => ({
    month:   m.month,
    Income:  m.income,
    Expense: m.expense,
    Net:     m.income - m.expense,
  }));

  return (
    <div className="chart-card animate-fade-in delay-2">
      <div className="chart-card-header">
        <div>
          <p className="chart-card-title">Balance Trend</p>
          <p className="chart-card-sub">Monthly income vs expenses</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gradIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#2ecc71" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#2ecc71" stopOpacity={0}   />
            </linearGradient>
            <linearGradient id="gradExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#e74c3c" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#e74c3c" stopOpacity={0}   />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />

          <XAxis
            dataKey="month"
            tickFormatter={shortMonth}
            tick={{ fontSize: 11, fill: "var(--text-muted)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            tick={{ fontSize: 11, fill: "var(--text-muted)" }}
            axisLine={false}
            tickLine={false}
            width={48}
          />

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="Income"
            stroke="#2ecc71"
            strokeWidth={2}
            fill="url(#gradIncome)"
            dot={false}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
          <Area
            type="monotone"
            dataKey="Expense"
            stroke="#e74c3c"
            strokeWidth={2}
            fill="url(#gradExpense)"
            dot={false}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="trend-chart-legend">
        <span className="trend-legend-item trend-legend--income">
          <span className="trend-legend-dot" /> Income
        </span>
        <span className="trend-legend-item trend-legend--expense">
          <span className="trend-legend-dot" /> Expense
        </span>
      </div>
    </div>
  );
};

export default BalanceTrendChart;