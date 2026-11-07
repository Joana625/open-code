import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Check,
  CircleCheck,
  House,
  Percent,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { CompoundInterestCalculator } from "@/components/calculators/compound-interest-calculator";
import { CompoundFaq } from "@/components/landing/compound-faq";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Compound Interest Calculator — Ratewise",
  description:
    "Project your savings with compound interest. Compare monthly, quarterly and yearly contributions, see contributions versus interest, and view a year-by-year growth schedule.",
  alternates: {
    canonical: "/compound-interest-calculator",
  },
  openGraph: {
    title: "Compound Interest Calculator — Ratewise",
    description:
      "See what your savings could become over time. Adjust your starting balance, contributions, return and time horizon to compare scenarios.",
    type: "website",
    url: "/compound-interest-calculator",
  },
};

const highlights = [
  {
    icon: TrendingUp,
    title: "A projected future balance",
    description:
      "See the ending balance after your chosen time horizon, based on the annual return and contribution rhythm you select.",
  },
  {
    icon: Percent,
    title: "The contribution split",
    description:
      "Understand how much of the final balance comes from your own money and how much is growth earned through compounding.",
  },
  {
    icon: CalendarDays,
    title: "Year-by-year detail",
    description:
      "Open the growth schedule to see starting balance, contributions, interest earned and ending balance for every year.",
  },
];

const steps = [
  {
    title: "Set your starting point",
    description:
      "Enter what you already have and the amount you plan to contribute each period. The calculator does the rest instantly.",
  },
  {
    title: "Choose a contribution rhythm",
    description:
      "Switch between monthly, quarterly and yearly contributions. The annual equivalent and growth schedule update automatically.",
  },
  {
    title: "Adjust return and time",
    description:
      "Change the annual return and time horizon to compare conservative and optimistic scenarios side by side.",
  },
];

const growthLevers = [
  "Start earlier. Time gives each contribution more opportunity to compound.",
  "Contribute more often. Monthly contributions start compounding sooner than an annual lump sum.",
  "Increase contributions when you can. Even small rises make a difference over decades.",
  "Keep return assumptions realistic. Higher projected returns usually come with more risk.",
];

const scenarioRows = [
  { label: "More time", value: "More compounding" },
  { label: "Monthly contributions", value: "Earlier growth" },
  { label: "Larger contributions", value: "Bigger balance" },
  { label: "Higher return", value: "Faster growth" },
];

const trustPoints = [
  "Monthly, quarterly or yearly",
  "Contributions vs interest",
  "Year-by-year schedule",
];

