import {
  ArrowRight,
  Calculator,
  ChartNoAxesCombined,
  Check,
  CircleCheck,
  House,
  Layers,
  MousePointerClick,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { CalculatorTabs } from "@/components/calculators/calculator-tabs";
import {
  GrowthChart,
  GrowthLegend,
} from "@/components/calculators/growth-chart";
import { MortgageBalanceChart } from "@/components/calculators/mortgage-balance-chart";
import { Faq } from "@/components/landing/faq";
import { HeroPreview } from "@/components/landing/hero-preview";
import { SiteHeader } from "@/components/landing/site-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  calculateCompound,
  calculateMortgage,
  compoundSeries,
  defaultCompoundInputs,
  defaultMortgageInputs,
  formatCurrency,
  mortgageBalanceSeries,
} from "@/lib/finance";

const mortgage = calculateMortgage(defaultMortgageInputs);
const mortgageSeries = mortgageBalanceSeries(defaultMortgageInputs);
const compound = calculateCompound(defaultCompoundInputs);
const compoundPoints = compoundSeries(defaultCompoundInputs);

const mortgagePrincipalShare = (mortgage.loan / mortgage.totalRepayment) * 100;
const mortgageInterestShare = 100 - mortgagePrincipalShare;

const benefits = [
  {
    icon: Calculator,
    title: "Instant answers",
    description:
      "Every result updates as you move a slider — no submit button.",
  },
  {
    icon: Layers,
    title: "Two calculators",
    description: "Mortgage repayments and compound growth in one place.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    description: "Your numbers run in the browser and are never stored.",
  },
];

const mortgagePoints = [
  "Monthly repayment, total interest and total cost, all at once",
  "Deposit shortcuts for 5%, 10% and 20% scenarios",
  "A live chart of how your loan balance falls over time",
];

const compoundHighlights = [
  "Combine a starting balance with regular monthly contributions",
  "Adjust the annual return and time horizon to match your plan",
  "See contributions versus interest, year by year",
];

