import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFinanceData } from "@/hooks/useFinanceData";

const CATEGORIES = [
  { value: "food", label: "🍔 Food & Dining", color: "chart-1" },
  { value: "transport", label: "🚗 Transport", color: "chart-2" },
  { value: "shopping", label: "🛍️ Shopping", color: "chart-3" },
  { value: "bills", label: "📱 Bills & Utilities", color: "chart-4" },
  { value: "entertainment", label: "🎬 Entertainment", color: "chart-5" },
  { value: "other", label: "📦 Other", color: "chart-1" },
];

const ExpenseTracker = () => {
  const { toast } = useToast();
  const { expenses, addExpense, removeExpense } = useFinanceData();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleAddExpense = () => {
    if (!amount || !category) {
      toast({
        title: "Missing information",
        description: "Please enter amount and category",
        variant: "destructive",
      });
      return;
    }

    const newExpense = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      category,
      description: description || "Expense",
      date: new Date().toISOString(),
    };

    addExpense(newExpense);
    setAmount("");
    setCategory("");
    setDescription("");

    toast({
      title: "Expense added",
      description: `₹${amount} added to ${category}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Add Expense Form */}
      <Card className="bg-gradient-card p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-foreground">Add New Expense</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="1000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Lunch at restaurant"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button onClick={handleAddExpense} className="w-full gap-2">
              <Plus className="h-4 w-4" />
              Add Expense
            </Button>
          </div>
        </div>
      </Card>

      {/* Expense List */}
      <Card className="bg-gradient-card p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-foreground">Recent Expenses</h2>
        {expenses.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground">
            No expenses yet. Add your first expense above!
          </p>
        ) : (
          <div className="space-y-3">
            {expenses
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((expense) => {
                const categoryInfo = CATEGORIES.find((c) => c.value === expense.category);
                return (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between rounded-lg border border-border bg-background p-4 transition-all hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full bg-${categoryInfo?.color}`}></div>
                      <div>
                        <p className="font-medium text-foreground">{expense.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {categoryInfo?.label} • {new Date(expense.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-lg font-semibold text-destructive">
                        -₹{expense.amount.toLocaleString()}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeExpense(expense.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ExpenseTracker;
