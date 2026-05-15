# Prompt: Build the Streaming Dashboard Page (Post-Authentication)

---

## 🎯 Context

You are working in a React + Tailwind CSS project with the following user flow:
`Login → 2FA Authentication → **Streaming Dashboard (this page)**`

This page appears after the user successfully completes 2FA authentication (triggered by `handleVerificationSuccess` in `LoginPage.jsx`).

**Project Stack:**
- React (Vite)
- Tailwind CSS (Dark mode via `dark:` prefix)
- Default theme: Dark (`bg-[#060b14]`)
- `App.jsx` currently renders `<LoginPage />`

---

## 📁 Existing Project Structure

```
src/
├── App.jsx
├── pages/
│   └── LoginPage.jsx
├── components/
│   └── layout/
│       ├── Header.jsx       ← existing top navigation bar
│       └── Sidebar.jsx
└── features/
    ├── auth/
    │   ├── LoginForm.jsx
    │   └── TwoFactorAuth.jsx
    └── dashboard/
        ├── IntradayChart.jsx
        ├── MarketOverview.jsx
        ├── MarketStockTabs.jsx
        └── MostActiveStocks.jsx
```

---

## 🖼️ Design Reference

Design file: `Design/Streaming.png`

**Read the design image carefully before writing any code.** Reproduce it 100% pixel-perfect.

---

## 📐 Layout Overview

The Streaming Dashboard is divided into **3 main columns**:

