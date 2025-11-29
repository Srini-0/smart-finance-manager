import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Bell, Trash2, CheckCircle, AlertCircle } from "lucide-react";
import { useFinanceData } from "@/hooks/useFinanceData";
import { toast } from "@/hooks/use-toast";

const BILL_CATEGORIES = [
  "Utilities",
  "Rent/Mortgage",
  "Insurance",
  "Subscriptions",
  "Credit Card",
  "Loan/EMI",
  "Phone",
  "Internet",
  "Other"
];

const BillsReminder = () => {
  const { bills, addBill, updateBill, removeBill } = useFinanceData();
  const [newBill, setNewBill] = useState({
    name: "",
    amount: "",
    dueDate: "",
    category: "",
    recurring: true
  });

  const handleAddBill = () => {
    if (!newBill.name || !newBill.amount || !newBill.dueDate || !newBill.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    addBill({
      id: Date.now().toString(),
      name: newBill.name,
      amount: parseFloat(newBill.amount),
      dueDate: newBill.dueDate,
      category: newBill.category,
      recurring: newBill.recurring,
      paid: false
    });

    setNewBill({
      name: "",
      amount: "",
      dueDate: "",
      category: "",
      recurring: true
    });

    toast({
      title: "Bill Added",
      description: "Your bill reminder has been created"
    });
  };

  const togglePaid = (id: string, currentStatus: boolean) => {
    updateBill(id, { paid: !currentStatus });
    toast({
      title: !currentStatus ? "Bill Marked as Paid" : "Bill Marked as Unpaid",
      description: "Status updated successfully"
    });
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const upcomingBills = bills
    .filter(bill => !bill.paid)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-warning/10 p-2">
            <Bell className="h-6 w-6 text-warning" />
          </div>
          <div>
            <CardTitle>Bills & EMI Reminder</CardTitle>
            <CardDescription>Never miss a payment deadline</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Bill Form */}
        <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
          <h3 className="font-semibold">Add New Bill</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="billName">Bill Name</Label>
              <Input
                id="billName"
                placeholder="e.g., Electricity Bill"
                value={newBill.name}
                onChange={(e) => setNewBill({ ...newBill, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billAmount">Amount (₹)</Label>
              <Input
                id="billAmount"
                type="number"
                placeholder="0"
                value={newBill.amount}
                onChange={(e) => setNewBill({ ...newBill, amount: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={newBill.dueDate}
                onChange={(e) => setNewBill({ ...newBill, dueDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={newBill.category} onValueChange={(value) => setNewBill({ ...newBill, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {BILL_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="recurring"
              checked={newBill.recurring}
              onCheckedChange={(checked) => setNewBill({ ...newBill, recurring: checked })}
            />
            <Label htmlFor="recurring">Recurring Bill</Label>
          </div>
          <Button onClick={handleAddBill} className="w-full">
            Add Bill Reminder
          </Button>
        </div>

        {/* Upcoming Bills */}
        <div className="space-y-4">
          <h3 className="font-semibold">Upcoming Bills</h3>
          {upcomingBills.length === 0 ? (
            <p className="text-center text-muted-foreground">No upcoming bills</p>
          ) : (
            <div className="space-y-3">
              {upcomingBills.map((bill) => {
                const daysUntil = getDaysUntilDue(bill.dueDate);
                const isOverdue = daysUntil < 0;
                const isDueSoon = daysUntil <= 3 && daysUntil >= 0;

                return (
                  <div
                    key={bill.id}
                    className={`flex items-center justify-between rounded-lg border p-4 ${
                      isOverdue ? "border-destructive bg-destructive/5" : isDueSoon ? "border-warning bg-warning/5" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {isOverdue ? (
                        <AlertCircle className="h-5 w-5 text-destructive" />
                      ) : (
                        <Bell className="h-5 w-5 text-warning" />
                      )}
                      <div>
                        <p className="font-medium">{bill.name}</p>
                        <p className="text-sm text-muted-foreground">{bill.category}</p>
                        <p className="text-sm">
                          Due: {new Date(bill.dueDate).toLocaleDateString()} 
                          {isOverdue && <span className="ml-2 text-destructive">(Overdue)</span>}
                          {isDueSoon && <span className="ml-2 text-warning">(Due Soon)</span>}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="font-bold">₹{bill.amount.toFixed(2)}</p>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => togglePaid(bill.id, bill.paid)}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeBill(bill.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Paid Bills */}
        {bills.filter(b => b.paid).length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold">Paid Bills</h3>
            <div className="space-y-3">
              {bills.filter(b => b.paid).map((bill) => (
                <div
                  key={bill.id}
                  className="flex items-center justify-between rounded-lg border bg-success/5 p-4"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <div>
                      <p className="font-medium">{bill.name}</p>
                      <p className="text-sm text-muted-foreground">{bill.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-bold text-success">₹{bill.amount.toFixed(2)}</p>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeBill(bill.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BillsReminder;
