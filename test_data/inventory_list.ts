/*
 * Hardcoded catalog of every inventory item shown on the inventory page.
 * SauceDemo does not expose a database or an API we can query for this
 * catalog, so the names, descriptions, and prices cannot be fetched at
 * runtime. The store always renders the same fixed set of products, and
 * that full set is known ahead of time, which is why the list lives here
 * as test data instead of being loaded from an external source.
 */

export interface InventoryItem {
  name: string;
  description: string;
  price: string;
}

export const inventoryList: InventoryItem[] = [
  {
    name: "Sauce Labs Backpack",
    description:
      "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
    price: "$29.99",
  },
  {
    name: "Sauce Labs Bike Light",
    description:
      "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
    price: "$9.99",
  },
  {
    name: "Sauce Labs Bolt T-Shirt",
    description:
      "Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.",
    price: "$15.99",
  },
  {
    name: "Sauce Labs Fleece Jacket",
    description:
      "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
    price: "$49.99",
  },
  {
    name: "Sauce Labs Onesie",
    description:
      "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.",
    price: "$7.99",
  },
  {
    name: "Test.allTheThings() T-Shirt (Red)",
    description:
      "This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.",
    price: "$15.99",
  },
];
