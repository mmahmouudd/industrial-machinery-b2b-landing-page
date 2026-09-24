import { useMemo, useState } from "react";
import { PRODUCTS } from "../data/products";
import { formatCurrency } from "../lib/format";
import { getTier, lineTotal, savingsPercent, savingsVsList, unitPrice } from "../lib/pricing";
import type { Product } from "../types";
import { IconCheck } from "./Icons";

interface BulkPricingProps {
  onAdd: (product: Product, qty: number) => void;
}

export function BulkPricing({ onAdd }: BulkPricingProps) {
  const featured = PRODUCTS.filter((p) => p.featured);
  const [id, setId] = useState(featured[0]?.id ?? PRODUCTS[0].id);
  const product = PRODUCTS.find((p) => p.id === id) ?? PRODUCTS[0];
  const [qty, setQty] = useState(product.moq);

  const onSelect = (next: string) => {
    const p = PRODUCTS.find((x) => x.id === next)!;
    setId(next);
    setQty(p.moq);
  };

  const tier = getTier(product, qty);
  const extended = lineTotal(product, qty);
  const saved = savingsVsList(product, qty);
  const pct = savingsPercent(product, qty);

  const comparison = useMemo(() => {
    return PRODUCTS.slice(0, 6).map((p) => ({
      p,
      t1: p.tiers[0],
      last: p.tiers[p.tiers.length - 1],
    }));
  }, []);

  return (
    <section id="pricing" className="bg-white py-16 sm:py-20" aria-labelledby="pricing-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">Published volume tiers</p>
          <h2 id="pricing-heading" className="mt-1 font-display text-3xl font-extrabold text-navy-950 sm:text-4xl">
            Bulk pricing you can take to finance
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-navy-600">
            No “call for price” theater. Every SKU ships with transparent brackets so procurement can model capex before a sales call. Fleet orders unlock a dedicated account engineer.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <div className="overflow-hidden rounded-2xl border border-navy-100 lg:col-span-7">
            <div className="flex items-center justify-between gap-3 border-b border-navy-100 bg-navy-50 px-4 py-3">
              <label className="text-xs font-bold uppercase tracking-wider text-navy-600" htmlFor="price-sku">
                Select SKU
              </label>
              <select
                id="price-sku"
                value={id}
                onChange={(e) => onSelect(e.target.value)}
                className="rounded-md border border-navy-200 bg-white px-3 py-2 text-sm font-medium"
              >
                {PRODUCTS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.sku} — {p.shortName}
                  </option>
                ))}
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <caption className="sr-only">Volume price tiers for {product.name}</caption>
                <thead className="bg-navy-950 text-white">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Quantity</th>
                    <th className="px-4 py-3 font-semibold">Unit wholesale</th>
                    <th className="px-4 py-3 font-semibold">vs. list</th>
                    <th className="px-4 py-3 font-semibold">Extended</th>
                  </tr>
                </thead>
                <tbody>
                  {product.tiers.map((t) => {
                    const active = t.minQty === tier.minQty;
                    const sampleQty = t.maxQty ?? t.minQty;
                    const ext = t.unitPrice * sampleQty;
                    const save = Math.round(((product.listPrice - t.unitPrice) / product.listPrice) * 100);
                    return (
                      <tr
                        key={t.label}
                        className={active ? "bg-amber-50 font-semibold text-navy-950" : "border-t border-navy-100 text-navy-800"}
                      >
                        <td className="px-4 py-3">
                          {t.label}
                          {active && (
                            <span className="ml-2 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] uppercase tracking-wider text-navy-950">
                              Your tier
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 font-display text-base">{formatCurrency(t.unitPrice)}</td>
                        <td className="px-4 py-3 text-amber-700">−{save}%</td>
                        <td className="px-4 py-3">{formatCurrency(ext)}{t.maxQty === null ? "+" : ""}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="border-t border-navy-100 px-4 py-3 text-xs text-navy-500">
              List {formatCurrency(product.listPrice)} · MOQ {product.moq} · {product.warranty} warranty · Prices EXW origin unless freight is selected at checkout.
            </p>
          </div>

          <div className="rounded-2xl bg-navy-950 p-6 text-white lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Quantity calculator</p>
            <h3 className="mt-2 font-display text-2xl font-bold">{product.shortName}</h3>
            <p className="text-sm text-navy-300">{product.sku}</p>
            <label className="mt-6 block text-xs font-semibold uppercase tracking-wider text-navy-300" htmlFor="bulk-qty">
              Units
            </label>
            <input
              id="bulk-qty"
              type="number"
              min={product.moq}
              value={qty}
              onChange={(e) => setQty(Math.max(product.moq, Number(e.target.value) || product.moq))}
              className="mt-2 w-full rounded-md border border-navy-700 bg-navy-900 px-3 py-3 text-lg font-semibold"
            />
            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-navy-300">Unit price</dt>
                <dd className="font-display text-lg font-bold">{formatCurrency(unitPrice(product, qty))}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-navy-300">Extended</dt>
                <dd>{formatCurrency(extended)}</dd>
              </div>
              <div className="flex justify-between text-amber-400">
                <dt>Saved vs. list</dt>
                <dd className="font-semibold">
                  {formatCurrency(saved)} ({pct.toFixed(0)}%)
                </dd>
              </div>
            </dl>
            <button
              type="button"
              onClick={() => onAdd(product, qty)}
              className="mt-6 w-full rounded-md bg-amber-500 py-3 text-sm font-bold text-navy-950 hover:bg-amber-400"
            >
              Add {qty} to quote cart
            </button>
            <ul className="mt-5 space-y-2 text-sm text-navy-200">
              {["Account engineer assigned at 5+ units", "Blanket PO and scheduled releases", "Spare-parts kit bundled on fleet orders"].map(
                (t) => (
                  <li key={t} className="flex gap-2">
                    <IconCheck className="mt-0.5 shrink-0 text-amber-400" size={16} />
                    {t}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-navy-100">
          <div className="bg-navy-50 px-4 py-3">
            <h3 className="font-display text-lg font-bold text-navy-950">Category snapshot — first-unit vs. fleet</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wider text-navy-500">
                <tr>
                  <th className="px-4 py-3">Machine</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Entry wholesale</th>
                  <th className="px-4 py-3">Deepest tier</th>
                  <th className="px-4 py-3">Lead</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map(({ p, t1, last }) => (
                  <tr key={p.id} className="border-t border-navy-100">
                    <td className="px-4 py-3 font-semibold text-navy-900">{p.shortName}</td>
                    <td className="px-4 py-3 text-navy-600">{p.categoryLabel}</td>
                    <td className="px-4 py-3">{formatCurrency(t1.unitPrice)}</td>
                    <td className="px-4 py-3 text-amber-700">
                      {formatCurrency(last.unitPrice)}
                      <span className="ml-1 text-xs text-navy-500">({last.label})</span>
                    </td>
                    <td className="px-4 py-3">{p.leadTimeDays} days</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
