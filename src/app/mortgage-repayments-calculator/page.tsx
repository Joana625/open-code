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
} from "lucide-react";
import { MortgageCalculator } from "@/components/calculators/mortgage-calculator";
import { MortgageFaq } from "@/components/landing/mortgage-faq";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Mortgage Repayments Calculator — Ratewise",
  description:
    "Calculate mortgage repayments, total interest and payoff time. Compare monthly, fortnightly and weekly payments, add extra repayments, and view a year-by-year amortisation schedule.",
  alternates: {
    canonical: "/mortgage-repayments-calculator",
  },
  openGraph: {
    title: "Mortgage Repayments Calculator — Ratewise",
    description:
      "Work out your mortgage repayment, total interest and payoff date. Add extra repayments and see how much time and interest you could save.",
    type: "website",
    url: "/mortgage-repayments-calculator",
  },
};

const highlights = [
  {
    icon: House,
    title: "Your regular repayment",
    description:
      "See the principal-and-interest payment for monthly, fortnightly or weekly repayments.",
  },
  {
    icon: Percent,
    title: "The true cost of interest",
    description:
      "Understand how much interest the loan attracts and how much of your payment goes towards principal.",
  },
  {
    icon: CalendarDays,
    title: "A clearer payoff picture",
    description:
      "Add extra repayments to see how much sooner the loan could be cleared and how much interest you could save.",
  },
];

const steps = [
  {
    title: "Enter the property and loan details",
    description:
      "Start with the home price, your deposit, the interest rate and the length of the loan. Use the deposit shortcuts to compare common scenarios.",
  },
  {
    title: "Choose how often you repay",
    description:
      "Switch between monthly, fortnightly and weekly payments. The calculator recalculates the scheduled payment for the frequency you select.",
  },
  {
    title: "Test extra repayments",
    description:
      "Add an optional amount on top of each repayment. The summary updates with the interest saved, time saved and new payoff date.",
  },
];

const reductionTips = [
  "Save a larger deposit to reduce the amount you need to borrow.",
  "Compare interest rates carefully — even a small difference adds up over decades.",
  "Choose a shorter term if you can afford a higher regular repayment.",
  "Make extra repayments early, when they have the most time to reduce future interest.",
];

const trustPoints = [
  "Monthly, fortnightly or weekly",
  "Extra repayments and savings",
  "Year-by-year schedule",
];

export default function MortgageRepaymentsPage() {
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
                <House className="size-3" />
                Principal and interest
              </Badge>

              <h1 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                Mortgage repayments{" "}
                <span className="relative whitespace-nowrap">
                  <span className="relative z-10">calculator.</span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-emerald-200/70 sm:h-4"
                  />
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                Work out what your mortgage really costs. Adjust the home price,
                deposit, rate and term, then see how extra repayments could
                shorten the loan and reduce the interest you pay.
              </p>
            </div>

            <div className="mt-10">
              <MortgageCalculator showSchedule />
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
                Three answers, updated together.
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                A mortgage is more than one number. The calculator keeps the
                regular repayment, the total cost and the payoff timeline
                connected as you change each input.
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
                Built on the standard amortisation formula.
              </h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground">
                Each repayment covers the interest charged for that period plus
                whatever is left to reduce the balance. Early payments are
                interest-heavy; later payments are mostly principal.
              </p>

              <Card className="mt-8 gap-3 bg-muted/40 px-5 [--card-spacing:1.25rem]">
                <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                  Repayment formula
                </p>
                <code className="block overflow-x-auto rounded-lg bg-background px-3 py-2.5 font-mono text-sm">
                  M = P × r(1 + r)^n / ((1 + r)^n − 1)
                </code>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  M is the periodic repayment, P is the loan amount, r is the
                  periodic interest rate and n is the number of repayment
                  periods.
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
                Reduce the cost
              </p>
              <h2 className="mt-3 text-3xl leading-[1.1] font-semibold tracking-tight sm:text-4xl">
                Four levers that change what you pay.
              </h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground">
                The cheapest loan is not always the one with the lowest headline
                rate. Deposit size, term, rate and repayment behaviour all work
                together.
              </p>

              <ul className="mt-8 space-y-4">
                {reductionTips.map((tip) => (
                  <li key={tip} className="flex gap-3 text-sm leading-6">
                    <CircleCheck className="mt-0.5 size-5 shrink-0 text-emerald-600" />
                    <span>{tip}</span>
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
                    Small changes compound over time
                  </p>
                </div>
              </div>

              <Separator className="my-5" />

              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">Larger deposit</span>
                  <span className="font-medium text-emerald-700">
                    Smaller loan
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">Lower rate</span>
                  <span className="font-medium text-emerald-700">
                    Less interest
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">Shorter term</span>
                  <span className="font-medium text-emerald-700">
                    Higher repayment
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">
                    Extra repayments
                  </span>
                  <span className="font-medium text-emerald-700">
                    Earlier payoff
                  </span>
                </div>
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
                Mortgage questions, answered.
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                The details behind the repayment figures, so you can use the
                results with confidence.
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

            <MortgageFaq />
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
                  Understand the mortgage. Then grow what comes next.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8">
                  Use the compound interest calculator to see what steady
                  contributions could become once the mortgage is under control.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/#calculators"
                    className={cn(
                      buttonVariants(),
                      "h-11 gap-2 bg-white px-5 text-sm text-zinc-950 hover:bg-zinc-100",
                    )}
                  >
                    Explore the calculators
                    <ArrowRight />
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
