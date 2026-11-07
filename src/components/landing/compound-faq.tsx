"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    value: "compound-interest",
    question: "What is compound interest?",
    answer:
      "Compound interest is interest earned on both your original balance and the interest that has already been added. Each period, the balance grows, so future interest is calculated on a larger amount. Over long periods, this can become the biggest driver of growth.",
  },
  {
    value: "calculation",
    question: "How does the calculator work?",
    answer:
      "The calculator compounds your balance monthly at the annual return you enter. Contributions are then added at the end of each contribution period. The chart and schedule show how much of the final balance comes from your money versus interest earned.",
  },
  {
    value: "frequency",
    question: "Should I contribute monthly, quarterly or yearly?",
    answer:
      "More frequent contributions generally help because each amount starts compounding sooner. Monthly contributions usually produce a higher final balance than the same annual total contributed once a year. Use the frequency selector to compare.",
  },
  {
    value: "timing",
    question: "When are contributions added?",
    answer:
      "Contributions are added at the end of each month, quarter or year, depending on the frequency you select. The amount you enter is the contribution for one period, not the monthly equivalent.",
  },
  {
    value: "guaranteed",
    question: "Are the projected returns guaranteed?",
    answer:
      "No. The result depends on the annual return you assume, and real investments move up and down. Treat the projection as an illustration of compounding, not a promise of future performance.",
  },
  {
    value: "inflation",
    question: "Does the calculator account for inflation?",
    answer:
      "No. The projected balance is shown in future dollars before inflation. The real purchasing power of that balance may be lower. For long horizons, it can help to compare the result with a more conservative return assumption.",
  },
  {
    value: "privacy",
    question: "Is my information stored?",
    answer:
      "No. Every calculation runs locally in your browser. Nothing you enter is sent to a server or saved between visits.",
  },
];

export function CompoundFaq() {
  return (
    <Accordion defaultValue={["compound-interest"]}>
      {faqs.map((faq) => (
        <AccordionItem key={faq.value} value={faq.value} className="py-1">
          <AccordionTrigger className="py-4 text-base">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