```
┌─────────────────────────────────────────────────────────────┐
│                     TOP NAVIGATION BAR                       │
├──────────────────┬──────────────────────┬───────────────────┤
│                  │                      │                   │
│  LEFT PANEL      │   CENTER PANEL       │   RIGHT PANEL     │
│  Market Overview │   Stock Detail +     │   My Watchlist    │
│  (Stock Table)   │   Price Chart        │   + Live Trades   │
│                  │                      │                   │
├──────────────────┴──────────────────────┴───────────────────┤
│                    ORDER PANEL (Bottom)                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 Tasks

### Step 1: Create `StreamingPage.jsx`

Create `src/pages/StreamingPage.jsx` as the main layout shell for this page.

### Step 2: Create Sub-components

Create the following components inside `src/features/streaming/`:

#### 2.1 `TopNav.jsx` — Top Navigation Bar
- Tabs: **Market | Portfolio | Quote | TFEX | Click | Bids Offers | Ticker | Options Sun | Technical | More**
- Display SET index: `SET 1,440.01` with change `+28.62 (+2.11%)`
- Display SET50 index: `SET50 957.54` with change `+18.14 (+1.8893%)`
- Green "Market Open" badge
- Icons on the right: Notification, Feedback, Layout, Logout
- Background: dark navy `bg-[#0a1628]`
- Active tab has a blue/white underline indicator

#### 2.2 `StockTable.jsx` — Left Panel (Market Overview)
- Header: **"Market Overview"** with active **Most Active** button
- Sub-tabs: **Most Active | Top Gainers | Top Losers | High Volume**
- Table columns: **Symbol | Price | Change | %Chg | Volume**
- Mock stocks: AOT, CPALL, SCB, BDMS, PTT, KTB, TRUE, OR, GPSC, BTS, BEM, HMPRO, etc.
- Positive values: `text-green-400`
- Negative values: `text-red-400`
- ⭐ favorite icon in the first column
- Background: `bg-[#0a1628]`
- Very small font: `text-xs` or `text-[11px]`

#### 2.3 `StockDetail.jsx` — Center Panel (Stock Info)
- Stock name: **DELTA ⭐**
- Full name: `DELTA ELECTRONICS (THAILAND) PCL - SET`
- Category: `Technology | Electronic Components`
- Current price: **102.50 THB** (large, bold, white)
- Change: `+3.00 (+3.02%)` in green
- Buttons: Indicators, Compare, Save + icon buttons (Zoom, Download, etc.)
- Time-range tabs: **1D | 5D | 1M | 3M | 6M | YTD | 1Y | All**
- Info panel to the right of the price:
  ```
  High: 103.00        Volume: 25.6M
  Low: 99.50          Avg. Volume: 15.2M
  Market Cap: 1.27    P/E Ratio: 34.45
  Open: 99.50         Dividend Yield: 0.76%
  ```

#### 2.4 `PriceChart.jsx` — Price Chart (Center)
- Candlestick or line chart
- X-axis: months (Dec, Jan, Feb, Mar, Apr, May, Jun, Jul, Aug)
- Y-axis: price range ~50–100+
- Dark background
- Volume bars at the bottom (green/red by direction)
- Use `recharts` or `lightweight-charts`

#### 2.5 `MyWatchlist.jsx` — Right Panel (Top)
- Header: **"My Watchlist"** + Edit and View All buttons
- Tabs: **All | Tech | Bank | Other**
- Table columns: **Symbol | Price | %Chg | Volume**
- Mock stocks: DELTA, PTT, MINT, BCP, HMPRO
- Positive: green, Negative: red
- **+ Add** button at the bottom of the list

#### 2.6 `LiveTrades.jsx` — Right Panel (Bottom)
- Header: **"Live Trades"** + "Buy BTS" button
- Shows: Avg. Price, Total Volume
- **Buy | Sell** buttons (green/red) + slider
- Trade table columns: **Time | Side | Volume | Price**
- Mock data: multiple Buy/Sell entries with timestamps

#### 2.7 `OrderPanel.jsx` — Bottom Panel
- Tabs: **Place Order | Stop Order | Trailing Order | Bracket Order | DCA | Multi Orders | History**
- Order Form (Place Order tab):
  - **Order Type** dropdown: Limit
  - **Price (THB)** input: `102.5` with ▲▼ stepper buttons
  - **Volume** input: `1,000` with ▲▼ stepper + calendar icon
  - **Time in Force** dropdown: Day
  - **Condition** dropdown (empty)
  - 🔔 notification icon button
- Formula display: `Volume x Price = 1,000 x 102.5 = 6,500 THB`
- **Available Balance:** `1,245,678.00 THB`
- **BUY DELTA** button — large, prominent, bright green
- **+ Add Condition** button on the right

---

## 🎨 Color Palette (Dark Theme)

```
Page background:       #060b14  or  #0a1628
Panel background:      #0d1b2e  or  #0f2040
Border:                #1e3a8a  or  #1a3050
Primary text:          #ffffff
Secondary text:        #94a3b8  (slate-400)
Positive / Green:      #22c55e  (green-500)  or  #00c853
Negative / Red:        #ef4444  (red-500)    or  #ff1744
Active tab:            #3b82f6  (blue-500)
Buy button:            #16a34a  (green-600)  or  #00c853
Sell button:           #dc2626  (red-600)
Market Open badge:     #16a34a  (green background)
```

---

## 🔗 Integration with App.jsx

**Edit** `src/App.jsx` to support routing after successful login:

```jsx
// src/App.jsx
import React, { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import StreamingPage from './pages/StreamingPage';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  if (isAuthenticated) {
    return <StreamingPage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
  }

  return (
    <LoginPage
      isDarkMode={isDarkMode}
      setIsDarkMode={setIsDarkMode}
      onAuthSuccess={() => setIsAuthenticated(true)}
    />
  );
}

export default App;
```

**Edit** `src/pages/LoginPage.jsx`:
- Accept an `onAuthSuccess` prop
- Call `onAuthSuccess()` instead of `alert('Login Successful!')` inside `handleVerificationSuccess`

---

## ✅ Acceptance Checklist

After writing the code, verify:

- [ ] 3-column layout is correct (Left / Center / Right)
- [ ] TopNav has all tabs and SET/SET50 index values
- [ ] StockTable renders stocks with correct green/red coloring
- [ ] StockDetail shows name, price, and all info fields
- [ ] PriceChart renders a chart (use recharts if available)
- [ ] MyWatchlist and LiveTrades are positioned on the right
- [ ] OrderPanel is at the bottom with complete form fields
- [ ] BUY DELTA button is prominent, large, and bright green
- [ ] Entire page is dark mode — no unexpected white areas
- [ ] Table fonts are small (`text-xs`) matching the design
- [ ] Completing Login + 2FA navigates to this page correctly

---

## 📝 Important Notes

1. **Use mock data** — no real API needed; hardcode values from the design
2. **Pixel-perfect** — match spacing, font sizes, and colors exactly from the design image
3. **Reuse existing components** — use the existing `Header.jsx` if it matches
4. **No new CSS files** — use Tailwind utility classes only
5. **One component per file** — do not put everything in a single file
