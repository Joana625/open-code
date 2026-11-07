"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    value: "repayment",
    question: "How is the monthly mortgage repayment calculated?",
    answer:
      "We use the standard principal-and-interest amortisation formula, based on your loan amount, interest rate and term. The result is what you would pay each month to fully repay the loan by the end of the term, assuming the rate never changes.",
  },
  {
    value: "compound",
    question: "What does the compound interest calculator show?",
    answer:
      "It projects what your starting balance and regular contributions could be worth over time. Interest is compounded monthly, and the chart splits your final balance into the money you contributed and the interest earned on top.",
  },
  {
    value: "fees",
    question: "Are fees, taxes and insurance included?",
    answer:
      "No. The mortgage calculator shows principal and interest only, so it is best used to compare loan offers. Your actual repayment may also include lender fees, property taxes, home insurance and other costs.",
  },
  {
    value: "guarantee",
    question: "Are the projected investment returns guaranteed?",
    answer:
      "No. Compound growth depends on the return you assume, and real investments move up and down. Treat the projection as an illustration of how compounding works, not a promise of future performance.",
  },
  {
    value: "privacy",
    question: "Do you store the numbers I enter?",
    answer:
      "No. Every calculation runs in your browser, and nothing you type is sent to a server or saved between visits. Close the page and your figures are gone.",
  },
];

export function Faq() {
  return (
    <Accordion defaultValue={["repayment"]}>
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
