import { useMemo } from "react";
import { useApp } from "../context/AppContext";
import { getMonthlyData, getCategoryTotals } from "../data/mockData";

export const useTransactions = () => {
  const { transactions, filteredTransactions, summary } = useApp();

  const monthlyData = useMemo(
    () => getMonthlyData(transactions),
    [transactions]
  );

  const categoryTotals = useMemo(
    () => getCategoryTotals(transactions),
    [transactions]
  );

  const topCategory = categoryTotals[0] || null;

  const recentTransactions = useMemo(
    () =>
      [...transactions]
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 5),
    [transactions]
  );

  const lastTwoMonths = useMemo(() => {
    if (monthlyData.length < 2) return null;
    const current  = monthlyData[monthlyData.length - 1];
    const previous = monthlyData[monthlyData.length - 2];
    const expenseDiff = current.expense - previous.expense;
    const pct = previous.expense
      ? ((expenseDiff / previous.expense) * 100).toFixed(1)
      : 0;
    return { current, previous, expenseDiff, pct };
  }, [monthlyData]);

  return {
    transactions,
    filteredTransactions,
    summary,
    monthlyData,
    categoryTotals,
    topCategory,
    recentTransactions,
    lastTwoMonths,
  };
};