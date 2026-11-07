import { cn } from "@/lib/utils";

type MortgageBalanceChartProps = {
  values: number[];
  className?: string;
};

export function MortgageBalanceChart({
  values,
  className,
}: MortgageBalanceChartProps) {
  const width = 300;
  const height = 90;
  const padding = 3;
  const max = Math.max(...values, 1);
  const lastIndex = Math.max(values.length - 1, 1);

  const points = values.map((value, index) => {
    const x = padding + (index / lastIndex) * (width - padding * 2);
    const y = height - padding - (value / max) * (height - padding * 2);

    return [x, y] as const;
  });

  const line = points
    .map(
      ([x, y], index) =>
        `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`,
    )
    .join(" ");

  const area = `${line} L${(width - padding).toFixed(1)},${height - padding} L${padding},${height - padding} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={cn("h-24 w-full", className)}
      role="img"
      aria-label="Remaining mortgage balance over time"
    >
      <path d={area} className="fill-emerald-600/10" />
      <path
        d={line}
        fill="none"
        className="stroke-emerald-600"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
