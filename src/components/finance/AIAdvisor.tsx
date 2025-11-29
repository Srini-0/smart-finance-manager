import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Loader2, Sparkles, TrendingUp, PiggyBank, AlertCircle, CheckCircle2 } from "lucide-react";
import { useFinanceData } from "@/hooks/useFinanceData";
import { toast } from "@/hooks/use-toast";

const AIAdvisor = () => {
  const [advice, setAdvice] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { expenses, incomes, savingsGoals, investments, budgetLimits, totalIncome, totalExpenses, totalSavings, totalInvestments } = useFinanceData();

  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;
  const netWorth = (totalIncome - totalExpenses) + totalSavings + totalInvestments;

  const generateAdvice = () => {
    let adviceText = "📊 Financial Analysis & Recommendations:\n\n";

    // Income vs Expenses Analysis
    if (totalExpenses > totalIncome) {
      adviceText += "⚠️ URGENT: Your expenses exceed your income by ₹" + (totalExpenses - totalIncome).toLocaleString() + ".\n";
      adviceText += "• Review and cut non-essential expenses immediately\n";
      adviceText += "• Consider additional income sources\n\n";
    } else if (savingsRate < 20) {
      adviceText += "💡 Your savings rate is " + savingsRate.toFixed(1) + "%, which is below the recommended 20%.\n";
      adviceText += "• Try to increase savings by reducing discretionary spending\n";
      adviceText += "• Aim to save at least 20% of your income\n\n";
    } else {
      adviceText += "✅ Great job! Your savings rate of " + savingsRate.toFixed(1) + "% is healthy.\n";
      adviceText += "• Keep maintaining this discipline\n\n";
    }

    // Expense Analysis
    if (expenses.length > 0) {
      const categoryTotals: Record<string, number> = {};
      expenses.forEach(exp => {
        categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
      });
      
      const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
      if (topCategory) {
        adviceText += "💸 Spending Insights:\n";
        adviceText += "• Your highest spending category is '" + topCategory[0] + "' at ₹" + topCategory[1].toLocaleString() + "\n";
        
        const budgetLimit = budgetLimits[topCategory[0]];
        if (budgetLimit && topCategory[1] > budgetLimit) {
          adviceText += "• You've exceeded your budget for " + topCategory[0] + " by ₹" + (topCategory[1] - budgetLimit).toLocaleString() + "\n";
        }
        adviceText += "\n";
      }
    }

    // Savings Goals
    if (savingsGoals.length > 0) {
      adviceText += "🎯 Savings Goals Progress:\n";
      savingsGoals.forEach(goal => {
        const progress = (goal.currentAmount / goal.targetAmount) * 100;
        adviceText += "• " + goal.name + ": " + progress.toFixed(1) + "% complete\n";
        
        if (progress < 50) {
          const remaining = goal.targetAmount - goal.currentAmount;
          adviceText += "  Consider allocating ₹" + Math.ceil(remaining / 12).toLocaleString() + "/month to reach your goal\n";
        }
      });
      adviceText += "\n";
    }

    // Investment Advice
    if (totalInvestments === 0 && totalSavings > 50000) {
      adviceText += "📈 Investment Opportunity:\n";
      adviceText += "• You have ₹" + totalSavings.toLocaleString() + " in savings\n";
      adviceText += "• Consider investing a portion for better returns\n";
      adviceText += "• Start with low-risk options like index funds or SIPs\n\n";
    } else if (totalInvestments > 0) {
      adviceText += "📈 Investment Portfolio:\n";
      adviceText += "• Current investments: ₹" + totalInvestments.toLocaleString() + "\n";
      adviceText += "• Continue regular investments for long-term wealth building\n\n";
    }

    // General Recommendations
    adviceText += "💪 Action Items:\n";
    adviceText += "1. Track all expenses daily for better awareness\n";
    adviceText += "2. Build an emergency fund covering 6 months of expenses\n";
    adviceText += "3. Review and optimize subscriptions and recurring expenses\n";
    adviceText += "4. Set specific financial goals with deadlines\n";
    adviceText += "5. Diversify investments across different asset classes";

    return adviceText;
  };

  const getAdvice = async () => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const generatedAdvice = generateAdvice();
      setAdvice(generatedAdvice);
      
      toast({
        title: "Analysis Complete",
        description: "Your personalized financial advice is ready!",
      });
    } catch (error) {
      console.error("Error generating financial advice:", error);
      toast({
        title: "Error",
        description: "Failed to generate financial advice. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4 shadow-sm border-l-4 border-l-primary">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Net Worth</p>
              <p className="font-bold text-lg">₹{netWorth.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 shadow-sm border-l-4 border-l-success">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <div>
              <p className="text-xs text-muted-foreground">Savings Rate</p>
              <p className="font-bold text-lg">{savingsRate.toFixed(1)}%</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 shadow-sm border-l-4 border-l-accent">
          <div className="flex items-center gap-3">
            <PiggyBank className="h-5 w-5 text-accent" />
            <div>
              <p className="text-xs text-muted-foreground">Total Savings</p>
              <p className="font-bold text-lg">₹{totalSavings.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 shadow-sm border-l-4 border-l-chart-3">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-chart-3" />
            <div>
              <p className="text-xs text-muted-foreground">Investments</p>
              <p className="font-bold text-lg">₹{totalInvestments.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* AI Advisor Card */}
      <Card className="shadow-lg border-t-4 border-t-primary">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-gradient-primary p-3">
              <Brain className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-xl">Smart AI Financial Advisor</CardTitle>
              <CardDescription className="mt-1">
                Get personalized financial advice powered by AI based on your spending patterns, savings, and investments
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Quick Tips */}
          {!advice && (
            <div className="grid gap-3 md:grid-cols-3">
              <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-4">
                <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Spending Analysis</p>
                  <p className="text-xs text-muted-foreground mt-1">Identify areas where you can cut back</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-4">
                <PiggyBank className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Savings Tips</p>
                  <p className="text-xs text-muted-foreground mt-1">Optimize your savings strategy</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-4">
                <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Investment Advice</p>
                  <p className="text-xs text-muted-foreground mt-1">Smart investment recommendations</p>
                </div>
              </div>
            </div>
          )}

          <Button 
            onClick={getAdvice} 
            disabled={loading}
            size="lg"
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing your finances...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Get Personalized Financial Advice
              </>
            )}
          </Button>

          {advice && (
            <div className="rounded-xl border-2 border-primary/20 bg-gradient-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-primary">AI Recommendations</h3>
              </div>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-foreground leading-relaxed">{advice}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAdvisor;
