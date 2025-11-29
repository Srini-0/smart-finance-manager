import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useFinanceData } from "@/hooks/useFinanceData";
import { PiggyBank, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const BUDGET_CATEGORIES = [
  { id: "food", name: "Food & Dining", icon: "🍔", suggested: 30 },
  { id: "transport", name: "Transport", icon: "🚗", suggested: 15 },
  { id: "shopping", name: "Shopping", icon: "🛍️", suggested: 20 },
  { id: "bills", name: "Bills & Utilities", icon: "📱", suggested: 15 },
  { id: "entertainment", name: "Entertainment", icon: "🎬", suggested: 10 },
  { id: "other", name: "Other", icon: "📦", suggested: 10 },
];

const BudgetAssistant = () => {
  const { toast } = useToast();
  const { budgetLimits, setBudgetLimit, totalIncome, expenses } = useFinanceData();
  const [monthlyIncome, setMonthlyIncome] = useState(totalIncome.toString());

  const handleSetBudget = (categoryId: string, percentage: number) => {
    const income = parseFloat(monthlyIncome) || totalIncome;
    const amount = (income * percentage) / 100;
    setBudgetLimit(categoryId, amount);
    
    toast({
      title: "Budget updated",
      description: `${categoryId} budget set to ₹${amount.toLocaleString()}`,
    });
  };

  const handleApply5030Rule = () => {
    const income = parseFloat(monthlyIncome) || totalIncome;
    
    setBudgetLimit("needs", income * 0.5); // 50% for needs
    setBudgetLimit("wants", income * 0.3); // 30% for wants
    setBudgetLimit("savings", income * 0.2); // 20% for savings
    
    // Distribute needs budget
    setBudgetLimit("food", income * 0.15);
    setBudgetLimit("transport", income * 0.10);
    setBudgetLimit("bills", income * 0.25);
    
    // Distribute wants budget
    setBudgetLimit("shopping", income * 0.15);
    setBudgetLimit("entertainment", income * 0.15);
    
    toast({
      title: "50-30-20 Rule Applied",
      description: "Budget distributed: 50% needs, 30% wants, 20% savings",
    });
  };

  const getCategorySpending = (categoryId: string) => {
    return expenses
      .filter((e) => e.category === categoryId)
      .reduce((sum, e) => sum + e.amount, 0);
  };

  return (
    <div className="space-y-6">
      {/* Budget Setup */}
      <Card className="bg-gradient-card p-6 shadow-md">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Budget Assistant</h2>
            <p className="text-sm text-muted-foreground">
              Manage your spending limits using the 50-30-20 rule
            </p>
          </div>
          <PiggyBank className="h-8 w-8 text-primary" />
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="monthly-income">Monthly Income (₹)</Label>
            <Input
              id="monthly-income"
              type="number"
              placeholder="50000"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button onClick={handleApply5030Rule} className="w-full gap-2">
              <PiggyBank className="h-4 w-4" />
              Apply 50-30-20 Rule
            </Button>
          </div>
        </div>

        <div className="rounded-lg bg-primary/5 p-4">
          <h3 className="mb-2 font-medium text-foreground">The 50-30-20 Rule</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• 50% for Needs (rent, bills, food)</li>
            <li>• 30% for Wants (shopping, entertainment)</li>
            <li>• 20% for Savings & Investments</li>
          </ul>
        </div>
      </Card>

      {/* Category Budgets */}
      <Card className="bg-gradient-card p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-foreground">Category Budgets</h2>
        <div className="grid gap-4">
          {BUDGET_CATEGORIES.map((category) => {
            const limit = budgetLimits[category.id] || 0;
            const spent = getCategorySpending(category.id);
            const percentage = limit > 0 ? (spent / limit) * 100 : 0;
            const isOverBudget = percentage > 100;

            return (
              <div key={category.id} className="space-y-3 rounded-lg border border-border bg-background p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{category.icon}</span>
                    <div>
                      <p className="font-medium text-foreground">{category.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Suggested: {category.suggested}% of income
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {limit > 0 ? (
                      <>
                        <p className="font-semibold text-foreground">
                          ₹{spent.toLocaleString()} / ₹{limit.toLocaleString()}
                        </p>
                        {isOverBudget && (
                          <div className="flex items-center gap-1 text-xs text-destructive">
                            <AlertTriangle className="h-3 w-3" />
                            Over budget!
                          </div>
                        )}
                      </>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSetBudget(category.id, category.suggested)}
                      >
                        Set Budget
                      </Button>
                    )}
                  </div>
                </div>
                {limit > 0 && (
                  <Progress
                    value={Math.min(percentage, 100)}
                    className={isOverBudget ? "[&>div]:bg-destructive" : "[&>div]:bg-success"}
                  />
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default BudgetAssistant;
