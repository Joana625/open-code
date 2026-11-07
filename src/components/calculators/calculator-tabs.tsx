"use client";

import { House, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompoundInterestCalculator } from "./compound-interest-calculator";
import { MortgageCalculator } from "./mortgage-calculator";

export function CalculatorTabs() {
  return (
    <Tabs defaultValue="mortgage" className="gap-0">
      <TabsList className="mx-auto w-full max-w-md">
        <TabsTrigger value="mortgage">
          <House />
          <span className="min-[380px]:hidden">Mortgage</span>
          <span className="hidden min-[380px]:inline">Mortgage repayment</span>
        </TabsTrigger>
        <TabsTrigger value="compound">
          <TrendingUp />
          <span className="min-[380px]:hidden">Compound</span>
          <span className="hidden min-[380px]:inline">Compound interest</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="mortgage" className="mt-6">
        <MortgageCalculator />
      </TabsContent>
      <TabsContent value="compound" className="mt-6">
        <CompoundInterestCalculator />
      </TabsContent>
    </Tabs>
  );
}