export default function CompoundInterestPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <main>
        <section
          id="top"
          className="relative isolate scroll-mt-20 overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.14),transparent_58%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_0%,black,transparent)]"
          />

          <div className="mx-auto max-w-6xl px-4 pt-14 pb-20 sm:px-6 sm:pt-20 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Badge
                variant="outline"
                className="h-7 gap-2 rounded-full border-emerald-600/20 bg-emerald-50 px-3 text-emerald-800"
              >
                <TrendingUp className="size-3" />
                Compound growth
              </Badge>

              <h1 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                Compound interest{" "}
                <span className="relative whitespace-nowrap">
                  <span className="relative z-10">calculator.</span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-emerald-200/70 sm:h-4"
                  />
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                See what your savings could become. Adjust the starting balance,
                contributions, return and time horizon, then watch how interest
                begins to do more of the work as the years pass.
              </p>
            </div>

            <div className="mt-10">
              <CompoundInterestCalculator showSchedule />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              {trustPoints.map((point) => (
                <span key={point} className="flex items-center gap-1.5">
                  <Check className="size-4 text-emerald-600" />
                  {point}
                </span>
              ))}
            </div>

            <p className="mt-3 text-center text-xs text-muted-foreground">
              Runs entirely in your browser. Estimates only — not financial
              advice.
            </p>
          </div>
        </section>

        <section className="border-y border-border/60 bg-muted/30 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold tracking-[0.18em] text-emerald-700 uppercase">
                What you can see
              </p>
              <h2 className="mt-3 text-3xl leading-[1.1] font-semibold tracking-tight sm:text-4xl">
                Growth, broken into clear pieces.
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                Compounding is easier to trust when you can see where the money
                comes from. The calculator separates your contributions from the
                interest they earn.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {highlights.map((highlight) => (
                <Card
                  key={highlight.title}
                  className="[--card-spacing:1.5rem] px-6"
                >
                  <span className="grid size-10 place-items-center rounded-lg bg-zinc-950 text-white">
                    <highlight.icon className="size-5" />
                  </span>
                  <h3 className="mt-6 text-lg font-medium">
                    {highlight.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {highlight.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-emerald-700 uppercase">
                How it works
              </p>
              <h2 className="mt-3 text-3xl leading-[1.1] font-semibold tracking-tight sm:text-4xl">
                Small balances grow when time is on their side.
              </h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground">
                Interest is calculated on the balance, then added to it. In the
                next period, interest is calculated on the larger balance. The
                effect starts slowly and becomes more noticeable over time.
              </p>

              <Card className="mt-8 gap-3 bg-muted/40 px-5 [--card-spacing:1.25rem]">
                <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                  Compound growth formula
                </p>
                <code className="block overflow-x-auto rounded-lg bg-background px-3 py-2.5 font-mono text-sm">
                  A = P(1 + i)^n
                </code>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  A is the future value, P is the starting balance, i is the
                  monthly interest rate and n is the number of months. Each
                  contribution starts compounding from the period it is added.
                </p>
              </Card>
            </div>

            <div className="space-y-5">
              {steps.map((step, index) => (
                <Card key={step.title} className="[--card-spacing:1.5rem] px-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-medium">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                    <span className="text-3xl font-semibold tracking-tight text-zinc-200">
                      0{index + 1}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-muted/30 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-emerald-700 uppercase">
                What moves the result
              </p>
              <h2 className="mt-3 text-3xl leading-[1.1] font-semibold tracking-tight sm:text-4xl">
                Four levers that change the outcome.
              </h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground">
                The final balance is a product of time, contribution size,
                contribution timing and the return you assume. No single lever
                tells the whole story.
              </p>

              <ul className="mt-8 space-y-4">
                {growthLevers.map((lever) => (
                  <li key={lever} className="flex gap-3 text-sm leading-6">
                    <CircleCheck className="mt-0.5 size-5 shrink-0 text-emerald-600" />
                    <span>{lever}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Card className="[--card-spacing:1.5rem] px-6">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-lg bg-zinc-950 text-white">
                  <SlidersHorizontal className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-medium">Try a scenario</p>
                  <p className="text-xs text-muted-foreground">
                    Change one lever at a time
                  </p>
                </div>
              </div>

              <Separator className="my-5" />

              <div className="space-y-4 text-sm">
                {scenarioRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-4"
                  >
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className="font-medium text-emerald-700">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="#top"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 transition-colors hover:text-emerald-800"
              >
                Adjust the calculator
                <ArrowRight className="size-4" />
              </Link>
            </Card>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-emerald-700 uppercase">
                Good to know
              </p>
              <h2 className="mt-3 text-3xl leading-[1.1] font-semibold tracking-tight sm:text-4xl">
                Compound questions, answered.
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                The details behind the projection, so you can use the numbers
                with confidence.
              </p>

              <Card className="mt-8 gap-2 bg-muted/40 px-5 [--card-spacing:1.25rem]">
                <p className="flex items-center gap-1.5 text-sm font-medium">
                  <ShieldCheck className="size-4 text-emerald-700" />
                  Private by design
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  No sign-up, no stored figures and no data sent to a server.
                </p>
              </Card>
            </div>

            <CompoundFaq />
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="relative isolate overflow-hidden rounded-[2rem] bg-zinc-950 px-6 py-14 text-white sm:px-12 sm:py-16 lg:px-16 lg:py-20">
              <div
                aria-hidden="true"
                className="absolute -top-24 -right-24 -z-10 size-80 rounded-full bg-emerald-500/20 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-32 left-1/3 -z-10 size-80 rounded-full bg-emerald-400/10 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]"
              />

              <div className="max-w-2xl">
                <Badge
                  variant="outline"
                  className="h-7 gap-2 rounded-full border-white/15 bg-white/5 px-3 text-zinc-200"
                >
                  <Sparkles className="size-3 text-emerald-400" />
                  Keep planning
                </Badge>
                <h2 className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight sm:text-4xl">
                  Grow the savings. Then check the mortgage.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8">
                  Use the mortgage repayments calculator to see what a home loan
                  really costs, and how extra repayments could shorten it.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/mortgage-repayments-calculator"
                    className={cn(
                      buttonVariants(),
                      "h-11 gap-2 bg-white px-5 text-sm text-zinc-950 hover:bg-zinc-100",
                    )}
                  >
                    <House />
                    Mortgage calculator
                  </Link>
                  <Link
                    href="/"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "h-11 border-white/20 bg-transparent px-5 text-sm text-white hover:bg-white/10 hover:text-white",
                    )}
                  >
                    Back to Ratewise
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
