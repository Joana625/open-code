"use client";

import { useState } from "react";
import { CalendarDays, Percent, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
  calculateCompound,
  compoundSeries,
  defaultCompoundInputs,
  formatCurrency,
} from "@/lib/finance";
import { GrowthChart, GrowthLegend } from "./growth-chart";

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

export function CompoundInterestCalculator() {
  const [initial, setInitial] = useState(defaultCompoundInputs.initial);
  const [monthly, setMonthly] = useState(defaultCompoundInputs.monthly);
  const [rate, setRate] = useState(defaultCompoundInputs.annualRate);
  const [years, setYears] = useState(defaultCompoundInputs.years);

  const result = calculateCompound({
    initial,
    monthly,
    annualRate: rate,
    years,
  });

  const points = compoundSeries({ initial, monthly, annualRate: rate, years });
  const contributionShare =
    result.futureValue > 0
      ? (result.contributed / result.futureValue) * 100
      : 100;
  const interestShare = 100 - contributionShare;

  return (
    <Card className="gap-0 overflow-hidden [--card-spacing:0px]">
      <div className="grid lg:grid-cols-[1.02fr_0.98fr]">
        <div className="space-y-6 p-6 sm:p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <AmountField
              id="initial-amount"
              label="Starting amount"
              value={initial}
              onChange={setInitial}
            />
            <AmountField
              id="monthly-contribution"
              label="Monthly contribution"
              value={monthly}
              onChange={setMonthly}
              hint={`${formatCurrency(monthly * 12)} per year`}
            />
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="gap-1.5">
                <Percent className="size-3.5 text-muted-foreground" />
                Annual return
              </Label>
              <span className="text-sm font-medium tabular-nums">
                {rate.toFixed(1)}%
              </span>
            </div>
            <Slider
              label="Annual return"
              min={0}
              max={15}
              step={0.1}
              value={[rate]}
              onValueChange={(value) =>
                setRate(typeof value === "number" ? value : value[0])
              }
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>15%</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="gap-1.5">
                <CalendarDays className="size-3.5 text-muted-foreground" />
                Time horizon
              </Label>
              <span className="text-sm font-medium tabular-nums">
                {years} years
              </span>
            </div>
            <Slider
              label="Time horizon in years"
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
            Interest is compounded monthly and contributions are added at the
            end of each month. Returns are illustrative, not guaranteed.
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t bg-muted/30 p-6 sm:p-8 lg:border-t-0 lg:border-l">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-medium tracking-widest text-muted-foreground uppercase">
              <TrendingUp className="size-3.5 text-emerald-600" />
              Projected balance
            </p>
            <p className="mt-1 text-5xl font-semibold tracking-tight tabular-nums">
              {formatCurrency(result.futureValue)}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              In {years} years, at {rate.toFixed(1)}% per year
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <div>
              <p className="text-xs text-muted-foreground">Total contributed</p>
              <p className="mt-0.5 text-lg font-medium tabular-nums">
                {formatCurrency(result.contributed)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Interest earned</p>
              <p className="mt-0.5 text-lg font-medium text-emerald-700 tabular-nums">
                {formatCurrency(result.interest)}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex h-2.5 overflow-hidden rounded-full bg-zinc-200">
              <div
                className="bg-zinc-900 transition-[width] duration-300"
                style={{ width: `${contributionShare}%` }}
              />
              <div
                className="bg-emerald-500 transition-[width] duration-300"
                style={{ width: `${interestShare}%` }}
              />
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-[2px] bg-zinc-900" />
                Contributions {contributionShare.toFixed(0)}%
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-[2px] bg-emerald-500" />
                Interest {interestShare.toFixed(0)}%
              </span>
            </div>
          </div>

          <div className="mt-auto space-y-2">
            <GrowthChart points={points} className="h-28" />
            <div className="flex items-center justify-between">
              <GrowthLegend />
              <span className="text-xs text-muted-foreground tabular-nums">
                Year {years}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