const steps = [
  {
    icon: MousePointerClick,
    title: "Pick your calculator",
    description:
      "Start with a mortgage repayment or compound interest question. Both are free and open instantly.",
  },
  {
    icon: SlidersHorizontal,
    title: "Adjust the numbers",
    description:
      "Move the sliders, type your own amounts and compare scenarios. Every figure recalculates immediately.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "See the full picture",
    description:
      "Read the headline number, then dig into interest, totals and charts. No spreadsheets required.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <main>
        <section className="relative isolate overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.14),transparent_58%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_0%,black,transparent)]"
          />

          <div className="mx-auto grid max-w-6xl gap-14 px-4 pt-14 pb-24 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:pt-24 lg:pb-32 lg:px-8">
            <div>
              <Badge
                variant="outline"
                className="h-7 gap-2 rounded-full border-emerald-600/20 bg-emerald-50 px-3 text-emerald-800"
              >
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Mortgage repayments + compound interest
              </Badge>

              <h1 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                Know exactly what your{" "}
                <span className="relative whitespace-nowrap">
                  <span className="relative z-10">money will do.</span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-emerald-200/70 sm:h-4"
                  />
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                Model your mortgage repayments down to the dollar, then watch
                compound interest turn steady contributions into real growth.
                Two clear calculators, one calm place to plan.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#calculators"
                  className={cn(buttonVariants(), "h-11 gap-2 px-5 text-sm")}
                >
                  Try the calculators
                  <ArrowRight />
                </a>
                <a
                  href="#features"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "h-11 px-5 text-sm",
                  )}
                >
                  Explore the features
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                {["No sign-up", "Free to use", "Runs in your browser"].map(
                  (item) => (
                    <span key={item} className="flex items-center gap-1.5">
                      <Check className="size-4 text-emerald-600" />
                      {item}
                    </span>
                  ),
                )}
              </div>
            </div>

            <HeroPreview />
          </div>
        </section>

        <section className="border-y border-border/60 bg-muted/30">
          <div className="mx-auto grid max-w-6xl gap-7 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className={cn(
                  "flex items-start gap-3",
                  index > 0 && "sm:border-l sm:border-border/70 sm:pl-7",
                )}
              >
                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-background ring-1 ring-foreground/10">
                  <benefit.icon className="size-4 text-emerald-700" />
                </span>
                <div>
                  <p className="text-sm font-medium">{benefit.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="features"
          className="scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold tracking-[0.18em] text-emerald-700 uppercase">
                Two tools, one clear view
              </p>
              <h2 className="mt-3 text-3xl leading-[1.1] font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem]">
                Built for the money questions that keep you up at night.
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                Whether you are signing up for decades of repayments or
                wondering what small, steady savings could become, the answer is
                a few sliders away.
              </p>
            </div>

            <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-28">
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div>
                  <Badge variant="secondary" className="gap-1.5">
                    <House className="size-3" />
                    Mortgage repayments
                  </Badge>
                  <h3 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                    See the real cost, not just the headline rate.
                  </h3>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">
                    A low rate can still hide a very expensive loan. Adjust the
                    home price, deposit, interest rate and term, and see the
                    monthly repayment, total interest and remaining balance
                    change together.
                  </p>
                  <ul className="mt-6 space-y-3">
                    {mortgagePoints.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-6">
                        <CircleCheck className="mt-0.5 size-5 shrink-0 text-emerald-600" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#calculators"
                    className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 transition-colors hover:text-emerald-800"
                  >
                    Try the mortgage calculator
                    <ArrowRight className="size-4" />
                  </a>
                </div>

                <Card className="[--card-spacing:1.5rem] px-6 shadow-xl shadow-zinc-900/5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <span className="grid size-9 place-items-center rounded-lg bg-zinc-950 text-white">
                        <House className="size-4" />
                      </span>
                      <div>
                        <p className="text-sm font-medium">
                          Repayment snapshot
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Principal &amp; interest
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">30 years</Badge>
                  </div>

                  <div className="mt-6 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Every month
                      </p>
                      <p className="mt-1 text-4xl font-semibold tracking-tight tabular-nums">
                        {formatCurrency(mortgage.monthlyPayment)}
                        <span className="text-sm font-normal text-muted-foreground">
                          {" "}
                          / mo
                        </span>
                      </p>
                    </div>
                    <div className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-right text-xs text-emerald-800">
                      <p className="font-medium">6.25%</p>
                      <p className="text-emerald-700/70">interest rate</p>
                    </div>
                  </div>

                  <Separator className="my-5" />

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Home price
                      </p>
                      <p className="mt-0.5 text-sm font-medium tabular-nums">
                        {formatCurrency(mortgage.homePrice)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Deposit</p>
                      <p className="mt-0.5 text-sm font-medium tabular-nums">
                        {formatCurrency(mortgage.deposit)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Loan</p>
                      <p className="mt-0.5 text-sm font-medium tabular-nums">
                        {formatCurrency(mortgage.loan)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2">
                    <div className="flex h-2.5 overflow-hidden rounded-full bg-zinc-100">
                      <div
                        className="bg-zinc-900"
                        style={{ width: `${mortgagePrincipalShare}%` }}
                      />
                      <div
                        className="bg-emerald-500"
                        style={{ width: `${mortgageInterestShare}%` }}
                      />
                    </div>
                    <div className="flex flex-wrap justify-between gap-2 text-[11px] text-muted-foreground">
                      <span>
                        Principal {formatCurrency(mortgage.loan)} ·{" "}
                        {mortgagePrincipalShare.toFixed(0)}%
                      </span>
                      <span>
                        Interest {formatCurrency(mortgage.totalInterest)} ·{" "}
                        {mortgageInterestShare.toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl border bg-muted/30 p-4">
                    <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span>Loan balance over time</span>
                      <span className="tabular-nums">
                        {formatCurrency(mortgage.loan)} → $0
                      </span>
                    </div>
                    <MortgageBalanceChart values={mortgageSeries} />
                  </div>
                </Card>
              </div>

              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className="lg:order-2">
                  <Badge variant="secondary" className="gap-1.5">
                    <TrendingUp className="size-3" />
                    Compound interest
                  </Badge>
                  <h3 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                    Turn steady contributions into meaningful growth.
                  </h3>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">
                    Compounding rewards time more than almost anything else.
                    Start with an amount, add a monthly contribution, and see
                    how interest begins to do more of the heavy lifting as the
                    years pass.
                  </p>
                  <ul className="mt-6 space-y-3">
                    {compoundHighlights.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-6">
                        <CircleCheck className="mt-0.5 size-5 shrink-0 text-emerald-600" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#calculators"
                    className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 transition-colors hover:text-emerald-800"
                  >
                    Try the compound interest calculator
                    <ArrowRight className="size-4" />
                  </a>
                </div>

                <Card className="[--card-spacing:1.5rem] px-6 shadow-xl shadow-zinc-900/5 lg:order-1">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <span className="grid size-9 place-items-center rounded-lg bg-zinc-950 text-white">
                        <TrendingUp className="size-4" />
                      </span>
                      <div>
                        <p className="text-sm font-medium">Growth projection</p>
                        <p className="text-xs text-muted-foreground">
                          $5,000 start + $400 / month
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">25 years</Badge>
                  </div>

                  <div className="mt-6">
                    <p className="text-xs text-muted-foreground">
                      Projected balance
                    </p>
                    <p className="mt-1 text-4xl font-semibold tracking-tight tabular-nums">
                      {formatCurrency(compound.futureValue)}
                    </p>
                  </div>

                  <GrowthChart points={compoundPoints} className="mt-6 h-40" />

                  <div className="mt-3">
                    <GrowthLegend />
                  </div>

                  <Separator className="my-5" />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Total contributed
                      </p>
                      <p className="mt-0.5 text-sm font-medium tabular-nums">
                        {formatCurrency(compound.contributed)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Interest earned
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-emerald-700 tabular-nums">
                        {formatCurrency(compound.interest)}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section
          id="calculators"
          className="scroll-mt-20 border-y border-border/60 bg-muted/30 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold tracking-[0.18em] text-emerald-700 uppercase">
                Run your own numbers
              </p>
              <h2 className="mt-3 text-3xl leading-[1.1] font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem]">
                Your scenario, calculated instantly.
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                Switch between the two calculators below. Move a slider or type
                an amount and every result updates on the spot.
              </p>
            </div>

            <div className="mt-12">
              <CalculatorTabs />
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              All calculations run locally in your browser. Estimates only — not
              financial advice.
            </p>
          </div>
        </section>

        <section
          id="how-it-works"
          className="scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold tracking-[0.18em] text-emerald-700 uppercase">
                How it works
              </p>
              <h2 className="mt-3 text-3xl leading-[1.1] font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem]">
                From question to clarity in seconds.
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                No accounts, no tutorials and no spreadsheet formulas to
                remember. Just three simple steps.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {steps.map((step, index) => (
                <Card
                  key={step.title}
                  className="[--card-spacing:1.5rem] px-6 transition-shadow hover:shadow-lg hover:shadow-zinc-900/5"
                >
                  <div className="flex items-start justify-between">
                    <span className="grid size-10 place-items-center rounded-lg bg-zinc-950 text-white">
                      <step.icon className="size-5" />
                    </span>
                    <span className="text-3xl font-semibold tracking-tight text-zinc-200">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-medium">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="scroll-mt-20 border-y border-border/60 bg-muted/30 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
        >
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-emerald-700 uppercase">
                Good to know
              </p>
              <h2 className="mt-3 text-3xl leading-[1.1] font-semibold tracking-tight sm:text-4xl">
                Questions, answered.
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                The details behind the numbers, so you can use the results with
                confidence.
              </p>

              <Card className="mt-8 gap-2 bg-background px-5 [--card-spacing:1.25rem]">
                <p className="text-sm font-medium">Prefer to jump in?</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Both calculators are free, private and ready to use right now.
                </p>
                <a
                  href="#calculators"
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-800"
                >
                  Open the calculators
                  <ArrowRight className="size-4" />
                </a>
              </Card>
            </div>

            <Faq />
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
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
                  Better numbers, better decisions
                </Badge>
                <h2 className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                  Your next big decision deserves a clearer picture.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8">
                  Spend two minutes with the numbers. Understand the mortgage,
                  see the compounding, and walk into the conversation prepared.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#calculators"
                    className={cn(
                      buttonVariants(),
                      "h-11 gap-2 bg-white px-5 text-sm text-zinc-950 hover:bg-zinc-100",
                    )}
                  >
                    Start calculating
                    <ArrowRight />
                  </a>
                  <a
                    href="#how-it-works"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "h-11 border-white/20 bg-transparent px-5 text-sm text-white hover:bg-white/10 hover:text-white",
                    )}
                  >
                    See how it works
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-sm">
              <div className="flex items-center gap-2.5">
                <span className="grid size-8 place-items-center rounded-lg bg-zinc-950 text-white">
                  <Calculator className="size-4" />
                </span>
                <span className="text-[15px] font-semibold tracking-tight">
                  Ratewise
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Clear mortgage repayment and compound interest calculators for
                people who would rather understand the numbers than guess.
              </p>
            </div>

            <nav
              className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm sm:grid-cols-2"
              aria-label="Footer"
            >
              {[
                { href: "#features", label: "Features" },
                { href: "#calculators", label: "Calculators" },
                { href: "#how-it-works", label: "How it works" },
                { href: "#faq", label: "FAQ" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <Separator className="my-8" />

          <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Ratewise. Built for clearer decisions.</p>
            <p>Estimates only. Not financial advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
