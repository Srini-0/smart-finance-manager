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
import { Plus, Trash2, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFinanceData } from "@/hooks/useFinanceData";

const INCOME_TYPES = [
  { value: "salary", label: "💼 Salary", color: "success" },
  { value: "freelance", label: "💻 Freelance", color: "chart-2" },
  { value: "business", label: "🏢 Business", color: "chart-3" },
  { value: "investment", label: "📈 Investment", color: "accent" },
  { value: "other", label: "💰 Other", color: "chart-4" },
];

const IncomeTracker = () => {
  const { toast } = useToast();
  const { incomes, addIncome, removeIncome } = useFinanceData();
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [source, setSource] = useState("");

  const handleAddIncome = () => {
    if (!amount || !type) {
      toast({
        title: "Missing information",
        description: "Please enter amount and income type",
        variant: "destructive",
      });
      return;
    }

    const newIncome = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      type,
      source: source || "Income",
      date: new Date().toISOString(),
    };

    addIncome(newIncome);
    setAmount("");
    setType("");
    setSource("");

    toast({
      title: "Income added",
      description: `₹${amount} added to income`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Add Income Form */}
      <Card className="bg-gradient-card p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-foreground">Add Income Source</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="income-amount">Amount (₹)</Label>
            <Input
              id="income-amount"
              type="number"
              placeholder="50000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="income-type">Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger id="income-type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {INCOME_TYPES.map((incomeType) => (
                  <SelectItem key={incomeType.value} value={incomeType.value}>
                    {incomeType.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Input
              id="source"
              placeholder="Company name or project"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button onClick={handleAddIncome} className="w-full gap-2 bg-success hover:bg-success/90">
              <Plus className="h-4 w-4" />
              Add Income
            </Button>
          </div>
        </div>
      </Card>

      {/* Income List */}
      <Card className="bg-gradient-card p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-foreground">Income Sources</h2>
        {incomes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Briefcase className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-center text-muted-foreground">
              No income sources yet. Add your first income above!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {incomes
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((income) => {
                const typeInfo = INCOME_TYPES.find((t) => t.value === income.type);
                return (
                  <div
                    key={income.id}
                    className="flex items-center justify-between rounded-lg border border-border bg-background p-4 transition-all hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full bg-${typeInfo?.color}`}></div>
                      <div>
                        <p className="font-medium text-foreground">{income.source}</p>
                        <p className="text-sm text-muted-foreground">
                          {typeInfo?.label} • {new Date(income.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-lg font-semibold text-success">
                        +₹{income.amount.toLocaleString()}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeIncome(income.id)}
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

export default IncomeTracker;
