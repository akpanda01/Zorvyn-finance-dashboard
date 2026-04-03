// ===== CURRENCY =====
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style:    "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

// ===== DATE =====
export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day:   "2-digit",
    month: "short",
    year:  "numeric",
  });
};

// ===== SHORT MONTH (for chart axis) =====
export const shortMonth = (dateStr) => {
  const [year, month] = dateStr.split("-");
  return new Date(year, month - 1).toLocaleDateString("en-IN", { month: "short" });
};

// ===== GENERATE ID =====
export const generateId = () => "t" + Date.now() + Math.random().toString(36).slice(2, 6);

// ===== EXPORT CSV =====
export const exportToCSV = (transactions) => {
  const headers = ["ID", "Date", "Description", "Category", "Type", "Amount"];
  const rows = transactions.map((t) => [
    t.id, t.date, t.description, t.category, t.type, t.amount,
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((v) => `"${v}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = "transactions.csv";
  a.click();
  URL.revokeObjectURL(url);
};

// ===== EXPORT JSON =====
export const exportToJSON = (transactions) => {
  const blob = new Blob([JSON.stringify(transactions, null, 2)], {
    type: "application/json",
  });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = "transactions.json";
  a.click();
  URL.revokeObjectURL(url);
};