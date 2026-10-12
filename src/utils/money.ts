import { MoneyString } from "@/types/leaderboard";

const MONEY_PATTERN = /^\d+\.\d{2}$/;

export const asMoneyString = (value: unknown): MoneyString => {
  if (typeof value !== "string" || !MONEY_PATTERN.test(value)) {
    throw new Error("Expected an exact money string with two decimal places");
  }

  return value as MoneyString;
};

export const formatMoneyString = (value: MoneyString): string => {
  const [whole, fraction] = value.split(".");
  const groupedWhole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `${groupedWhole}.${fraction}`;
};

export const compareMoneyStrings = (
  left: MoneyString,
  right: MoneyString
): number => {
  const [leftWhole, leftFraction] = left.split(".");
  const [rightWhole, rightFraction] = right.split(".");
  const normalizedLeftWhole = leftWhole.replace(/^0+(?=\d)/, "");
  const normalizedRightWhole = rightWhole.replace(/^0+(?=\d)/, "");

  if (normalizedLeftWhole.length !== normalizedRightWhole.length) {
    return normalizedLeftWhole.length - normalizedRightWhole.length;
  }

  const wholeComparison = normalizedLeftWhole.localeCompare(
    normalizedRightWhole
  );

  return wholeComparison || leftFraction.localeCompare(rightFraction);
};

const moneyToMinorUnits = (value: MoneyString): bigint => {
  const [whole, fraction] = value.split(".");
  return BigInt(whole) * BigInt(100) + BigInt(fraction);
};

const minorUnitsToMoney = (value: bigint): MoneyString => {
  const whole = value / BigInt(100);
  const fraction = (value % BigInt(100)).toString().padStart(2, "0");
  return `${whole}.${fraction}` as MoneyString;
};

export const normalizeMoneyStringInput = (value: string): MoneyString | null => {
  const match = /^(\d+)(?:\.(\d{0,2}))?$/.exec(value.trim());
  if (!match) return null;

  const whole = match[1].replace(/^0+(?=\d)/, "");
  const fraction = (match[2] ?? "").padEnd(2, "0");
  return `${whole}.${fraction}` as MoneyString;
};

export const sumMoneyStrings = (values: readonly MoneyString[]): MoneyString =>
  minorUnitsToMoney(
    values.reduce(
      (total, value) => total + moneyToMinorUnits(value),
      BigInt(0),
    ),
  );

export const averageMoneyStrings = (
  values: readonly MoneyString[],
): MoneyString => {
  if (values.length === 0) return asMoneyString("0.00");
  const total = moneyToMinorUnits(sumMoneyStrings(values));
  const count = BigInt(values.length);
  return minorUnitsToMoney(
    (BigInt(2) * total + count) / (BigInt(2) * count),
  );
};
