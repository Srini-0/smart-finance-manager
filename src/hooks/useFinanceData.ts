import { useState, useEffect } from "react";

export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface Income {
  id: string;
  amount: number;
  type: string;
  source: string;
  date: string;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  icon: string;
}

export interface Investment {
  id: string;
  name: string;
  type: string;
  amount: number;
  returns: number;
  date: string;
}

export interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  category: string;
  recurring: boolean;
  paid: boolean;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'investment' | 'savings';
  amount: number;
  description: string;
  date: string;
  category?: string;
}

const STORAGE_KEYS = {
  EXPENSES: "finance-expenses",
  INCOMES: "finance-incomes",
  BUDGETS: "finance-budgets",
  SAVINGS_GOALS: "finance-savings-goals",
  INVESTMENTS: "finance-investments",
  BILLS: "finance-bills",
  TRANSACTIONS: "finance-transactions",
};

export const useFinanceData = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [budgetLimits, setBudgetLimits] = useState<Record<string, number>>({});
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedExpenses = localStorage.getItem(STORAGE_KEYS.EXPENSES);
      const savedIncomes = localStorage.getItem(STORAGE_KEYS.INCOMES);
      const savedBudgets = localStorage.getItem(STORAGE_KEYS.BUDGETS);
      const savedSavingsGoals = localStorage.getItem(STORAGE_KEYS.SAVINGS_GOALS);
      const savedInvestments = localStorage.getItem(STORAGE_KEYS.INVESTMENTS);
      const savedBills = localStorage.getItem(STORAGE_KEYS.BILLS);
      const savedTransactions = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);

      if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
      if (savedIncomes) setIncomes(JSON.parse(savedIncomes));
      if (savedBudgets) setBudgetLimits(JSON.parse(savedBudgets));
      if (savedSavingsGoals) setSavingsGoals(JSON.parse(savedSavingsGoals));
      if (savedInvestments) setInvestments(JSON.parse(savedInvestments));
      if (savedBills) setBills(JSON.parse(savedBills));
      if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save expenses to localStorage (only after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
    }
  }, [expenses, isLoaded]);

  // Save incomes to localStorage (only after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEYS.INCOMES, JSON.stringify(incomes));
    }
  }, [incomes, isLoaded]);

  // Save budgets to localStorage (only after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(budgetLimits));
    }
  }, [budgetLimits, isLoaded]);

  // Save savings goals to localStorage (only after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEYS.SAVINGS_GOALS, JSON.stringify(savingsGoals));
    }
  }, [savingsGoals, isLoaded]);

  // Save investments to localStorage (only after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEYS.INVESTMENTS, JSON.stringify(investments));
    }
  }, [investments, isLoaded]);

  // Save bills to localStorage (only after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEYS.BILLS, JSON.stringify(bills));
    }
  }, [bills, isLoaded]);

  // Save transactions to localStorage (only after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
    }
  }, [transactions, isLoaded]);

  const addExpense = (expense: Expense) => {
    setExpenses((prev) => [...prev, expense]);
    setTransactions((prev) => [...prev, {
      id: expense.id,
      type: 'expense',
      amount: expense.amount,
      description: expense.description,
      date: expense.date,
      category: expense.category
    }]);
  };

  const removeExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const addIncome = (income: Income) => {
    setIncomes((prev) => [...prev, income]);
    setTransactions((prev) => [...prev, {
      id: income.id,
      type: 'income',
      amount: income.amount,
      description: `${income.type} - ${income.source}`,
      date: income.date
    }]);
  };

  const removeIncome = (id: string) => {
    setIncomes((prev) => prev.filter((i) => i.id !== id));
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const setBudgetLimit = (category: string, amount: number) => {
    setBudgetLimits((prev) => ({ ...prev, [category]: amount }));
  };

  const addSavingsGoal = (goal: SavingsGoal) => {
    setSavingsGoals((prev) => [...prev, goal]);
  };

  const updateSavingsGoal = (id: string, updates: Partial<SavingsGoal>) => {
    setSavingsGoals((prev) => {
      const updatedGoals = prev.map((goal) => {
        if (goal.id === id) {
          const updatedGoal = { ...goal, ...updates };
          // If currentAmount increased, add a transaction
          if (updates.currentAmount && updates.currentAmount > goal.currentAmount) {
            const difference = updates.currentAmount - goal.currentAmount;
            setTransactions((prevTrans) => [...prevTrans, {
              id: `${id}-${Date.now()}`,
              type: 'savings',
              amount: difference,
              description: `Contribution to ${goal.name}`,
              date: new Date().toISOString(),
              category: goal.category
            }]);
          }
          return updatedGoal;
        }
        return goal;
      });
      return updatedGoals;
    });
  };

  const removeSavingsGoal = (id: string) => {
    setSavingsGoals((prev) => prev.filter((goal) => goal.id !== id));
  };

  const addInvestment = (investment: Investment) => {
    setInvestments((prev) => [...prev, investment]);
    setTransactions((prev) => [...prev, {
      id: investment.id,
      type: 'investment',
      amount: investment.amount,
      description: `${investment.type} - ${investment.name}`,
      date: investment.date
    }]);
  };

  const removeInvestment = (id: string) => {
    setInvestments((prev) => prev.filter((inv) => inv.id !== id));
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const addBill = (bill: Bill) => {
    setBills((prev) => [...prev, bill]);
  };

  const updateBill = (id: string, updates: Partial<Bill>) => {
    setBills((prev) =>
      prev.map((bill) => (bill.id === id ? { ...bill, ...updates } : bill))
    );
  };

  const removeBill = (id: string) => {
    setBills((prev) => prev.filter((bill) => bill.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const balance = totalIncome - totalExpenses;
  const totalSavings = savingsGoals.reduce((sum, g) => sum + g.currentAmount, 0);
  const totalInvestments = investments.reduce((sum, i) => sum + i.amount, 0);

  return {
    expenses,
    incomes,
    budgetLimits,
    savingsGoals,
    investments,
    bills,
    transactions,
    addExpense,
    removeExpense,
    addIncome,
    removeIncome,
    setBudgetLimit,
    addSavingsGoal,
    updateSavingsGoal,
    removeSavingsGoal,
    addInvestment,
    removeInvestment,
    addBill,
    updateBill,
    removeBill,
    totalExpenses,
    totalIncome,
    balance,
    totalSavings,
    totalInvestments,
  };
};
