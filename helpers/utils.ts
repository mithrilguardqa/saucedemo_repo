import { expect } from "@playwright/test";
import { InventoryItem } from "../test_data/inventory_list";

export const getRandomProduct = (products: InventoryItem[]): InventoryItem => {
  return products[Math.floor(Math.random() * products.length)];
};

export type SortBy =
  | "Name (A to Z)"
  | "Name (Z to A)"
  | "Price (low to high)"
  | "Price (high to low)";

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

export const generateRandomString = (
  length?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13,
): string => {
  const timestampString: number = Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000);

  // If length is undefined, default to 13
  const validLength: number = length ? length : 13;

  // Return the last `validLength` characters of the timestamp
  return timestampString.toString().slice(-validLength);
};

export function toProductSlug(productName: string): string {
  return productName.toLowerCase().replace(/ /g, "-");
}
