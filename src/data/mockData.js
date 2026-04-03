// ===== CATEGORIES =====
export const CATEGORIES = [
  "Food & Dining",
  "Transport",
  "Shopping",
  "Entertainment",
  "Health",
  "Utilities",
  "Salary",
  "Freelance",
  "Investment",
  "Education",
  "Travel",
  "Other",
];

export const CATEGORY_COLORS = {
  "Food & Dining":  "#e8622a",
  "Transport":      "#3498db",
  "Shopping":       "#9b59b6",
  "Entertainment":  "#f0a500",
  "Health":         "#2ecc71",
  "Utilities":      "#1abc9c",
  "Salary":         "#27ae60",
  "Freelance":      "#2980b9",
  "Investment":     "#8e44ad",
  "Education":      "#d35400",
  "Travel":         "#16a085",
  "Other":          "#7f8c8d",
};

// ===== MOCK TRANSACTIONS =====
export const INITIAL_TRANSACTIONS = [
  // January
  { id: "t001", date: "2024-01-03", description: "Monthly Salary",        amount: 85000, category: "Salary",        type: "income"  },
  { id: "t002", date: "2024-01-05", description: "Grocery Store",         amount: 3200,  category: "Food & Dining", type: "expense" },
  { id: "t003", date: "2024-01-07", description: "Uber Ride",             amount: 450,   category: "Transport",     type: "expense" },
  { id: "t004", date: "2024-01-10", description: "Netflix Subscription",  amount: 649,   category: "Entertainment", type: "expense" },
  { id: "t005", date: "2024-01-12", description: "Freelance Project",     amount: 22000, category: "Freelance",     type: "income"  },
  { id: "t006", date: "2024-01-15", description: "Restaurant Dinner",     amount: 1800,  category: "Food & Dining", type: "expense" },
  { id: "t007", date: "2024-01-18", description: "Metro Card Recharge",   amount: 500,   category: "Transport",     type: "expense" },
  { id: "t008", date: "2024-01-20", description: "Electricity Bill",      amount: 2100,  category: "Utilities",     type: "expense" },
  { id: "t009", date: "2024-01-22", description: "Amazon Shopping",       amount: 4500,  category: "Shopping",      type: "expense" },
  { id: "t010", date: "2024-01-28", description: "Gym Membership",        amount: 1200,  category: "Health",        type: "expense" },

  // February
  { id: "t011", date: "2024-02-01", description: "Monthly Salary",        amount: 85000, category: "Salary",        type: "income"  },
  { id: "t012", date: "2024-02-03", description: "Grocery Store",         amount: 2900,  category: "Food & Dining", type: "expense" },
  { id: "t013", date: "2024-02-06", description: "Petrol Fill",           amount: 3000,  category: "Transport",     type: "expense" },
  { id: "t014", date: "2024-02-09", description: "Online Course",         amount: 4999,  category: "Education",     type: "expense" },
  { id: "t015", date: "2024-02-12", description: "Freelance Payment",     amount: 18000, category: "Freelance",     type: "income"  },
  { id: "t016", date: "2024-02-14", description: "Valentine Dinner",      amount: 3500,  category: "Food & Dining", type: "expense" },
  { id: "t017", date: "2024-02-17", description: "Water Bill",            amount: 800,   category: "Utilities",     type: "expense" },
  { id: "t018", date: "2024-02-20", description: "Clothing Purchase",     amount: 5500,  category: "Shopping",      type: "expense" },
  { id: "t019", date: "2024-02-23", description: "Doctor Visit",          amount: 1500,  category: "Health",        type: "expense" },
  { id: "t020", date: "2024-02-27", description: "Stock Dividend",        amount: 6000,  category: "Investment",    type: "income"  },

  // March
  { id: "t021", date: "2024-03-01", description: "Monthly Salary",        amount: 85000, category: "Salary",        type: "income"  },
  { id: "t022", date: "2024-03-04", description: "Swiggy Order",          amount: 850,   category: "Food & Dining", type: "expense" },
  { id: "t023", date: "2024-03-06", description: "Cab to Airport",        amount: 1200,  category: "Transport",     type: "expense" },
  { id: "t024", date: "2024-03-08", description: "Goa Trip",              amount: 18000, category: "Travel",        type: "expense" },
  { id: "t025", date: "2024-03-11", description: "Freelance Project",     amount: 30000, category: "Freelance",     type: "income"  },
  { id: "t026", date: "2024-03-14", description: "Internet Bill",         amount: 999,   category: "Utilities",     type: "expense" },
  { id: "t027", date: "2024-03-16", description: "Zomato Order",          amount: 620,   category: "Food & Dining", type: "expense" },
  { id: "t028", date: "2024-03-19", description: "Book Purchase",         amount: 1200,  category: "Education",     type: "expense" },
  { id: "t029", date: "2024-03-22", description: "Movie Tickets",         amount: 900,   category: "Entertainment", type: "expense" },
  { id: "t030", date: "2024-03-28", description: "Mutual Fund Return",    amount: 9500,  category: "Investment",    type: "income"  },

  // April
  { id: "t031", date: "2024-04-01", description: "Monthly Salary",        amount: 85000, category: "Salary",        type: "income"  },
  { id: "t032", date: "2024-04-03", description: "Grocery Store",         amount: 3100,  category: "Food & Dining", type: "expense" },
  { id: "t033", date: "2024-04-05", description: "Ola Ride",              amount: 320,   category: "Transport",     type: "expense" },
  { id: "t034", date: "2024-04-08", description: "Spotify Premium",       amount: 119,   category: "Entertainment", type: "expense" },
  { id: "t035", date: "2024-04-10", description: "Freelance Payment",     amount: 25000, category: "Freelance",     type: "income"  },
  { id: "t036", date: "2024-04-13", description: "Medical Checkup",       amount: 2200,  category: "Health",        type: "expense" },
  { id: "t037", date: "2024-04-16", description: "Electricity Bill",      amount: 2400,  category: "Utilities",     type: "expense" },
  { id: "t038", date: "2024-04-19", description: "Amazon Order",          amount: 3800,  category: "Shopping",      type: "expense" },
  { id: "t039", date: "2024-04-23", description: "Restaurant Lunch",      amount: 1100,  category: "Food & Dining", type: "expense" },
  { id: "t040", date: "2024-04-27", description: "Stock Investment",      amount: 15000, category: "Investment",    type: "expense" },

  // May
  { id: "t041", date: "2024-05-01", description: "Monthly Salary",        amount: 85000, category: "Salary",        type: "income"  },
  { id: "t042", date: "2024-05-04", description: "Grocery Store",         amount: 2750,  category: "Food & Dining", type: "expense" },
  { id: "t043", date: "2024-05-07", description: "Petrol Fill",           amount: 2800,  category: "Transport",     type: "expense" },
  { id: "t044", date: "2024-05-09", description: "Udemy Course",          amount: 3499,  category: "Education",     type: "expense" },
  { id: "t045", date: "2024-05-12", description: "Freelance Project",     amount: 20000, category: "Freelance",     type: "income"  },
  { id: "t046", date: "2024-05-15", description: "Swiggy Instamart",      amount: 980,   category: "Food & Dining", type: "expense" },
  { id: "t047", date: "2024-05-18", description: "Gas Bill",              amount: 750,   category: "Utilities",     type: "expense" },
  { id: "t048", date: "2024-05-21", description: "Flipkart Shopping",     amount: 6200,  category: "Shopping",      type: "expense" },
  { id: "t049", date: "2024-05-24", description: "Dividend Income",       amount: 4500,  category: "Investment",    type: "income"  },
  { id: "t050", date: "2024-05-28", description: "Concert Tickets",       amount: 2500,  category: "Entertainment", type: "expense" },

  // June
  { id: "t051", date: "2024-06-01", description: "Monthly Salary",        amount: 85000, category: "Salary",        type: "income"  },
  { id: "t052", date: "2024-06-03", description: "Grocery Store",         amount: 3300,  category: "Food & Dining", type: "expense" },
  { id: "t053", date: "2024-06-06", description: "Metro Recharge",        amount: 500,   category: "Transport",     type: "expense" },
  { id: "t054", date: "2024-06-09", description: "Manali Trip",           amount: 22000, category: "Travel",        type: "expense" },
  { id: "t055", date: "2024-06-12", description: "Freelance Payment",     amount: 28000, category: "Freelance",     type: "income"  },
  { id: "t056", date: "2024-06-15", description: "Electricity Bill",      amount: 2800,  category: "Utilities",     type: "expense" },
  { id: "t057", date: "2024-06-18", description: "Coffee Shop",           amount: 450,   category: "Food & Dining", type: "expense" },
  { id: "t058", date: "2024-06-21", description: "Medicine Purchase",     amount: 680,   category: "Health",        type: "expense" },
  { id: "t059", date: "2024-06-24", description: "Online Shopping",       amount: 4100,  category: "Shopping",      type: "expense" },
  { id: "t060", date: "2024-06-28", description: "Mutual Fund Return",    amount: 11000, category: "Investment",    type: "income"  },
];

// ===== MONTHLY SUMMARY HELPER =====
export const getMonthlyData = (transactions) => {
  const monthly = {};

  transactions.forEach((t) => {
    const month = t.date.substring(0, 7); // "2024-01"
    if (!monthly[month]) {
      monthly[month] = { month, income: 0, expense: 0 };
    }
    if (t.type === "income") monthly[month].income += t.amount;
    else monthly[month].expense += t.amount;
  });

  return Object.values(monthly).sort((a, b) => a.month.localeCompare(b.month));
};

// ===== CATEGORY TOTALS HELPER =====
export const getCategoryTotals = (transactions) => {
  const totals = {};

  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      totals[t.category] = (totals[t.category] || 0) + t.amount;
    });

  return Object.entries(totals)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};