import { House, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  calculateCompound,
  calculateMortgage,
  compoundSeries,
  defaultCompoundInputs,
  defaultMortgageInputs,
  formatCurrency,
} from "@/lib/finance";
import { GrowthChart } from "@/components/calculators/growth-chart";

const mortgage = calculateMortgage(defaultMortgageInputs);

const compound = calculateCompound(defaultCompoundInputs);
const compoundPoints = compoundSeries(defaultCompoundInputs);

const mortgagePrincipalShare = (mortgage.loan / mortgage.totalRepayment) * 100;
const mortgageInterestShare = 100 - mortgagePrincipalShare;

export function HeroPreview() {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      <div
        aria-hidden="true"
        className="absolute -inset-10 -z-10 bg-[radial-gradient(closest-side,rgba(16,185,129,0.16),transparent)] blur-2xl"
      />

      <Card className="relative z-10 w-[94%] -rotate-1 gap-4 px-5 shadow-xl shadow-zinc-900/5 [--card-spacing:1.25rem]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-emerald-600/10 text-emerald-700">
              <House className="size-4" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">
                Mortgage repayment
              </p>
              <p className="mt-0.5 text-lg font-semibold tracking-tight tabular-nums">
                {formatCurrency(mortgage.monthlyPayment)}
                <span className="text-xs font-normal text-muted-foreground">
                  {" "}
                  / month
                </span>
              </p>
            </div>
          </div>
          <Badge variant="secondary">30 years</Badge>
        </div>

        <div className="space-y-2">
          <div className="flex h-2 overflow-hidden rounded-full bg-zinc-100">
            <div
              className="bg-zinc-900"
              style={{ width: `${mortgagePrincipalShare}%` }}
            />
            <div
              className="bg-emerald-500"
              style={{ width: `${mortgageInterestShare}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-muted-foreground">
            <span>Principal {mortgagePrincipalShare.toFixed(0)}%</span>
            <span>Interest {mortgageInterestShare.toFixed(0)}%</span>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-muted/60 px-3 py-2">
          <span className="text-xs text-muted-foreground">Deposit</span>
          <span className="text-sm font-medium tabular-nums">
            {formatCurrency(mortgage.deposit)} ·{" "}
            {mortgage.depositPercent.toFixed(0)}%
          </span>
        </div>
      </Card>

      <Card className="relative z-20 -mt-3 ml-auto w-[89%] rotate-1 gap-3 px-5 shadow-xl shadow-zinc-900/5 [--card-spacing:1.25rem]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-emerald-600/10 text-emerald-700">
              <TrendingUp className="size-4" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">Compound growth</p>
              <p className="mt-0.5 text-lg font-semibold tracking-tight tabular-nums">
                {formatCurrency(compound.futureValue)}
              </p>
            </div>
          </div>
          <Badge variant="secondary">25 years</Badge>
        </div>

        <GrowthChart points={compoundPoints} className="h-20" />

        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-[2px] bg-zinc-900" />
            {formatCurrency(compound.contributed)} in
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-[2px] bg-emerald-500" />
            {formatCurrency(compound.interest)} earned
          </span>
        </div>
      </Card>

      <div className="absolute -bottom-5 -left-2 z-30 rounded-full border bg-background px-3 py-1.5 text-xs font-medium shadow-md sm:-left-4">
        <span className="mr-1.5 inline-block size-1.5 rounded-full bg-emerald-500 align-middle" />
        Updates instantly
      </div>
    </div>
  );
}
