import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardOverview from "@/components/finance/DashboardOverview";
import ExpenseTracker from "@/components/finance/ExpenseTracker";
import IncomeTracker from "@/components/finance/IncomeTracker";
import BudgetAssistant from "@/components/finance/BudgetAssistant";
import SavingsPlanner from "@/components/finance/SavingsPlanner";
import InvestmentCalculator from "@/components/finance/InvestmentCalculator";
import AIAdvisor from "@/components/finance/AIAdvisor";
import BillsReminder from "@/components/finance/BillsReminder";
import FinancialReports from "@/components/finance/FinancialReports";
import { Wallet, TrendingUp, PiggyBank, Target, LineChart, DollarSign, Bell, FileText, Brain } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-gradient-primary shadow-lg">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary-foreground/10 p-2.5 backdrop-blur-sm">
                <Wallet className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary-foreground">Kiro Finance</h1>
                <p className="text-sm text-primary-foreground/80">Smart Money Management • AI-Powered Insights</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid lg:grid-cols-8 bg-card shadow-sm">
            <TabsTrigger value="dashboard" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="income" className="gap-2 data-[state=active]:bg-success data-[state=active]:text-success-foreground">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Income</span>
            </TabsTrigger>
            <TabsTrigger value="expenses" className="gap-2 data-[state=active]:bg-warning data-[state=active]:text-warning-foreground">
              <Wallet className="h-4 w-4" />
              <span className="hidden sm:inline">Expenses</span>
            </TabsTrigger>
            <TabsTrigger value="investments" className="gap-2 data-[state=active]:bg-chart-3 data-[state=active]:text-primary-foreground">
              <LineChart className="h-4 w-4" />
              <span className="hidden sm:inline">Invest</span>
            </TabsTrigger>
            <TabsTrigger value="savings" className="gap-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Savings</span>
            </TabsTrigger>
            <TabsTrigger value="bills" className="gap-2 data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Bills</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="gap-2 data-[state=active]:bg-muted-foreground data-[state=active]:text-background">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Reports</span>
            </TabsTrigger>
            <TabsTrigger value="advisor" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">AI Advisor</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="income" className="space-y-6">
            <IncomeTracker />
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <ExpenseTracker />
            <BudgetAssistant />
          </TabsContent>

          <TabsContent value="investments" className="space-y-6">
            <InvestmentCalculator />
          </TabsContent>

          <TabsContent value="savings" className="space-y-6">
            <SavingsPlanner />
          </TabsContent>

          <TabsContent value="bills" className="space-y-6">
            <BillsReminder />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <FinancialReports />
          </TabsContent>

          <TabsContent value="advisor" className="space-y-6">
            <AIAdvisor />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
