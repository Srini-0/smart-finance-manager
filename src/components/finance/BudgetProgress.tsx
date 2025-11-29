import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useFinanceData } from "@/hooks/useFinanceData";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

interface BudgetProgressProps {
  budgetLimits: Record<string, number>;
}

const CATEGORIES = [
  { id: "food", name: "Food & Dining", icon: "🍔" },
  { id: "transport", name: "Transport", icon: "🚗" },
  { id: "shopping", name: "Shopping", icon: "🛍️" },
  { id: "bills", name: "Bills", icon: "📱" },
  { id: "entertainment", name: "Entertainment", icon: "🎬" },
];

const BudgetProgress = ({ budgetLimits }: BudgetProgressProps) => {
  const { expenses } = useFinanceData();

  const getCategorySpending = (categoryId: string) => {
    return expenses
      .filter((e) => e.category === categoryId)
      .reduce((sum, e) => sum + e.amount, 0);
  };

  const activeBudgets = CATEGORIES.filter((cat) => budgetLimits[cat.id] > 0);

  if (activeBudgets.length === 0) {
    return (
      <Card className="bg-gradient-card p-6 shadow-md">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Budget Progress</h3>
        <div className="flex h-[300px] items-center justify-center">
          <p className="text-muted-foreground">Set budgets to track progress</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card p-6 shadow-md">
      <h3 className="mb-4 text-lg font-semibold text-foreground">Budget Progress</h3>
      <div className="space-y-4">
        {activeBudgets.map((category) => {
          const limit = budgetLimits[category.id];
          const spent = getCategorySpending(category.id);
          const percentage = (spent / limit) * 100;
          const isOverBudget = percentage > 100;
          const isNearLimit = percentage > 80 && !isOverBudget;

          return (
            <div key={category.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>{category.icon}</span>
                  <span className="text-sm font-medium text-foreground">{category.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {isOverBudget && <AlertTriangle className="h-4 w-4 text-destructive" />}
                  {!isOverBudget && percentage > 0 && percentage <= 100 && (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  )}
                  <span className="text-sm font-semibold text-foreground">
                    ₹{spent.toLocaleString()} / ₹{limit.toLocaleString()}
                  </span>
                </div>
              </div>
              <Progress
                value={Math.min(percentage, 100)}
                className={
                  isOverBudget
                    ? "[&>div]:bg-destructive"
                    : isNearLimit
                    ? "[&>div]:bg-warning"
                    : "[&>div]:bg-success"
                }
              />
              {isOverBudget && (
                <p className="text-xs text-destructive">
                  Over budget by ₹{(spent - limit).toLocaleString()}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default BudgetProgress;
