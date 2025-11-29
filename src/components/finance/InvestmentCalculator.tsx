import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, TrendingUp, PieChart } from "lucide-react";

const InvestmentCalculator = () => {
  // SIP Calculator State
  const [sipMonthly, setSipMonthly] = useState("");
  const [sipRate, setSipRate] = useState("12");
  const [sipYears, setSipYears] = useState("");
  const [sipResult, setSipResult] = useState<{
    invested: number;
    returns: number;
    total: number;
  } | null>(null);

  // Lumpsum Calculator State
  const [lumpsumAmount, setLumpsumAmount] = useState("");
  const [lumpsumRate, setLumpsumRate] = useState("12");
  const [lumpsumYears, setLumpsumYears] = useState("");
  const [lumpsumResult, setLumpsumResult] = useState<{
    invested: number;
    returns: number;
    total: number;
  } | null>(null);

  const calculateSIP = () => {
    const P = parseFloat(sipMonthly);
    const r = parseFloat(sipRate) / 100 / 12;
    const n = parseFloat(sipYears) * 12;

    if (!P || !n) return;

    const M = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const invested = P * n;
    const returns = M - invested;

    setSipResult({
      invested,
      returns,
      total: M,
    });
  };

  const calculateLumpsum = () => {
    const P = parseFloat(lumpsumAmount);
    const r = parseFloat(lumpsumRate) / 100;
    const n = parseFloat(lumpsumYears);

    if (!P || !n) return;

    const A = P * Math.pow(1 + r, n);
    const returns = A - P;

    setLumpsumResult({
      invested: P,
      returns,
      total: A,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card p-6 shadow-md">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-3">
            <Calculator className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Investment Calculator</h2>
            <p className="text-sm text-muted-foreground">
              Calculate returns for SIP and Lumpsum investments
            </p>
          </div>
        </div>

        <Tabs defaultValue="sip" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sip">SIP Calculator</TabsTrigger>
            <TabsTrigger value="lumpsum">Lumpsum Calculator</TabsTrigger>
          </TabsList>

          {/* SIP Calculator */}
          <TabsContent value="sip" className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="sip-monthly">Monthly Investment (₹)</Label>
                <Input
                  id="sip-monthly"
                  type="number"
                  placeholder="5000"
                  value={sipMonthly}
                  onChange={(e) => setSipMonthly(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sip-rate">Expected Return (% p.a.)</Label>
                <Input
                  id="sip-rate"
                  type="number"
                  placeholder="12"
                  value={sipRate}
                  onChange={(e) => setSipRate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sip-years">Time Period (Years)</Label>
                <Input
                  id="sip-years"
                  type="number"
                  placeholder="10"
                  value={sipYears}
                  onChange={(e) => setSipYears(e.target.value)}
                />
              </div>
            </div>

            <Button onClick={calculateSIP} className="w-full gap-2">
              <Calculator className="h-4 w-4" />
              Calculate SIP Returns
            </Button>

            {sipResult && (
              <div className="grid gap-4 sm:grid-cols-3">
                <Card className="bg-background p-4">
                  <p className="mb-1 text-sm text-muted-foreground">Total Invested</p>
                  <p className="text-2xl font-bold text-foreground">
                    ₹{sipResult.invested.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </Card>
                <Card className="bg-background p-4">
                  <p className="mb-1 text-sm text-muted-foreground">Expected Returns</p>
                  <p className="text-2xl font-bold text-success">
                    ₹{sipResult.returns.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </Card>
                <Card className="bg-background p-4">
                  <p className="mb-1 text-sm text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold text-primary">
                    ₹{sipResult.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Lumpsum Calculator */}
          <TabsContent value="lumpsum" className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="lumpsum-amount">Investment Amount (₹)</Label>
                <Input
                  id="lumpsum-amount"
                  type="number"
                  placeholder="100000"
                  value={lumpsumAmount}
                  onChange={(e) => setLumpsumAmount(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lumpsum-rate">Expected Return (% p.a.)</Label>
                <Input
                  id="lumpsum-rate"
                  type="number"
                  placeholder="12"
                  value={lumpsumRate}
                  onChange={(e) => setLumpsumRate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lumpsum-years">Time Period (Years)</Label>
                <Input
                  id="lumpsum-years"
                  type="number"
                  placeholder="10"
                  value={lumpsumYears}
                  onChange={(e) => setLumpsumYears(e.target.value)}
                />
              </div>
            </div>

            <Button onClick={calculateLumpsum} className="w-full gap-2">
              <Calculator className="h-4 w-4" />
              Calculate Lumpsum Returns
            </Button>

            {lumpsumResult && (
              <div className="grid gap-4 sm:grid-cols-3">
                <Card className="bg-background p-4">
                  <p className="mb-1 text-sm text-muted-foreground">Total Invested</p>
                  <p className="text-2xl font-bold text-foreground">
                    ₹{lumpsumResult.invested.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </Card>
                <Card className="bg-background p-4">
                  <p className="mb-1 text-sm text-muted-foreground">Expected Returns</p>
                  <p className="text-2xl font-bold text-success">
                    ₹{lumpsumResult.returns.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </Card>
                <Card className="bg-background p-4">
                  <p className="mb-1 text-sm text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold text-primary">
                    ₹{lumpsumResult.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>

      {/* Investment Tips */}
      <Card className="bg-gradient-card p-6 shadow-md">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Investment Tips</h3>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-success">✓</span>
            <span>Start investing early to benefit from compound interest</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success">✓</span>
            <span>SIPs help you average out market volatility through rupee cost averaging</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success">✓</span>
            <span>Diversify your portfolio across different asset classes</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success">✓</span>
            <span>Stay invested for the long term to maximize returns</span>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default InvestmentCalculator;
