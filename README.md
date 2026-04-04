# FinTrack — Finance Dashboard

> A clean, interactive, and fully responsive personal finance dashboard built with **React + Vite**. Track income, expenses, and spending patterns through live visualisations and dynamically generated insights — all in the browser, no backend required.

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Prerequisites](#prerequisites)
4. [Installation & Setup](#installation--setup)
5. [Project Structure](#project-structure)
6. [Approach & Architecture](#approach--architecture)
7. [Feature Walkthrough](#feature-walkthrough)
8. [Role Based UI](#role-based-ui)
9. [State Management](#state-management)
10. [Styling System](#styling-system)
11. [Mock Data](#mock-data)
12. [Responsiveness](#responsiveness)
13. [Utility Functions](#utility-functions)
14. [Evaluation Criteria Coverage](#evaluation-criteria-coverage)
15. [Optional Enhancements](#optional-enhancements)
16. [Assumptions](#assumptions)
17. [Future Improvements](#future-improvements)

---

## Overview

FinTrack is a single-page application that simulates a personal finance dashboard. It was built as a frontend assignment to demonstrate UI design thinking, component architecture, state management, and attention to user experience.

The app allows users to:

- View a high-level financial summary (balance, income, expenses)
- Explore and manage a full transaction history with search, filters, and sorting
- Understand spending behaviour through charts and auto-generated insights
- Switch between Admin and Viewer roles to simulate role-based access control
- Toggle between light and dark themes
- Export transaction data to CSV or JSON

All data is stored in `localStorage` — no backend, no API calls, no build-time environment variables needed.

---

## Tech Stack

| Package            | Version | Purpose                                      |
|--------------------|---------|----------------------------------------------|
| react              | 18.x    | UI component framework                       |
| react-dom          | 18.x    | DOM rendering                                |
| vite               | 5.x     | Build tool and development server            |
| react-router-dom   | 6.x     | Client-side routing across three pages       |
| recharts           | 2.x     | Area chart (balance trend) and donut chart   |
| lucide-react       | 0.383   | SVG icon set                                 |

No UI component library is used. All components and styles are custom-built.

---

## Prerequisites

- **Node.js** v18 or above
- **npm** v9 or above

Verify your versions:

```bash
node --version
npm --version
```

---

## Installation & Setup

### 1 — Create the project with Vite

```bash
npm create vite@latest finance-dashboard -- --template react
cd finance-dashboard
```

### 2 — Install base dependencies

```bash
npm install
```

### 3 — Install required libraries

```bash
npm install react-router-dom recharts lucide-react
```

### 4 — Add Google Fonts to `index.html`

Add the following inside the `<head>` tag:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
```

### 5 — Start the development server

```bash
npm run dev
```

The app runs at **http://localhost:5173** by default.

### Available Scripts

| Script              | Command            | Description                              |
|---------------------|--------------------|------------------------------------------|
| Development         | `npm run dev`      | Start Vite dev server with hot reload    |
| Production Build    | `npm run build`    | Compile and bundle for production        |
| Preview Build       | `npm run preview`  | Preview the production build locally     |
| Lint                | `npm run lint`     | Run ESLint across source files           |

---

## Project Structure

```
finance-dashboard/
├── public/
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx           # Fixed sidebar with nav links and mobile hamburger
│   │   │   ├── Sidebar.css
│   │   │   ├── Topbar.jsx            # Sticky header with role switcher and theme toggle
│   │   │   └── Topbar.css
│   │   │
│   │   ├── cards/
│   │   │   ├── SummaryCard.jsx       # Reusable stat card (balance, income, expense)
│   │   │   └── SummaryCard.css
│   │   │
│   │   ├── charts/
│   │   │   ├── BalanceTrendChart.jsx # Area chart — income vs expense over time
│   │   │   ├── SpendingPieChart.jsx  # Donut chart — top 6 spending categories
│   │   │   └── Charts.css
│   │   │
│   │   ├── transactions/
│   │   │   ├── TransactionTable.jsx   # Sortable table + mobile card view
│   │   │   ├── TransactionFilters.jsx # Search, type, category, date, sort filters
│   │   │   ├── TransactionModal.jsx   # Add / edit transaction form modal
│   │   │   └── Transactions.css
│   │   │
│   │   └── insights/
│   │       ├── InsightsPanel.jsx      # Six auto-generated insight cards
│   │       └── Insights.css
│   │
│   ├── context/
│   │   ├── AppContext.jsx             # Global state — transactions, role, filters, modal
│   │   └── ThemeContext.jsx           # Dark / light theme toggle and persistence
│   │
│   ├── data/
│   │   └── mockData.js                # 60 sample transactions + category config
│   │
│   ├── hooks/
│   │   └── useTransactions.js         # Derived data — monthly, categories, insights
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx              # Summary cards, charts, recent transactions
│   │   ├── Dashboard.css
│   │   ├── TransactionsPage.jsx       # Filters + table + modal composed together
│   │   ├── TransactionsPage.css
│   │   ├── InsightsPage.jsx           # Insights panel page wrapper
│   │   └── InsightsPage.css
│   │
│   ├── styles/
│   │   ├── global.css                 # Reset, typography, reusable utility classes
│   │   ├── theme.css                  # CSS variable definitions (light + dark)
│   │   └── animations.css             # Keyframes, stagger delays, skeleton loader
│   │
│   ├── utils/
│   │   └── helpers.js                 # formatCurrency, formatDate, exportCSV, exportJSON
│   │
│   ├── App.jsx                        # Router setup and layout shell
│   ├── App.css
│   └── main.jsx                       # Entry point — mounts providers
│
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

**Structural principles:**

- Every component owns its own `.css` file — no shared stylesheet dependencies between components
- Pages are thin wrappers that compose components; they do not contain business logic
- All business logic lives in `AppContext` and the `useTransactions` hook
- Global utilities (`.card`, `.btn`, `.badge`, `.input-base`) are defined once in `global.css`

---

## Approach & Architecture

### Design Decisions

The project was built with a few core principles in mind:

**Separation of concerns** — UI components are kept "dumb" wherever possible. They receive data and dispatch actions but do not compute derived state themselves. All computation happens in `AppContext` (via `useMemo`) and the `useTransactions` custom hook.

**CSS-variable-first theming** — instead of conditional class names or JavaScript-driven styles, the entire visual system is built on CSS custom properties. Switching from dark to light mode is a single attribute change on the root element: `document.documentElement.setAttribute("data-theme", "light")`. Every colour, shadow, and border in the app reads from these variables.

**No inline styles** — all styling lives in dedicated `.css` files co-located with their components. This makes styles easy to find, override, and reason about.

**Progressive complexity** — simple things are simple. A `SummaryCard` is a single file with clear props. A `TransactionModal` is self-contained with its own local form state. Nothing is over-engineered.

### Data Flow

```
mockData.js
    └── AppContext (useReducer)
            ├── filteredTransactions  (useMemo — filter + sort)
            ├── summary               (useMemo — totals)
            └── useTransactions hook
                    ├── monthlyData       → BalanceTrendChart
                    ├── categoryTotals    → SpendingPieChart, InsightsPanel
                    ├── topCategory       → InsightsPanel
                    ├── recentTransactions → Dashboard
                    └── lastTwoMonths     → InsightsPanel
```

Components subscribe to context via `useApp()` or `useTransactions()` and re-render only when relevant state changes.

---

## Feature Walkthrough

### Dashboard Overview

The main landing page gives an at-a-glance picture of financial health.

**Summary Cards**
Three stat cards sit at the top of the page:
- **Total Balance** — net of all income minus all expenses, all time
- **Total Income** — sum of every income transaction
- **Total Expenses** — sum of every expense transaction, with a trend badge showing the percentage change vs the previous month (green if down, red if up)

Each card has a glow accent, a coloured icon, and a hover lift animation.

**Balance Trend Chart**
A Recharts `AreaChart` plots monthly income and expenses as two overlapping filled area curves. Each month is a data point aggregated from all transactions in that month. The chart uses gradient fills and a custom tooltip showing exact figures. The X-axis shows short month names; the Y-axis formats values as ₹Xk.

**Spending Breakdown Chart**
A Recharts `PieChart` (donut variant) shows the top 6 expense categories by total spend. Hovering a segment dims all other segments for focus. A legend below the chart shows the category name and percentage of total spend. Each category has a distinct colour defined in `CATEGORY_COLORS`.

**Recent Transactions**
The last 5 transactions by date are listed with a type indicator dot (green for income, red for expense), description, category, date, and colour-coded amount.

---

### Transactions Page

A full-featured transaction management interface.

**Filters Bar**
All filters are wired to `AppContext` via `setFilter()` and applied in real-time via `useMemo`:

| Filter   | Type        | Behaviour                                      |
|----------|-------------|------------------------------------------------|
| Search   | Text input  | Matches description or category (case-insensitive) |
| Type     | Dropdown    | All / Income / Expense                         |
| Category | Dropdown    | Any of the 12 defined categories               |
| Date From | Date input | Inclusive lower bound on transaction date      |
| Date To  | Date input  | Inclusive upper bound on transaction date      |
| Sort By  | Dropdown    | Date newest, Date oldest, Amount high, Amount low |
| Reset    | Button      | Appears only when at least one filter is active |

**Transaction Table**
- Columns: Date, Description, Category (colour chip), Type (badge), Amount
- Date and Amount column headers are clickable to toggle sort direction
- Edit and Delete action buttons are visible only to the Admin role
- On screens below 768px the table is hidden and replaced by a stacked card view with the same data

**Add / Edit Modal**
- Income / Expense type toggle (two styled buttons, not a dropdown)
- Description, Amount, Date, and Category fields
- Form validation with inline error messages for empty or invalid fields
- Click on the backdrop outside the modal to dismiss without saving
- Editing pre-populates all fields from the selected transaction

**Export**
A dropdown button offers two format options:
- **Export CSV** — downloads the currently filtered transaction list as a `.csv` file
- **Export JSON** — downloads the currently filtered list as a formatted `.json` file

Exported data always reflects the active filter state, not the full dataset.

---

### Insights Page

Six auto-generated panels, each derived from real transaction data.

| Card                     | What It Shows                                                                 |
|--------------------------|-------------------------------------------------------------------------------|
| Highest Spending Category | Top expense category name, total amount, animated fill bar, % of total spend |
| Monthly Comparison        | Current vs previous month expense bars, delta badge (up / down / neutral)    |
| Savings Rate              | % of income retained after expenses, colour-coded bar (green / yellow / red)  |
| Avg Transaction           | Average income and expense per entry, total count, net flow trend label       |
| Full Category Breakdown   | Horizontal bar chart for all expense categories sorted by spend               |
| Smart Observations        | Dynamically generated text cards based on detected data patterns              |

**Smart Observation Logic**

The observations card automatically generates up to 5 findings:

1. **Dominant category** — flags the top spending category and its share of total expenses
2. **Savings health** — strong (≥ 30%), moderate (≥ 10%), or poor (< 10%) with an actionable message
3. **Month-on-month shift** — triggered when the change between the two most recent months is ≥ 10%
4. **High transaction frequency** — flagged when expense count exceeds 3× income count, suggesting many small purchases
5. **Income diversification** — detected when any Freelance category income entries exist

---

## Role Based UI

Roles are switched using the dropdown in the top bar. The selected role is stored in `localStorage` and persists across page refreshes. No backend or authentication is involved — this is a frontend simulation.

| Feature                          | Admin | Viewer |
|----------------------------------|:-----:|:------:|
| View dashboard, charts, insights | ✅    | ✅     |
| View all transactions            | ✅    | ✅     |
| Use filters and sorting          | ✅    | ✅     |
| Export CSV / JSON                | ✅    | ✅     |
| Add new transaction              | ✅    | ❌     |
| Edit existing transaction        | ✅    | ❌     |
| Delete transaction               | ✅    | ❌     |

When the role is **Viewer**, the Add Transaction button is not rendered, and the Edit / Delete action buttons are not rendered in the table rows or mobile cards. The modal is therefore unreachable without code inspection.

---

## State Management

### AppContext

Built with `useReducer` and `useContext`. The full state shape:

```js
{
  transactions:        Transaction[],   // full list, synced to localStorage
  role:                "Admin" | "Viewer",
  filters: {
    search:   string,                   // live text search
    type:     "all" | "income" | "expense",
    category: string,                   // "all" or a specific category name
    dateFrom: string,                   // ISO date string or ""
    dateTo:   string,                   // ISO date string or ""
    sortBy:   string,                   // "date_desc" | "date_asc" | "amount_desc" | "amount_asc"
  },
  activeModal:         null | "add" | "edit",
  editingTransaction:  Transaction | null,
}
```

Derived values are computed with `useMemo` and exposed from the context provider — they are not stored in state:

```js
filteredTransactions   // applies all active filters and sort to transactions[]
summary                // { totalIncome, totalExpense, balance }
```

### Action Types

| Action                | Effect                                              |
|-----------------------|-----------------------------------------------------|
| `SET_ROLE`            | Updates the active role                             |
| `SET_FILTER`          | Merges a partial filter object into current filters |
| `RESET_FILTERS`       | Restores all filters to their default values        |
| `ADD_TRANSACTION`     | Prepends a new transaction with a generated ID      |
| `EDIT_TRANSACTION`    | Replaces the matching transaction by ID             |
| `DELETE_TRANSACTION`  | Removes the transaction with the given ID           |
| `OPEN_MODAL`          | Sets `activeModal` to `"add"` or `"edit"`         |
| `CLOSE_MODAL`         | Clears `activeModal` and `editingTransaction`       |
| `SET_EDITING`         | Stores the transaction to pre-populate the edit form|

### ThemeContext

Manages `data-theme` on `document.documentElement`. Initial value is read from `localStorage` (defaults to `"dark"`). Any change is written back to `localStorage` via `useEffect`.

### useTransactions Hook

A custom hook that reads from `AppContext` and computes chart-ready derived data:

| Return Value            | Description                                                     |
|-------------------------|-----------------------------------------------------------------|
| `transactions`          | Full unfiltered list                                            |
| `filteredTransactions`  | Filtered and sorted result                                      |
| `summary`               | Total income, expense, balance                                  |
| `monthlyData`           | Income and expense aggregated by calendar month                 |
| `categoryTotals`        | Expenses grouped by category, sorted descending by value        |
| `topCategory`           | The single highest expense category object                      |
| `recentTransactions`    | Last 5 transactions sorted by date                              |
| `lastTwoMonths`         | `{ current, previous, expenseDiff, pct }` for comparison card |

All values are memoised with `useMemo` and only recompute when `transactions` changes.

### localStorage Keys

| Key               | Stores                         |
|-------------------|--------------------------------|
| `fd_transactions` | Full transaction array (JSON)  |
| `fd_role`         | Active role string             |
| `fd_theme`        | Active theme string            |

---

## Styling System

### Principles

- **Zero inline styles** — every style declaration lives in a `.css` file
- **Component-scoped CSS** — each component has its own file; no bleed between components
- **CSS custom properties** — the entire visual system is token-driven
- **Global utilities** — `.card`, `.btn`, `.btn-primary`, `.btn-ghost`, `.badge`, `.badge-income`, `.badge-expense`, `.input-base`, `.empty-state` are defined once and reused everywhere

### Theme System

All colours, shadows, and layout dimensions are defined as CSS variables in `styles/theme.css` under two selectors:

```css
[data-theme="light"] { ... }
[data-theme="dark"]  { ... }
```

Switching themes is a single DOM attribute change — no JavaScript rerenders required for visual updates.

Key variable groups:

| Group        | Variables                                                      |
|--------------|----------------------------------------------------------------|
| Backgrounds  | `--bg-primary`, `--bg-secondary`, `--bg-card`, `--bg-sidebar`, `--bg-hover`, `--bg-input` |
| Text         | `--text-primary`, `--text-secondary`, `--text-muted`, `--text-sidebar` |
| Accents      | `--accent-primary` (orange), `--accent-green`, `--accent-red`, `--accent-blue` |
| Borders      | `--border-color`, `--border-light`                          |
| Shadows      | `--shadow-sm`, `--shadow-md`, `--shadow-lg`                |
| Layout       | `--sidebar-width` (240px), `--topbar-height` (64px)         |

### Typography

| Font      | Source       | Usage                                         |
|-----------|--------------|-----------------------------------------------|
| Syne      | Google Fonts | Headings, large stat numbers, amounts         |
| DM Sans   | Google Fonts | Body text, labels, inputs, buttons            |

### Animation System (`animations.css`)

| Class / Keyframe       | Effect                                                 |
|------------------------|--------------------------------------------------------|
| `.animate-fade-in`     | Opacity 0→1 + translateY 12px→0                       |
| `.animate-fade-in-scale`| Opacity 0→1 + scale 0.95→1                           |
| `.animate-slide-down`  | Opacity 0→1 + translateY -10px→0 (used by dropdowns)  |
| `.delay-1` → `.delay-5`| 50ms stagger delays for sequential reveals            |
| `.skeleton`            | Shimmer loading placeholder                            |
| `.hover-lift`          | translateY(-3px) + shadow on hover                     |

---

## Mock Data

### Transactions

Located in `src/data/mockData.js`:

- **60 transactions** covering January through June 2024
- **10 transactions per month** — a realistic mix of income and expenses
- Amounts are in Indian Rupees, sized realistically (salary ₹85,000/month, meals ₹450–₹3,500, bills ₹500–₹2,800)

### Categories

12 categories, each with a distinct hex colour in `CATEGORY_COLORS`:

| Category       | Category       | Category       |
|----------------|----------------|----------------|
| Food & Dining  | Transport      | Shopping       |
| Entertainment  | Health         | Utilities      |
| Salary         | Freelance      | Investment     |
| Education      | Travel         | Other          |

### Helper Functions in mockData.js

```js
getMonthlyData(transactions)
// Returns: [{ month: "2024-01", income: 107000, expense: 13599 }, ...]
// Used by: BalanceTrendChart, lastTwoMonths comparison

getCategoryTotals(transactions)
// Returns: [{ name: "Food & Dining", value: 14450 }, ...]  sorted descending
// Used by: SpendingPieChart, CategoryBreakdownCard, TopCategoryCard
```

---

## Responsiveness

| Breakpoint        | Layout Behaviour                                                                    |
|-------------------|-------------------------------------------------------------------------------------|
| > 1100px          | Full two-column chart grid; sidebar always visible; 3-column summary cards          |
| 768px – 1100px    | Charts stack vertically; summary cards stay 3-column; sidebar visible               |
| < 768px           | Sidebar slides off-canvas; hamburger button and dark overlay appear; transaction table replaced by card view |
| < 480px           | Summary cards collapse to 1-column; modal fields stack; insight grid is single-column |

The sidebar mobile behaviour uses a CSS `transform: translateX(-100%)` toggle with a `0.3s cubic-bezier` transition. The overlay uses `backdrop-filter: blur(2px)`.

---

## Utility Functions

All helpers live in `src/utils/helpers.js`:

| Function                     | Description                                                              |
|------------------------------|--------------------------------------------------------------------------|
| `formatCurrency(amount)`     | Formats a number as ₹X,XX,XXX using `Intl.NumberFormat` with `en-IN` locale |
| `formatDate(dateStr)`        | Formats ISO string as `DD Mon YYYY` (e.g. `05 Jan 2024`)              |
| `shortMonth(dateStr)`        | Returns short month name from `"2024-01"` → `"Jan"` for chart axes     |
| `generateId()`               | Creates a unique transaction ID: `"t" + timestamp + random suffix`       |
| `exportToCSV(transactions)`  | Builds a CSV string with headers and triggers a browser file download     |
| `exportToJSON(transactions)` | Serialises to formatted JSON and triggers a browser file download         |

---

## Evaluation Criteria Coverage

| Criterion              | How It Is Addressed                                                                                  |
|------------------------|------------------------------------------------------------------------------------------------------|
| Design & Creativity    | Custom Syne + DM Sans typography, warm orange accent palette, glow card effects, gradient charts, animated insight bars, full dark theme |
| Responsiveness         | Four distinct breakpoints; hamburger sidebar; card fallback for transaction table; all grids collapse gracefully on mobile |
| Functionality          | All five core requirements implemented: dashboard overview, transaction management, RBAC, insights, state management |
| User Experience        | Sticky topbar, active route highlighting, reset button only when needed, empty state messages, loading animations on every view |
| Technical Quality      | Modular component tree, custom hook for derived data, memoised selectors, no prop drilling, co-located CSS files |
| State Management       | `useReducer` with typed action constants, `useMemo` for derived data, `useEffect` for localStorage sync, two separate contexts |
| Documentation          | This README covers setup, structure, feature walkthrough, state shape, styling decisions, data schema, and evaluation mapping |
| Attention to Detail    | Form validation with inline errors, backdrop click to close modal, export reflects active filters, trend badge only renders when comparison data exists, empty states handled on every list and chart |

---

## Optional Enhancements

| Enhancement            | Status       | Notes                                                                 |
|------------------------|:------------:|-----------------------------------------------------------------------|
| Dark mode              | ✅ Included  | Full CSS variable system; toggle in topbar; persisted in localStorage |
| Data persistence       | ✅ Included  | Transactions, role, and theme all stored in localStorage              |
| Export functionality   | ✅ Included  | CSV and JSON export of the currently filtered transaction list        |
| Animations / transitions | ✅ Included | Fade-in stagger on page load, hover lift, animated bar fills, slide-down dropdowns |
| Advanced filtering     | ✅ Included  | Search + type + category + date range + sort, all combinable          |
| Mock API integration   | ❌ Not included | Static data used; the context structure is ready to swap in async fetch calls |

---

## Assumptions

- All monetary amounts are in **Indian Rupees (INR)**
- Role switching is a **frontend simulation only** — no authentication or backend is involved
- Transaction data is **mock and static** — no real financial data is processed or transmitted
- `localStorage` is the persistence layer — clearing browser storage resets the app to its default 60-transaction dataset
- The project targets **modern browsers** with ES2020+ support (Chrome, Firefox, Safari, Edge)

---

## Future Improvements

- **Backend integration** — replace localStorage with a REST or GraphQL API; the context action structure maps cleanly to CRUD endpoints
- **Real authentication** — JWT or OAuth for genuine role management and multi-user support
- **Pagination or infinite scroll** — for large transaction datasets beyond the mock 60
- **Budget goals** — set monthly spending caps per category with visual progress and breach alerts
- **Recurring transaction detection** — auto-tag transactions that repeat monthly (e.g. salary, subscriptions)
- **PDF report export** — generate a monthly summary with embedded chart screenshots
- **Push notifications** — browser notifications when a category budget threshold is exceeded
- **Multi-currency support** — live exchange rates with a selectable base currency
- **Unit and integration tests** — Vitest and React Testing Library for component and hook coverage
