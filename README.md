# Kiro Finance - Smart Personal Finance Manager

A modern, privacy-first personal finance management application built with React, TypeScript, and Tailwind CSS. All your financial data stays on your device - no servers, no tracking, no compromises.

## Features

- **Dashboard Overview** - Track your financial health at a glance
- **Income Tracking** - Monitor all income sources
- **Expense Management** - Track and categorize expenses with smart budgeting
- **Investment Calculator** - Plan your investment strategy with SIP calculators
- **Savings Goals** - Set and track savings targets with visual progress
- **Bills Reminder** - Never miss a payment with smart reminders
- **Financial Reports** - Generate detailed PDF reports
- **AI Advisor** - Get personalized financial insights and recommendations
- **Transaction History** - Complete audit trail of all financial activities

## Tech Stack

- **Vite** - Lightning-fast build tool
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful, accessible UI components
- **React Router** - Client-side routing
- **React Query** - Powerful data synchronization
- **Recharts** - Interactive data visualization
- **date-fns** - Modern date utility library
- **jsPDF** - PDF generation for reports

## Getting Started

### Prerequisites

- Node.js 18+ and npm installed
  
### Installation

```sh
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:8080`

## Project Structure

```
src/
├── components/
│   ├── finance/      # Finance-related components
│   │   ├── DashboardOverview.tsx
│   │   ├── ExpenseTracker.tsx
│   │   ├── IncomeTracker.tsx
│   │   ├── BudgetAssistant.tsx
│   │   ├── SavingsPlanner.tsx
│   │   ├── InvestmentCalculator.tsx
│   │   ├── BillsReminder.tsx
│   │   ├── FinancialReports.tsx
│   │   ├── AIAdvisor.tsx
│   │   └── TransactionHistory.tsx
│   └── ui/           # Reusable UI components (shadcn/ui)
├── hooks/            # Custom React hooks
│   └── useFinanceData.ts
├── pages/            # Page components
│   ├── Index.tsx
│   └── NotFound.tsx
├── lib/              # Utility functions
└── App.tsx           # Main app component
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## Data Storage

All financial data is stored locally in your browser's localStorage, ensuring:
- Complete privacy - your data never leaves your device
- Instant access - no network latency
- Offline functionality - works without internet
- No account required - start using immediately

## Features in Detail

### Dashboard
Get a comprehensive overview of your financial health with real-time metrics including net worth, income, expenses, savings rate, and investment portfolio.

### Expense Tracking
Categorize and track all your expenses with visual charts and budget limits. Set category-wise budgets and get alerts when approaching limits.

### Income Management
Track multiple income sources including salary, freelance, investments, and other sources with detailed categorization.

### Savings Goals
Create and track multiple savings goals with target amounts, deadlines, and visual progress indicators. Perfect for planning vacations, emergency funds, or major purchases.

### Investment Calculator
Calculate SIP returns, lump sum investments, and compare different investment scenarios with interactive calculators.

### AI Financial Advisor
Get personalized financial advice based on your spending patterns, savings rate, and financial goals. Receive actionable recommendations to improve your financial health.

### Transaction History
Complete audit trail of all financial activities with filtering, sorting, and search capabilities.

## Privacy & Security

- All data stored locally in browser
- No external API calls for data storage
- No user accounts or authentication required
- Export your data anytime as PDF reports

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Acknowledgments

Built with using modern web technologies and best practices.

---

**Demo Video** - 

link : https://limewire.com/d/lrusu#Fy55oo5C87



