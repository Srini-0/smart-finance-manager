import { Card } from "@/components/ui/card";
import { useFinanceData } from "@/hooks/useFinanceData";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const COLORS = {
  food: "hsl(var(--chart-1))",
  transport: "hsl(var(--chart-2))",
  shopping: "hsl(var(--chart-3))",
  bills: "hsl(var(--chart-4))",
  entertainment: "hsl(var(--chart-5))",
  other: "hsl(var(--chart-1))",
};

const ExpenseChart = () => {
  const { expenses } = useFinanceData();

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(categoryTotals).map(([category, amount]) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    value: amount,
    color: COLORS[category as keyof typeof COLORS],
  }));

  if (chartData.length === 0) {
    return (
      <Card className="bg-gradient-card p-6 shadow-md">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Expense Breakdown</h3>
        <div className="flex h-[300px] items-center justify-center">
          <p className="text-muted-foreground">No expenses to display</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card p-6 shadow-md">
      <h3 className="mb-4 text-lg font-semibold text-foreground">Expense Breakdown</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ExpenseChart;
