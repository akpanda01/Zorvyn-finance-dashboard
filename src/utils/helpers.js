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
export const generateId = () =>
  "t" + Date.now() + Math.random().toString(36).slice(2, 6);

// ===== CORE DOWNLOAD FUNCTION =====
const triggerDownload = (content, filename, mimeType) => {
  try {
    // Method 1 — Blob + Object URL (most modern browsers)
    const blob = new Blob([content], { type: mimeType });

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
      return;
    }

    const url  = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href     = url;
    link.download = filename;
    link.rel      = "noopener";
    link.style.cssText = "display:none;position:fixed;top:-1px;left:-1px;";

    document.body.appendChild(link);

    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles:    true,
        cancelable: true,
        view:       window,
      })
    );

    // Cleanup after short delay
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 300);

  } catch (err) {
    console.error("Download failed:", err);

    try {
      const encoded = encodeURIComponent(content);
      const dataUri = `data:${mimeType};charset=utf-8,${encoded}`;
      const link    = document.createElement("a");

      link.href     = dataUri;
      link.download = filename;
      link.style.cssText = "display:none;";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (fallbackErr) {
      console.error("Fallback download also failed:", fallbackErr);
      alert(
        "Your browser blocked the automatic download.\n\n" +
        "Please copy the data from the console (F12 → Console tab) " +
        "and paste it into a file manually."
      );
      console.log("=== EXPORT DATA ===\n", content);
    }
  }
};

// ===== EXPORT CSV =====
export const exportToCSV = (transactions) => {
  if (!transactions || transactions.length === 0) {
    alert("No transactions to export.");
    return;
  }

  const headers = ["ID", "Date", "Description", "Category", "Type", "Amount (INR)"];

  const escapeCell = (val) => {
    const str = String(val);
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = transactions.map((t) => [
    escapeCell(t.id),
    escapeCell(t.date),
    escapeCell(t.description),
    escapeCell(t.category),
    escapeCell(t.type),
    escapeCell(t.amount),
  ]);


  const csvContent =
    "\uFEFF" +
    [headers, ...rows]
      .map((row) => row.join(","))
      .join("\r\n");

  const timestamp = new Date().toISOString().slice(0, 10);
  triggerDownload(csvContent, `fintrack_transactions_${timestamp}.csv`, "text/csv;charset=utf-8;");
};

// ===== EXPORT JSON =====
export const exportToJSON = (transactions) => {
  if (!transactions || transactions.length === 0) {
    alert("No transactions to export.");
    return;
  }

  const jsonContent = JSON.stringify(transactions, null, 2);
  const timestamp   = new Date().toISOString().slice(0, 10);
  triggerDownload(jsonContent, `fintrack_transactions_${timestamp}.json`, "application/json;charset=utf-8;");
};