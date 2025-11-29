import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Target, Plus, Trash2, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFinanceData } from "@/hooks/useFinanceData";

const GOAL_CATEGORIES = [
  { value: "emergency", label: "🚨 Emergency Fund", icon: "🚨" },
  { value: "travel", label: "✈️ Travel", icon: "✈️" },
  { value: "phone", label: "📱 Phone/Gadget", icon: "📱" },
  { value: "car", label: "🚗 Vehicle", icon: "🚗" },
  { value: "house", label: "🏠 House", icon: "🏠" },
  { value: "education", label: "🎓 Education", icon: "🎓" },
  { value: "other", label: "💰 Other", icon: "💰" },
];

const SavingsPlanner = () => {
  const { toast } = useToast();
  const { savingsGoals, addSavingsGoal, updateSavingsGoal, removeSavingsGoal, totalIncome, totalExpenses } =
    useFinanceData();

  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [category, setCategory] = useState("");

  const handleAddGoal = () => {
    if (!goalName || !targetAmount || !deadline || !category) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const categoryInfo = GOAL_CATEGORIES.find((c) => c.value === category);
    const newGoal = {
      id: Date.now().toString(),
      name: goalName,
      targetAmount: parseFloat(targetAmount),
      currentAmount: parseFloat(currentAmount) || 0,
      deadline,
      category,
      icon: categoryInfo?.icon || "💰",
    };

    addSavingsGoal(newGoal);
    setGoalName("");
    setTargetAmount("");
    setCurrentAmount("");
    setDeadline("");
    setCategory("");

    toast({
      title: "Goal created",
      description: `${goalName} goal added successfully`,
    });
  };

  const handleAddSavings = (goalId: string, amount: number) => {
    const goal = savingsGoals.find((g) => g.id === goalId);
    if (goal) {
      updateSavingsGoal(goalId, {
        currentAmount: goal.currentAmount + amount,
      });
      toast({
        title: "Savings added",
        description: `₹${amount} added to ${goal.name}`,
      });
    }
  };

  const monthlySavingsPotential = totalIncome - totalExpenses;

  return (
    <div className="space-y-6">
      {/* Add Goal Form */}
      <Card className="bg-gradient-card p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-foreground">Create Savings Goal</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-2">
            <Label htmlFor="goal-name">Goal Name</Label>
            <Input
              id="goal-name"
              placeholder="New iPhone"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="target-amount">Target Amount (₹)</Label>
            <Input
              id="target-amount"
              type="number"
              placeholder="100000"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="current-amount">Current Savings (₹)</Label>
            <Input
              id="current-amount"
              type="number"
              placeholder="10000"
              value={currentAmount}
              onChange={(e) => setCurrentAmount(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deadline">Target Date</Label>
            <Input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {GOAL_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="rounded-lg bg-primary/5 p-3">
            <p className="text-sm text-muted-foreground">
              Monthly Savings Potential: <span className="font-semibold text-success">₹{monthlySavingsPotential.toLocaleString()}</span>
            </p>
          </div>
          <Button onClick={handleAddGoal} className="gap-2">
            <Plus className="h-4 w-4" />
            Create Goal
          </Button>
        </div>
      </Card>

      {/* Goals List */}
      <div className="grid gap-6 lg:grid-cols-2">
        {savingsGoals.length === 0 ? (
          <Card className="col-span-2 bg-gradient-card p-12 shadow-md">
            <div className="flex flex-col items-center justify-center text-center">
              <Target className="mb-4 h-16 w-16 text-muted-foreground" />
              <h3 className="mb-2 text-xl font-semibold text-foreground">No Savings Goals Yet</h3>
              <p className="text-muted-foreground">
                Start building your future by creating your first savings goal above!
              </p>
            </div>
          </Card>
        ) : (
          savingsGoals.map((goal) => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            const remaining = goal.targetAmount - goal.currentAmount;
            const deadlineDate = new Date(goal.deadline);
            const today = new Date();
            const daysLeft = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            const monthlyRequired = daysLeft > 0 ? remaining / (daysLeft / 30) : remaining;

            return (
              <Card key={goal.id} className="bg-gradient-card p-6 shadow-md">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-3 text-2xl">{goal.icon}</div>
                    <div>
                      <h3 className="font-semibold text-foreground">{goal.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Target: ₹{goal.targetAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSavingsGoal(goal.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <Progress value={Math.min(progress, 100)} className="h-3" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      ₹{goal.currentAmount.toLocaleString()} saved
                    </span>
                    <span className="font-semibold text-success">{progress.toFixed(1)}%</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-background p-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Remaining</p>
                    <p className="font-semibold text-foreground">₹{remaining.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Days Left</p>
                    <p className="font-semibold text-foreground">{daysLeft > 0 ? daysLeft : 0} days</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-muted-foreground">Monthly Required</p>
                    <p className="font-semibold text-primary">₹{monthlyRequired.toFixed(0)}/month</p>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Input
                    type="number"
                    placeholder="Amount"
                    id={`add-savings-${goal.id}`}
                  />
                  <Button
                    onClick={() => {
                      const input = document.getElementById(`add-savings-${goal.id}`) as HTMLInputElement;
                      const amount = parseFloat(input.value);
                      if (amount > 0) {
                        handleAddSavings(goal.id, amount);
                        input.value = "";
                      }
                    }}
                    className="gap-2"
                  >
                    <TrendingUp className="h-4 w-4" />
                    Add
                  </Button>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SavingsPlanner;
