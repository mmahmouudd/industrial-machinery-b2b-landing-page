import type { Product } from "../types";

export function getTier(product: Product, qty: number) {
  const sorted = [...product.tiers].sort((a, b) => a.minQty - b.minQty);
  let current = sorted[0];
  for (const tier of sorted) {
    if (qty >= tier.minQty) current = tier;
  }
  return current;
}

export function unitPrice(product: Product, qty: number) {
  return getTier(product, qty).unitPrice;
}

export function lineTotal(product: Product, qty: number) {
  return unitPrice(product, qty) * qty;
}

export function savingsVsList(product: Product, qty: number) {
  return product.listPrice * qty - lineTotal(product, qty);
}

export function savingsPercent(product: Product, qty: number) {
  const save = savingsVsList(product, qty);
  return product.listPrice > 0 ? (save / (product.listPrice * qty)) * 100 : 0;
}

export function freightEstimate(weightKg: number, incoterm: string) {
  if (incoterm === "EXW") return 0;
  const base = Math.max(850, weightKg * 1.15);
  if (incoterm === "DDP") return Math.round(base * 1.55);
  if (incoterm === "CIF") return Math.round(base * 1.25);
  return Math.round(base);
}
