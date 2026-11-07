import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "#features", label: "Features" },
  { href: "#calculators", label: "Calculators" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label="Ratewise home"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-zinc-950 text-white shadow-sm">
            <Calculator className="size-4" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">
            Ratewise
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#calculators"
          className={cn(buttonVariants({ size: "sm" }), "h-9 px-3.5")}
        >
          Try the calculators
          <ArrowRight />
        </a>
      </div>
    </header>
  );
}
