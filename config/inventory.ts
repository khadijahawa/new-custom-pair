import { Image } from "sanity";

interface InventoryProduct {
  id: string;
  name: string;
  image: string;
  images: string[];
  categories: string[];
  sizes: string[];
  colors: string[];
  price: number;
  currency: string;
  details: string;
  sku: string;
}

export interface SanityProduct extends Omit<InventoryProduct, "images"> {
  map(
    arg0: (item: any, i: any) => import("react").JSX.Element
  ): import("react").ReactNode;
  _id: string;
  name: string;
  images: Image[];
  price: number;
  details: string;
  brand: string;
}

// export const inventory: InventoryProduct[] = [
//   {
//     id: "64da6006-a4bb-4555-af78-3467853eb75e",
//     sku: "canvas_tote_bag_1",
//     name: "Canvas Tote Bag",
//     details: `Meet your new favorite carry-on. Our supersized tote is crafted in durable waxed cotton canvas that's rugged and durable, ideal for hauling all of your stuff. This size takes you to and from the farmer's market, the gym or a weekend getaway.`,
//     price: 16800, // price in smallest currency unit (e.g. cent for USD)
//     image:
//       "https://fullstackdotso.nyc3.cdn.digitaloceanspaces.com/canvas-tote-bag-1.jpg",
//     images: [
//       "https://fullstackdotso.nyc3.cdn.digitaloceanspaces.com/canvas-tote-bag-1.jpg",
//       "https://fullstackdotso.nyc3.cdn.digitaloceanspaces.com/canvas-tote-bag-2.jpg",
//       "https://fullstackdotso.nyc3.cdn.digitaloceanspaces.com/canvas-tote-bag-3.jpg",
//     ],
//     sizes: ["one-size"],
//     categories: ["bags"],
//     colors: ["brown"],
//     currency: "USD",
//   },
// ];
