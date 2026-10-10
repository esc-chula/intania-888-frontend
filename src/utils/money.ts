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
