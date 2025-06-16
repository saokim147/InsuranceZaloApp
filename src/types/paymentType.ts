export const CurrencyUnit = {
  VND: "VND",
  AUD: "AUD",
  CAD: "CAD",
  CHF: "CHF",
  EUR: "EUR",
  GBP: "GBP",
  HKD: "HKD",
  JPY: "JPY",
  KRW: "KRW",
  SGD: "SGD",
  THB: "THB",
  USD: "USD",
} as const;

export type CurrencyUnit = (typeof CurrencyUnit)[keyof typeof CurrencyUnit];

export const PaymentMethod = {
  CREDIT_TRANSFER: "C",
  CASH: "T",
} as const;

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];
