import Link from "next/link";
import { Calculator } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = [
  { href: "/mortgage-repayments-calculator", label: "Mortgage calculator" },
  { href: "/compound-interest-calculator", label: "Compound calculator" },
  { href: "/#calculators", label: "All calculators" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link
              href="/"
              className="flex items-center gap-2.5"
              aria-label="Ratewise home"
            >
              <span className="grid size-8 place-items-center rounded-lg bg-zinc-950 text-white">
                <Calculator className="size-4" />
              </span>
              <span className="text-[15px] font-semibold tracking-tight">
                Ratewise
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Clear mortgage repayment and compound interest calculators for
              people who would rather understand the numbers than guess.
            </p>
          </div>

          <nav
            className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm sm:grid-cols-2"
            aria-label="Footer"
          >
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
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
  );
}
