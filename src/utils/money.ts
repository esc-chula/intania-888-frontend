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

