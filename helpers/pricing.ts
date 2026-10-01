export function priceParsing(value: string): number {
  return Number(value.replace(/[^\d.-]/g, ""));
}

export function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateTax(itemPrice: number): number {
  return roundMoney(itemPrice * 0.08);
}
