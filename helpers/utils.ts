import { expect } from "@playwright/test";
export type SortBy = "Name (A to Z)" | "Name (Z to A)" | "Price (low to high)" | "Price (high to low)";

export function isSorted(values: string[] | number[], order: SortBy): void {
  const receivedValues = [...values];
  const expectedValues = [...values];

  switch (order) {
    case "Name (A to Z)":
      (expectedValues as string[]).sort();
      break;

    case "Name (Z to A)":
      (expectedValues as string[]).sort().reverse();
      break;

    case "Price (low to high)":
      (expectedValues as number[]).sort((a, b) => a - b);
      break;

    case "Price (high to low)":
      (expectedValues as number[]).sort((a, b) => b - a);
      break;
  }

  expect(receivedValues).toEqual(expectedValues);
}
