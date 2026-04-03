import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useTransactions } from "../../hooks/useTransactions";
import { CATEGORY_COLORS } from "../../data/mockData";
import { formatCurrency } from "../../utils/helpers";
import "./Charts.css";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{d.name}</p>
      <div className="chart-tooltip-row">
        <span className="chart-tooltip-dot" style={{ backgroundColor: d.payload.fill }} />
        <span>{formatCurrency(d.value)}</span>
      </div>
    </div>
  );
};

const SpendingPieChart = () => {
  const { categoryTotals } = useTransactions();
  const [activeIndex, setActiveIndex] = useState(null);

  const top = categoryTotals.slice(0, 6);
  const total = top.reduce((s, c) => s + c.value, 0);

  return (
    <div className="chart-card animate-fade-in delay-3">
      <div className="chart-card-header">
        <div>
          <p className="chart-card-title">Spending Breakdown</p>
          <p className="chart-card-sub">By category (top 6)</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={top}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
            onMouseEnter={(_, i) => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {top.map((entry, i) => (
              <Cell
                key={entry.name}
                fill={CATEGORY_COLORS[entry.name] || "#7f8c8d"}
                opacity={activeIndex === null || activeIndex === i ? 1 : 0.45}
                stroke="none"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <div className="pie-legend">
        {top.map((entry, i) => (
          <div
            key={entry.name}
            className="pie-legend-item"
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div className="pie-legend-left">
              <span
                className="pie-legend-dot"
                style={{ backgroundColor: CATEGORY_COLORS[entry.name] || "#7f8c8d" }}
              />
              <span>{entry.name}</span>
            </div>
            <span className="pie-legend-value">
              {total ? ((entry.value / total) * 100).toFixed(1) : 0}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpendingPieChart;