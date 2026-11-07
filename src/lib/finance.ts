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

export type RepaymentFrequency = "monthly" | "fortnightly" | "weekly";

export const repaymentFrequencies: Record<
  RepaymentFrequency,
  { label: string; shortLabel: string; perYear: number }
> = {
  monthly: { label: "Monthly", shortLabel: "mo", perYear: 12 },
  fortnightly: { label: "Fortnightly", shortLabel: "fortnight", perYear: 26 },
  weekly: { label: "Weekly", shortLabel: "wk", perYear: 52 },
};

export type MortgageInputs = {
  homePrice: number;
  deposit: number;
  annualRate: number;
  years: number;
  frequency?: RepaymentFrequency;
  extraRepayment?: number;
};

export const defaultMortgageInputs: MortgageInputs = {
  homePrice: 450_000,
  deposit: 90_000,
  annualRate: 6.25,
  years: 30,
  frequency: "monthly",
  extraRepayment: 0,
};

export type MortgageResult = {
  homePrice: number;
  deposit: number;
  loan: number;
  payment: number;
  scheduledPayment: number;
  monthlyPayment: number;
  totalRepayment: number;
  totalInterest: number;
  depositPercent: number;
  months: number;
  periods: number;
  payoffPeriods: number;
  payoffMonths: number;
  paymentsPerYear: number;
  frequency: RepaymentFrequency;
  extraRepayment: number;
};

type MortgagePlan = {
  price: number;
  deposit: number;
  loan: number;
  frequency: RepaymentFrequency;
  perYear: number;
  periods: number;
  periodicRate: number;
  scheduledPayment: number;
  payment: number;
  extraRepayment: number;
};

function createMortgagePlan({
  homePrice,
  deposit,
  annualRate,
  years,
  frequency = "monthly",
  extraRepayment = 0,
}: MortgageInputs): MortgagePlan {
  const price = Math.max(homePrice, 0);
  const safeDeposit = Math.min(Math.max(deposit, 0), price);
  const loan = Math.max(price - safeDeposit, 0);
  const perYear = repaymentFrequencies[frequency].perYear;
  const periods = Math.max(Math.round(years * perYear), 1);
  const periodicRate = Math.max(annualRate, 0) / 100 / perYear;
  const safeExtra = Math.max(extraRepayment, 0);

  const scheduledPayment =
    loan === 0
      ? 0
      : periodicRate === 0
        ? loan / periods
        : (loan * periodicRate * Math.pow(1 + periodicRate, periods)) /
          (Math.pow(1 + periodicRate, periods) - 1);

  return {
    price,
    deposit: safeDeposit,
    loan,
    frequency,
    perYear,
    periods,
    periodicRate,
    scheduledPayment,
    payment: loan === 0 ? 0 : scheduledPayment + safeExtra,
    extraRepayment: safeExtra,
  };
}

type MortgageSimulation = {
  totalInterest: number;
  totalRepayment: number;
  payoffPeriods: number;
  balances: number[];
};

function simulatePlan(plan: MortgagePlan): MortgageSimulation {
  const { loan, periods, periodicRate, payment } = plan;

  if (loan === 0) {
    return {
      totalInterest: 0,
      totalRepayment: 0,
      payoffPeriods: 0,
      balances: [0],
    };
  }

  let balance = loan;
  let totalInterest = 0;
  let totalRepayment = 0;
  let payoffPeriods = 0;
  const balances = [loan];

  for (let period = 1; period <= periods; period += 1) {
    const interest = balance * periodicRate;
    const principal = Math.min(Math.max(payment - interest, 0), balance);

    if (principal <= 0 && interest > 0) {
      break;
    }

    balance = Math.max(balance - principal, 0);
    totalInterest += interest;
    totalRepayment += principal + interest;
    payoffPeriods = period;
    balances.push(balance);

    if (balance <= 0.005) {
      balance = 0;
      break;
    }
  }

  return { totalInterest, totalRepayment, payoffPeriods, balances };
}

export function calculateMortgage(inputs: MortgageInputs): MortgageResult {
  const plan = createMortgagePlan(inputs);
  const simulation = simulatePlan(plan);

  return {
    homePrice: plan.price,
    deposit: plan.deposit,
    loan: plan.loan,
    payment: plan.payment,
    scheduledPayment: plan.scheduledPayment,
    monthlyPayment: plan.payment * (12 / plan.perYear),
    totalRepayment: simulation.totalRepayment,
    totalInterest: Math.max(simulation.totalInterest, 0),
    depositPercent: plan.price > 0 ? (plan.deposit / plan.price) * 100 : 0,
    months: Math.max(Math.round(Math.max(inputs.years, 0) * 12), 1),
    periods: plan.periods,
    payoffPeriods: simulation.payoffPeriods,
    payoffMonths: Math.round((simulation.payoffPeriods * 12) / plan.perYear),
    paymentsPerYear: plan.perYear,
    frequency: plan.frequency,
    extraRepayment: plan.extraRepayment,
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

/** Remaining loan balance at sampled payment periods, starting with the full loan. */
export function mortgageBalanceSeries(inputs: MortgageInputs, maxSamples = 48) {
  const plan = createMortgagePlan(inputs);

  if (plan.loan === 0) {
    return [0, 0];
  }

  const { balances } = simulatePlan(plan);
  const lastIndex = balances.length - 1;

  if (lastIndex <= maxSamples) {
    return balances;
  }

  return sampleIndexes(lastIndex, maxSamples).map((index) => balances[index]);
}

export type MortgageScheduleYear = {
  year: number;
  principal: number;
  interest: number;
  total: number;
  balance: number;
};

/** One row per year, aggregating the selected repayment frequency. */
export function mortgageAmortisationSchedule(
  inputs: MortgageInputs,
): MortgageScheduleYear[] {
  const plan = createMortgagePlan(inputs);

  if (plan.loan === 0) {
    return [];
  }

  const rows: MortgageScheduleYear[] = [];
  let balance = plan.loan;
  let current: MortgageScheduleYear = {
    year: 1,
    principal: 0,
    interest: 0,
    total: 0,
    balance,
  };

  for (let period = 1; period <= plan.periods; period += 1) {
    const interest = balance * plan.periodicRate;
    const principal = Math.min(Math.max(plan.payment - interest, 0), balance);

    if (principal <= 0 && interest > 0) {
      break;
    }

    balance = Math.max(balance - principal, 0);
    current.principal += principal;
    current.interest += interest;
    current.total += principal + interest;
    current.balance = balance;

    if (period % plan.perYear === 0 || balance <= 0.005) {
      rows.push({ ...current });

      if (balance <= 0.005) {
        break;
      }

      current = {
        year: current.year + 1,
        principal: 0,
        interest: 0,
        total: 0,
        balance,
      };
    }
  }

  if (current.principal > 0 && rows[rows.length - 1]?.year !== current.year) {
    rows.push({ ...current });
  }

  return rows;
}

export type ContributionFrequency = "monthly" | "quarterly" | "yearly";

export const contributionFrequencies: Record<
  ContributionFrequency,
  {
    label: string;
    shortLabel: string;
    perYear: number;
    monthsPerContribution: number;
  }
> = {
  monthly: {
    label: "Monthly",
    shortLabel: "mo",
    perYear: 12,
    monthsPerContribution: 1,
  },
  quarterly: {
    label: "Quarterly",
    shortLabel: "quarter",
    perYear: 4,
    monthsPerContribution: 3,
  },
  yearly: {
    label: "Yearly",
    shortLabel: "year",
    perYear: 1,
    monthsPerContribution: 12,
  },
};

export type CompoundInputs = {
  initial: number;
  contribution: number;
  annualRate: number;
  years: number;
  contributionFrequency?: ContributionFrequency;
};

export const defaultCompoundInputs: CompoundInputs = {
  initial: 5_000,
  contribution: 400,
  annualRate: 7,
  years: 25,
  contributionFrequency: "monthly",
};

export type CompoundResult = {
  futureValue: number;
  contributed: number;
  interest: number;
  months: number;
  contributionCount: number;
  paymentsPerYear: number;
  contributionFrequency: ContributionFrequency;
};

export function calculateCompound({
  initial,
  contribution,
  annualRate,
  years,
  contributionFrequency = "monthly",
}: CompoundInputs): CompoundResult {
  const startingAmount = Math.max(initial, 0);
  const contributionAmount = Math.max(contribution, 0);
  const months = Math.max(Math.round(years * 12), 0);
  const monthlyRate = Math.max(annualRate, 0) / 100 / 12;
  const frequency = contributionFrequencies[contributionFrequency];

  let balance = startingAmount;
  let contributed = startingAmount;
  let contributionCount = 0;

  for (let month = 1; month <= months; month += 1) {
    balance *= 1 + monthlyRate;

    if (month % frequency.monthsPerContribution === 0) {
      balance += contributionAmount;
      contributed += contributionAmount;
      contributionCount += 1;
    }
  }

  return {
    futureValue: balance,
    contributed,
    interest: Math.max(balance - contributed, 0),
    months,
    contributionCount,
    paymentsPerYear: frequency.perYear,
    contributionFrequency,
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

    points.push({
      year,
      contributed: result.contributed,
      balance: result.futureValue,
      interest: result.interest,
    });
  }

  return points;
}

export type CompoundScheduleYear = {
  year: number;
  startingBalance: number;
  contributions: number;
  interest: number;
  endingBalance: number;
};

/** One row per year, aggregating contributions and monthly growth. */
export function compoundSchedule(
  inputs: CompoundInputs,
): CompoundScheduleYear[] {
  const frequency =
    contributionFrequencies[inputs.contributionFrequency ?? "monthly"];
  const startingAmount = Math.max(inputs.initial, 0);
  const contributionAmount = Math.max(inputs.contribution, 0);
  const months = Math.max(Math.round(inputs.years * 12), 0);
  const monthlyRate = Math.max(inputs.annualRate, 0) / 100 / 12;
  const rows: CompoundScheduleYear[] = [];

  let balance = startingAmount;
  let yearStart = startingAmount;
  let yearContributions = 0;

  for (let month = 1; month <= months; month += 1) {
    balance *= 1 + monthlyRate;

    if (month % frequency.monthsPerContribution === 0) {
      balance += contributionAmount;
      yearContributions += contributionAmount;
    }

    const atYearEnd = month % 12 === 0;
    const atFinalMonth = month === months;

    if (atYearEnd || atFinalMonth) {
      rows.push({
        year: Math.ceil(month / 12),
        startingBalance: yearStart,
        contributions: yearContributions,
        interest: Math.max(balance - yearStart - yearContributions, 0),
        endingBalance: balance,
      });

      yearStart = balance;
      yearContributions = 0;
    }
  }

  return rows;
}
