export const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const compactCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

export function formatCurrency(value: number) {
  return currency.format(Number.isFinite(value) ? value : 0);
}

export function formatCompactCurrency(value: number) {
  return compactCurrency.format(Number.isFinite(value) ? value : 0);
}

export type MortgageInputs = {
  homePrice: number;
  deposit: number;
  annualRate: number;
  years: number;
};

export const defaultMortgageInputs: MortgageInputs = {
  homePrice: 450_000,
  deposit: 90_000,
  annualRate: 6.25,
  years: 30,
};

export type MortgageResult = {
  homePrice: number;
  deposit: number;
  loan: number;
  monthlyPayment: number;
  totalRepayment: number;
  totalInterest: number;
  depositPercent: number;
  months: number;
};

export function calculateMortgage({
  homePrice,
  deposit,
  annualRate,
  years,
}: MortgageInputs): MortgageResult {
  const price = Math.max(homePrice, 0);
  const safeDeposit = Math.min(Math.max(deposit, 0), price);
  const loan = Math.max(price - safeDeposit, 0);
  const months = Math.max(Math.round(years * 12), 1);
  const monthlyRate = Math.max(annualRate, 0) / 100 / 12;

  const monthlyPayment =
    loan === 0
      ? 0
      : monthlyRate === 0
        ? loan / months
        : (loan * monthlyRate * Math.pow(1 + monthlyRate, months)) /
          (Math.pow(1 + monthlyRate, months) - 1);

  const totalRepayment = monthlyPayment * months;

  return {
    homePrice: price,
    deposit: safeDeposit,
    loan,
    monthlyPayment,
    totalRepayment,
    totalInterest: Math.max(totalRepayment - loan, 0),
    depositPercent: price > 0 ? (safeDeposit / price) * 100 : 0,
    months,
  };
}

function sampleIndexes(total: number, maxSamples: number) {
  if (total <= maxSamples) {
    return Array.from({ length: total + 1 }, (_, index) => index);
  }

  const step = Math.ceil(total / maxSamples);
  const indexes: number[] = [];

  for (let index = 0; index <= total; index += step) {
    indexes.push(index);
  }

  if (indexes[indexes.length - 1] !== total) {
    indexes.push(total);
  }

  return indexes;
}

/** Remaining loan balance at sampled months, starting with the full loan. */
export function mortgageBalanceSeries(inputs: MortgageInputs, maxSamples = 48) {
  const { loan, monthlyPayment } = calculateMortgage(inputs);

  if (loan === 0) {
    return [0, 0];
  }

  const months = Math.max(Math.round(inputs.years * 12), 1);
  const monthlyRate = Math.max(inputs.annualRate, 0) / 100 / 12;
  const indexes = new Set(sampleIndexes(months, maxSamples));
  const balances: number[] = [];

  let balance = loan;

  for (let month = 0; month <= months; month += 1) {
    if (indexes.has(month)) {
      balances.push(Math.max(balance, 0));
    }

    const interest = balance * monthlyRate;
    balance = Math.max(balance + interest - monthlyPayment, 0);
  }

  return balances;
}

export type CompoundInputs = {
  initial: number;
  monthly: number;
  annualRate: number;
  years: number;
};

export const defaultCompoundInputs: CompoundInputs = {
  initial: 5_000,
  monthly: 400,
  annualRate: 7,
  years: 25,
};

export type CompoundResult = {
  futureValue: number;
  contributed: number;
  interest: number;
  months: number;
};

export function calculateCompound({
  initial,
  monthly,
  annualRate,
  years,
}: CompoundInputs): CompoundResult {
  const startingAmount = Math.max(initial, 0);
  const monthlyContribution = Math.max(monthly, 0);
  const months = Math.max(Math.round(years * 12), 0);
  const monthlyRate = Math.max(annualRate, 0) / 100 / 12;
  const growth = Math.pow(1 + monthlyRate, months);

  const futureValue =
    startingAmount * growth +
    (monthlyRate === 0
      ? monthlyContribution * months
      : monthlyContribution * ((growth - 1) / monthlyRate));

  const contributed = startingAmount + monthlyContribution * months;

  return {
    futureValue,
    contributed,
    interest: Math.max(futureValue - contributed, 0),
    months,
  };
}

export type CompoundPoint = {
  year: number;
  contributed: number;
  balance: number;
  interest: number;
};

/** One point per year, including year zero. */
export function compoundSeries(inputs: CompoundInputs): CompoundPoint[] {
  const years = Math.max(Math.min(Math.round(inputs.years), 60), 0);
  const points: CompoundPoint[] = [];

  for (let year = 0; year <= years; year += 1) {
    const result = calculateCompound({ ...inputs, years: year });
    const contributed =
      Math.max(inputs.initial, 0) + Math.max(inputs.monthly, 0) * 12 * year;

    points.push({
      year,
      contributed,
      balance: result.futureValue,
      interest: Math.max(result.futureValue - contributed, 0),
    });
  }

  return points;
}
