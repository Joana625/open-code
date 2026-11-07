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
    question: "What does the mortgage repayments calculator show?",
    answer:
      "It shows your scheduled principal-and-interest repayment for the home price, deposit, interest rate and term you enter. It also calculates the total interest and total amount repaid over the life of the loan.",
  },
  {
    value: "formula",
    question: "How is the repayment calculated?",
    answer:
      "The calculator uses the standard amortisation formula. Interest is applied to the remaining balance each period, and the remainder of your payment reduces the loan. Over time, more of each payment goes towards principal and less towards interest.",
  },
  {
    value: "frequency",
    question: "Does fortnightly or weekly repayment save money?",
    answer:
      "Splitting the same annual repayment into smaller, more frequent payments changes the timing slightly but does not automatically shorten the loan. To pay it down faster, add an extra repayment. The calculator then shows the interest and time saved.",
  },
  {
    value: "extra",
    question: "How do extra repayments help?",
    answer:
      "An extra repayment goes straight towards the loan balance, which reduces the interest charged in future periods. The earlier you make extra repayments, the bigger the effect on total interest and payoff time.",
  },
  {
    value: "fees",
    question: "Are fees, taxes and insurance included?",
    answer:
      "No. The calculator covers principal and interest only. Your real repayment may also include lender fees, property taxes, home insurance and other costs. Use the result to compare loan structures, not as a final quote.",
  },
  {
    value: "privacy",
    question: "Is my information stored?",
    answer:
      "No. Every calculation runs locally in your browser. Nothing you enter is sent to a server or saved between visits.",
  },
];

export function MortgageFaq() {
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
