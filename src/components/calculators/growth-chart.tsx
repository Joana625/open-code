import { cn } from "@/lib/utils";
import { formatCurrency, type CompoundPoint } from "@/lib/finance";

type GrowthChartProps = {
  points: CompoundPoint[];
  className?: string;
};

export function GrowthChart({ points, className }: GrowthChartProps) {
  const max = Math.max(...points.map((point) => point.balance), 1);

  return (
    <div className={cn("flex h-36 items-end gap-[3px] sm:gap-1", className)}>
      {points.map((point) => {
        const barHeight = (point.balance / max) * 100;
        const interestShare =
          point.balance > 0 ? (point.interest / point.balance) * 100 : 0;
        const contributionShare = 100 - interestShare;

        return (
          <div
            key={point.year}
            className="flex h-full min-w-0 flex-1 flex-col justify-end"
            title={`Year ${point.year}: ${formatCurrency(point.balance)}`}
          >
            <div
              className="flex w-full flex-col justify-end overflow-hidden rounded-t-[3px] transition-[height] duration-300"
              style={{ height: `${barHeight}%` }}
            >
              <div
                className="w-full bg-emerald-500"
                style={{ height: `${interestShare}%` }}
              />
              <div
                className="w-full bg-zinc-900"
                style={{ height: `${contributionShare}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function GrowthLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
      <span className="flex items-center gap-1.5">
        <span className="size-2.5 rounded-[2px] bg-zinc-900" />
        Contributions
      </span>
      <span className="flex items-center gap-1.5">
        <span className="size-2.5 rounded-[2px] bg-emerald-500" />
        Interest earned
      </span>
    </div>
  );
}
