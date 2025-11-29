import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download } from "lucide-react";
import { useFinanceData } from "@/hooks/useFinanceData";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "@/hooks/use-toast";

const FinancialReports = () => {
  const { expenses, incomes, investments, savingsGoals, transactions } = useFinanceData();
  const [reportType, setReportType] = useState("monthly");

  const generatePDF = () => {
    const doc = new jsPDF();
    const today = new Date();
    const reportTitle = reportType === "monthly" ? "Monthly Financial Report" : "Yearly Financial Report";

    // Add title and branding
    doc.setFontSize(24);
    doc.setTextColor(139, 92, 246); // Primary purple color
    doc.text("Kiro Finance", 105, 15, { align: "center" });
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text(reportTitle, 105, 25, { align: "center" });
    doc.setFontSize(10);
    doc.text(`Generated on: ${today.toLocaleDateString()}`, 105, 32, { align: "center" });

    // Summary Section
    const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const totalSavings = savingsGoals.reduce((sum, g) => sum + g.currentAmount, 0);
    const totalInvestments = investments.reduce((sum, i) => sum + i.amount, 0);
    const balance = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? ((totalSavings / totalIncome) * 100).toFixed(1) : "0";

    doc.setFontSize(14);
    doc.text("Financial Summary", 14, 42);
    
    autoTable(doc, {
      startY: 47,
      head: [["Metric", "Amount (₹)"]],
      body: [
        ["Total Income", totalIncome.toFixed(2)],
        ["Total Expenses", totalExpenses.toFixed(2)],
        ["Balance", balance.toFixed(2)],
        ["Total Savings", totalSavings.toFixed(2)],
        ["Total Investments", totalInvestments.toFixed(2)],
        ["Savings Rate", `${savingsRate}%`],
      ],
    });

    // Expense Breakdown
    const expenseByCategory = expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {} as Record<string, number>);

    doc.addPage();
    doc.setFontSize(14);
    doc.text("Expense Breakdown", 14, 15);
    
    autoTable(doc, {
      startY: 20,
      head: [["Category", "Amount (₹)", "Percentage"]],
      body: Object.entries(expenseByCategory).map(([cat, amt]) => [
        cat,
        amt.toFixed(2),
        `${((amt / totalExpenses) * 100).toFixed(1)}%`
      ]),
    });

    // Income Sources
    const incomeByType = incomes.reduce((acc, i) => {
      acc[i.type] = (acc[i.type] || 0) + i.amount;
      return acc;
    }, {} as Record<string, number>);

    let finalY = (doc as any).lastAutoTable.finalY + 15;
    doc.setFontSize(14);
    doc.text("Income Sources", 14, finalY);
    
    autoTable(doc, {
      startY: finalY + 5,
      head: [["Source", "Amount (₹)"]],
      body: Object.entries(incomeByType).map(([type, amt]) => [
        type,
        amt.toFixed(2)
      ]),
    });

    // Savings Goals Progress
    if (savingsGoals.length > 0) {
      doc.addPage();
      doc.setFontSize(14);
      doc.text("Savings Goals Progress", 14, 15);
      
      autoTable(doc, {
        startY: 20,
        head: [["Goal", "Target", "Current", "Progress"]],
        body: savingsGoals.map(goal => [
          goal.name,
          `₹${goal.targetAmount.toFixed(2)}`,
          `₹${goal.currentAmount.toFixed(2)}`,
          `${((goal.currentAmount / goal.targetAmount) * 100).toFixed(1)}%`
        ]),
      });
    }

    // Investment Portfolio
    if (investments.length > 0) {
      finalY = (doc as any).lastAutoTable.finalY + 15;
      if (finalY > 250) {
        doc.addPage();
        finalY = 15;
      }
      
      doc.setFontSize(14);
      doc.text("Investment Portfolio", 14, finalY);
      
      autoTable(doc, {
        startY: finalY + 5,
        head: [["Investment", "Type", "Amount", "Returns"]],
        body: investments.map(inv => [
          inv.name,
          inv.type,
          `₹${inv.amount.toFixed(2)}`,
          `${inv.returns.toFixed(1)}%`
        ]),
      });
    }

    // Recent Transactions
    const recentTransactions = transactions.slice(-10).reverse();
    if (recentTransactions.length > 0) {
      doc.addPage();
      doc.setFontSize(14);
      doc.text("Recent Transactions", 14, 15);
      
      autoTable(doc, {
        startY: 20,
        head: [["Date", "Type", "Description", "Amount"]],
        body: recentTransactions.map(t => [
          new Date(t.date).toLocaleDateString(),
          t.type.charAt(0).toUpperCase() + t.type.slice(1),
          t.description,
          `₹${t.amount.toFixed(2)}`
        ]),
      });
    }

    // Save PDF
    const filename = `financial-report-${reportType}-${today.toISOString().split('T')[0]}.pdf`;
    doc.save(filename);

    toast({
      title: "Report Generated",
      description: `Your ${reportType} report has been downloaded successfully`,
    });
  };

  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-accent/10 p-2">
            <FileText className="h-6 w-6 text-accent" />
          </div>
          <div>
            <CardTitle>Financial Reports</CardTitle>
            <CardDescription>Generate detailed reports with PDF export</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Report Type</label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly Report</SelectItem>
                <SelectItem value="yearly">Yearly Report</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={generatePDF} className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Download {reportType === "monthly" ? "Monthly" : "Yearly"} Report (PDF)
          </Button>
        </div>

        <div className="rounded-lg border bg-muted/30 p-4">
          <h3 className="mb-3 font-semibold">Report Includes:</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Income vs Expenses comparison</li>
            <li>• Savings progress and rate</li>
            <li>• Investment returns analysis</li>
            <li>• Spending trends by category</li>
            <li>• Savings goals progress</li>
            <li>• Recent transaction history</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialReports;
