import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, TrendingUp, Wallet, PiggyBank, LineChart } from "lucide-react";
import { useFinanceData } from "@/hooks/useFinanceData";
import ExpenseChart from "./ExpenseChart";
import BudgetProgress from "./BudgetProgress";
import TransactionHistory from "./TransactionHistory";

const DashboardOverview = () => {
  const { totalIncome, totalExpenses, balance, expenses, budgetLimits, totalSavings, totalInvestments, savingsGoals, investments } = useFinanceData();
  
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;
  const netWorth = balance + totalSavings + totalInvestments;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Card className="bg-gradient-card p-5 shadow-md border-l-4 border-l-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Net Worth</p>
              <p className="text-2xl font-bold text-foreground mt-1">₹{netWorth.toLocaleString()}</p>
            </div>
            <div className="rounded-full bg-primary/10 p-2.5">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-card p-5 shadow-md border-l-4 border-l-success">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Income</p>
              <p className="text-2xl font-bold text-success mt-1">₹{totalIncome.toLocaleString()}</p>
            </div>
            <div className="rounded-full bg-success/10 p-2.5">
              <ArrowUpRight className="h-5 w-5 text-success" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-card p-5 shadow-md border-l-4 border-l-warning">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Expenses</p>
              <p className="text-2xl font-bold text-warning mt-1">₹{totalExpenses.toLocaleString()}</p>
            </div>
            <div className="rounded-full bg-warning/10 p-2.5">
              <ArrowDownRight className="h-5 w-5 text-warning" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-card p-5 shadow-md border-l-4 border-l-accent">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Savings</p>
              <p className="text-2xl font-bold text-accent mt-1">₹{totalSavings.toLocaleString()}</p>
            </div>
            <div className="rounded-full bg-accent/10 p-2.5">
              <PiggyBank className="h-5 w-5 text-accent" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-card p-5 shadow-md border-l-4 border-l-chart-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Investments</p>
              <p className="text-2xl font-bold text-chart-3 mt-1">₹{totalInvestments.toLocaleString()}</p>
            </div>
            <div className="rounded-full bg-chart-3/10 p-2.5">
              <LineChart className="h-5 w-5 text-chart-3" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-card p-5 shadow-md border-l-4 border-l-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Savings Rate</p>
              <p className="text-2xl font-bold text-primary mt-1">{savingsRate.toFixed(1)}%</p>
            </div>
            <div className="rounded-full bg-primary/10 p-2.5">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-muted-foreground">Active Goals:</span>
            <span className="font-semibold">{savingsGoals.length}</span>
          </div>
        </Card>
        <Card className="p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-chart-3 animate-pulse" />
            <span className="text-sm text-muted-foreground">Active Investments:</span>
            <span className="font-semibold">{investments.length}</span>
          </div>
        </Card>
        <Card className="p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-warning animate-pulse" />
            <span className="text-sm text-muted-foreground">Transactions:</span>
            <span className="font-semibold">{expenses.length}</span>
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ExpenseChart />
        <BudgetProgress budgetLimits={budgetLimits} />
      </div>

      {/* Transaction History */}
      <TransactionHistory />
    </div>
  );
};

export default DashboardOverview;
