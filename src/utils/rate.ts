import { RateString } from "@/types/decimal";

const RATE_SCALE = BigInt(1_000_000);
const MAX_INT64 = BigInt("9223372036854775807");
const RATE_PATTERN = /^(\d+)(?:\.(\d{1,6}))?$/;
const MONEY_INPUT_PATTERN = /^(\d+)(?:\.(\d{0,2}))?$/;
const decimalScale = (decimalPlaces: number): bigint =>
  BigInt(`1${"0".repeat(decimalPlaces)}`);

const roundHalfUp = (numerator: bigint, denominator: bigint): bigint => {
  if (denominator <= BigInt(0)) throw new Error("Expected positive denominator");
  return (BigInt(2) * numerator + denominator) / (BigInt(2) * denominator);
};

export const asRateString = (value: unknown): RateString => {
  if (typeof value !== "string") {
    throw new Error("Expected rate to be a decimal string");
  }

  const match = RATE_PATTERN.exec(value);
  if (!match) throw new Error("Expected a rate with at most six decimal places");

  const whole = match[1].replace(/^0+(?=\d)/, "");
  const fraction = (match[2] ?? "").padEnd(6, "0");
  const microUnits = BigInt(whole) * RATE_SCALE + BigInt(fraction);
  if (microUnits > MAX_INT64) throw new Error("Rate is outside the supported range");

  return `${whole}.${fraction}` as RateString;
};

export const rateToMicroUnits = (value: RateString): bigint => {
  const [whole, fraction] = value.split(".");
  return BigInt(whole) * RATE_SCALE + BigInt(fraction);
};

const formatScaledInteger = (value: bigint, decimalPlaces: number): string => {
  if (decimalPlaces === 0) return value.toString();
  const displayScale = decimalScale(decimalPlaces);
  const whole = value / displayScale;
  const fraction = (value % displayScale)
    .toString()
    .padStart(decimalPlaces, "0");
  return `${whole}.${fraction}`;
};

export const formatRateString = (
  value: RateString,
  decimalPlaces = 2,
): string => {
  const displayScale = decimalScale(decimalPlaces);
  const rounded = roundHalfUp(
    rateToMicroUnits(value) * displayScale,
    RATE_SCALE,
  );
  return formatScaledInteger(rounded, decimalPlaces);
};

const combinedRateRatio = (rates: readonly RateString[]) => {
  return rates.reduce(
    (accumulator, rate) => ({
      numerator: accumulator.numerator * rateToMicroUnits(rate),
      denominator: accumulator.denominator * RATE_SCALE,
    }),
    { numerator: BigInt(1), denominator: BigInt(1) },
  );
};

export const formatCombinedRate = (
  rates: readonly RateString[],
  decimalPlaces = 2,
): string => {
  const ratio = combinedRateRatio(rates);
  const displayScale = decimalScale(decimalPlaces);
  const rounded = roundHalfUp(
    ratio.numerator * displayScale,
    ratio.denominator,
  );
  return formatScaledInteger(rounded, decimalPlaces);
};

export const normalizeMoneyInput = (value: string): string | null => {
  const match = MONEY_INPUT_PATTERN.exec(value.trim());
  if (!match) return null;

  const whole = match[1].replace(/^0+(?=\d)/, "");
  const fraction = (match[2] ?? "").padEnd(2, "0");
  const minorUnits = BigInt(whole) * BigInt(100) + BigInt(fraction);
  if (minorUnits <= BigInt(0) || minorUnits > MAX_INT64) return null;

  return `${whole}.${fraction}`;
};

export const calculatePayoutPreview = (
  money: string,
  rates: readonly RateString[],
): string | null => {
  const normalizedMoney = normalizeMoneyInput(money);
  if (!normalizedMoney) return null;

  const [whole, fraction] = normalizedMoney.split(".");
  const stakeMinor = BigInt(whole) * BigInt(100) + BigInt(fraction);
  const ratio = combinedRateRatio(rates);
  const payoutMinor = roundHalfUp(
    stakeMinor * ratio.numerator,
    ratio.denominator,
  );
  if (payoutMinor > MAX_INT64) return null;

  return formatScaledInteger(payoutMinor, 2);
};

export const getRatePercentages = (
  rateA: RateString,
  rateB: RateString,
): [number, number] => {
  const microA = rateToMicroUnits(rateA);
  const microB = rateToMicroUnits(rateB);
  const total = microA + microB;
  if (total === BigInt(0)) return [50, 50];

  const percentB = Number(roundHalfUp(microA * BigInt(100), total));
  return [100 - percentB, percentB];
};

export const DEFAULT_RATE = asRateString("2.000000");
export const ZERO_RATE = asRateString("0.000000");
