"use client";

import { useState } from "react";
import { CalendarDays, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
  calculateMortgage,
  defaultMortgageInputs,
  formatCurrency,
  mortgageBalanceSeries,
} from "@/lib/finance";
import { MortgageBalanceChart } from "./mortgage-balance-chart";

function parseAmount(value: string) {
  const digits = value.replace(/[^0-9]/g, "");
  return digits ? Number(digits) : 0;
}

type AmountFieldProps = {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  hint?: string;
};

function AmountField({ id, label, value, onChange, hint }: AmountFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground">
          $
        </span>
        <Input
          id={id}
          inputMode="numeric"
          autoComplete="off"
          value={value === 0 ? "" : value.toLocaleString("en-US")}
          onChange={(event) => onChange(parseAmount(event.target.value))}
          className="h-10 pl-7 text-base tabular-nums"
        />
      </div>
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(defaultMortgageInputs.homePrice);
  const [deposit, setDeposit] = useState(defaultMortgageInputs.deposit);
  const [rate, setRate] = useState(defaultMortgageInputs.annualRate);
  const [years, setYears] = useState(defaultMortgageInputs.years);

  const result = calculateMortgage({
    homePrice,
    deposit,
    annualRate: rate,
    years,
  });

  const series = mortgageBalanceSeries({
    homePrice,
    deposit,
    annualRate: rate,
    years,
  });

  const principalShare =
    result.totalRepayment > 0
      ? (result.loan / result.totalRepayment) * 100
      : 100;
  const interestShare = 100 - principalShare;

  return (
    <Card className="gap-0 overflow-hidden [--card-spacing:0px]">
      <div className="grid lg:grid-cols-[1.02fr_0.98fr]">
        <div className="space-y-6 p-6 sm:p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <AmountField
              id="home-price"
              label="Home price"
              value={homePrice}
              onChange={setHomePrice}
            />
            <div className="space-y-2">
              <AmountField
                id="deposit"
                label="Deposit"
                value={deposit}
                onChange={setDeposit}
                hint={`${result.depositPercent.toFixed(0)}% of the home price`}
              />
              <div className="flex gap-1.5">
                {[5, 10, 20].map((percent) => (
                  <Button
                    key={percent}
                    type="button"
                    variant="outline"
                    size="xs"
                    onClick={() =>
                      setDeposit(Math.round((homePrice * percent) / 100))
                    }
                  >
                    {percent}%
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="gap-1.5">
                <Percent className="size-3.5 text-muted-foreground" />
                Interest rate
              </Label>
              <span className="text-sm font-medium tabular-nums">
                {rate.toFixed(2)}%
              </span>
            </div>
            <Slider
              label="Interest rate"
              min={0.5}
              max={15}
              step={0.05}
              value={[rate]}
              onValueChange={(value) =>
                setRate(typeof value === "number" ? value : value[0])
              }
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0.5%</span>
              <span>15%</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="gap-1.5">
                <CalendarDays className="size-3.5 text-muted-foreground" />
                Loan term
              </Label>
              <span className="text-sm font-medium tabular-nums">
                {years} years
              </span>
            </div>
            <Slider
              label="Loan term in years"
              min={1}
              max={40}
              step={1}
              value={[years]}
              onValueChange={(value) =>
                setYears(typeof value === "number" ? value : value[0])
              }
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 year</span>
              <span>40 years</span>
            </div>
          </div>

          <div className="rounded-lg bg-muted/60 p-3 text-xs leading-relaxed text-muted-foreground">
            Your monthly repayment is principal and interest only. It does not
            include lender fees, taxes or home insurance.
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t bg-muted/30 p-6 sm:p-8 lg:border-t-0 lg:border-l">
          <div>
            <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              Monthly repayment
            </p>
            <p className="mt-1 flex items-baseline gap-2 text-5xl font-semibold tracking-tight tabular-nums">
              {formatCurrency(result.monthlyPayment)}
              <span className="text-base font-normal text-muted-foreground">
                /mo
              </span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {formatCurrency(result.loan)} loan over {years} years at{" "}
              {rate.toFixed(2)}%
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <div>
              <p className="text-xs text-muted-foreground">Loan amount</p>
              <p className="mt-0.5 text-lg font-medium tabular-nums">
                {formatCurrency(result.loan)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total interest</p>
              <p className="mt-0.5 text-lg font-medium text-emerald-700 tabular-nums">
                {formatCurrency(result.totalInterest)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total repayment</p>
              <p className="mt-0.5 text-lg font-medium tabular-nums">
                {formatCurrency(result.totalRepayment)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Deposit</p>
              <p className="mt-0.5 text-lg font-medium tabular-nums">
                {formatCurrency(result.deposit)}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex h-2.5 overflow-hidden rounded-full bg-zinc-200">
              <div
                className="bg-zinc-900 transition-[width] duration-300"
                style={{ width: `${principalShare}%` }}
              />
              <div
                className="bg-emerald-500 transition-[width] duration-300"
                style={{ width: `${interestShare}%` }}
              />
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-[2px] bg-zinc-900" />
                Principal {principalShare.toFixed(0)}%
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-[2px] bg-emerald-500" />
                Interest {interestShare.toFixed(0)}%
              </span>
            </div>
          </div>

          <div className="mt-auto">
            <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>Loan balance over time</span>
              <span className="tabular-nums">
                {formatCurrency(result.loan)} → $0
              </span>
            </div>
            <MortgageBalanceChart values={series} />
          </div>
        </div>
      </div>
    </Card>
  );
}
