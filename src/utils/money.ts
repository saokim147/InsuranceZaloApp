export const formatMoney = (value: number): string => {
  return value ? value.toLocaleString("it-IT") : "";
};

export const parseMoney = (value: string): number => {
  const digits = value.replace(/\D/g, "");
  return digits ? Number(digits) : 0;
};
