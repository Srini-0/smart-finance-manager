import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFinanceData, Transaction } from "@/hooks/useFinanceData";
import { ArrowUpRight, ArrowDownRight, TrendingUp, PiggyBank, History } from "lucide-react";
import { format } from "date-fns";

const TransactionHistory = () => {
  const { transactions } = useFinanceData();

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getTransactionIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "income":
        return <ArrowUpRight className="h-4 w-4 text-success" />;
      case "expense":
        return <ArrowDownRight className="h-4 w-4 text-warning" />;
      case "investment":
        return <TrendingUp className="h-4 w-4 text-primary" />;
      case "savings":
        return <PiggyBank className="h-4 w-4 text-accent" />;
    }
  };

  const getTransactionColor = (type: Transaction["type"]) => {
    switch (type) {
      case "income":
        return "bg-success/10 text-success border-success/20";
      case "expense":
        return "bg-warning/10 text-warning border-warning/20";
      case "investment":
        return "bg-primary/10 text-primary border-primary/20";
      case "savings":
        return "bg-accent/10 text-accent border-accent/20";
    }
  };

  const getAmountPrefix = (type: Transaction["type"]) => {
    return type === "income" ? "+" : "-";
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <History className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Transaction History</CardTitle>
            <CardDescription>Your recent financial activities</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {sortedTransactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <History className="h-12 w-12 mb-2 opacity-50" />
              <p>No transactions yet</p>
              <p className="text-sm">Start by adding income or expenses</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between rounded-lg border bg-card p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className={`rounded-full p-2 ${getTransactionColor(transaction.type)}`}>
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{transaction.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs capitalize">
                          {transaction.type}
                        </Badge>
                        {transaction.category && (
                          <Badge variant="secondary" className="text-xs">
                            {transaction.category}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === "income" ? "text-success" : "text-foreground"
                    }`}>
                      {getAmountPrefix(transaction.type)}₹{transaction.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(transaction.date), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
