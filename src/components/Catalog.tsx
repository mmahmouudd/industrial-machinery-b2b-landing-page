import { useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS } from "../data/products";
import { formatCurrency, leadTimeLabel } from "../lib/format";
import { savingsPercent, unitPrice } from "../lib/pricing";
import type { Category, Product } from "../types";
import { cn } from "../utils/cn";
import {
  IconCheck,
  IconClock,
  IconClose,
  IconFilter,
  IconGrid,
  IconList,
  IconMinus,
  IconPlus,
  IconSearch,
  IconSliders,
} from "./Icons";

type SortKey = "relevance" | "price-asc" | "price-desc" | "lead" | "name";
type ViewMode = "grid" | "list";

interface CatalogProps {
  search: string;
  onSearch: (q: string) => void;
  onAdd: (product: Product, qty: number) => void;
  onQuickView: (product: Product) => void;
  categoryPreset: Category | "all";
  onCategoryPreset: (c: Category | "all") => void;
}

export function Catalog({
  search,
  onSearch,
  onAdd,
  onQuickView,
  categoryPreset,
  onCategoryPreset,
}: CatalogProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedCats, setSelectedCats] = useState<Category[]>([]);
  const [availability, setAvailability] = useState<"all" | "stock" | "order">("all");
  const [certs, setCerts] = useState<string[]>([]);
  const [lead, setLead] = useState<"all" | "fast" | "std" | "long">("all");
  const [maxPrice, setMaxPrice] = useState(190000);
  const [sort, setSort] = useState<SortKey>("relevance");
  const [view, setView] = useState<ViewMode>("grid");
  const [qtyMap, setQtyMap] = useState<Record<string, number>>({});

  const activeCats = categoryPreset === "all" ? selectedCats : [categoryPreset];

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      if (activeCats.length && !activeCats.includes(p.category)) return false;
      if (availability === "stock" && !p.inStock) return false;
      if (availability === "order" && p.inStock) return false;
      if (certs.length && !certs.every((c) => p.certifications.includes(c))) return false;
      if (lead === "fast" && p.leadTimeDays > 21) return false;
      if (lead === "std" && (p.leadTimeDays <= 21 || p.leadTimeDays > 45)) return false;
      if (lead === "long" && p.leadTimeDays <= 45) return false;
      if (p.tiers[0].unitPrice > maxPrice) return false;
      if (q) {
        const hay = `${p.name} ${p.sku} ${p.shortName} ${p.description} ${p.categoryLabel}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    list = [...list].sort((a, b) => {
      if (sort === "price-asc") return a.tiers[0].unitPrice - b.tiers[0].unitPrice;
      if (sort === "price-desc") return b.tiers[0].unitPrice - a.tiers[0].unitPrice;
      if (sort === "lead") return a.leadTimeDays - b.leadTimeDays;
      if (sort === "name") return a.name.localeCompare(b.name);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
    return list;
  }, [search, activeCats, availability, certs, lead, maxPrice, sort]);

  const toggleCat = (c: Category) => {
    onCategoryPreset("all");
    setSelectedCats((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  };

  const toggleCert = (c: string) => {
    setCerts((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  };

  const clearFilters = () => {
    setSelectedCats([]);
    setAvailability("all");
    setCerts([]);
    setLead("all");
    setMaxPrice(190000);
    onCategoryPreset("all");
    onSearch("");
  };

  const chipCount =
    (categoryPreset !== "all" ? 1 : selectedCats.length) +
    (availability !== "all" ? 1 : 0) +
    certs.length +
    (lead !== "all" ? 1 : 0) +
    (maxPrice < 190000 ? 1 : 0);

  const qtyFor = (p: Product) => qtyMap[p.id] ?? p.moq;
  const setQty = (p: Product, n: number) =>
    setQtyMap((m) => ({ ...m, [p.id]: Math.max(p.moq, n) }));

  const filterPanel = (
    <div className="space-y-6">
      <fieldset>
        <legend className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-navy-600">Category</legend>
        <div className="space-y-1.5">
          {CATEGORIES.map((c) => (
            <label key={c.id} className="flex cursor-pointer items-center gap-2 text-sm text-navy-800">
              <input
                type="checkbox"
                checked={activeCats.includes(c.id)}
                onChange={() => toggleCat(c.id)}
                className="h-4 w-4 accent-amber-500"
              />
              {c.label}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-navy-600">Availability</legend>
        <div className="space-y-1.5">
          {(
            [
              ["all", "Any status"],
              ["stock", "In stock now"],
              ["order", "Made to order"],
            ] as const
          ).map(([v, l]) => (
            <label key={v} className="flex cursor-pointer items-center gap-2 text-sm text-navy-800">
              <input
                type="radio"
                name="avail"
                checked={availability === v}
                onChange={() => setAvailability(v)}
                className="h-4 w-4 accent-amber-500"
              />
              {l}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-navy-600">Lead time</legend>
        <div className="space-y-1.5">
          {(
            [
              ["all", "Any lead time"],
              ["fast", "21 days or less"],
              ["std", "3–6 weeks"],
              ["long", "Over 6 weeks"],
            ] as const
          ).map(([v, l]) => (
            <label key={v} className="flex cursor-pointer items-center gap-2 text-sm text-navy-800">
              <input
                type="radio"
                name="lead"
                checked={lead === v}
                onChange={() => setLead(v)}
                className="h-4 w-4 accent-amber-500"
              />
              {l}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-navy-600">
          Max wholesale unit price
        </legend>
        <input
          type="range"
          min={3000}
          max={190000}
          step={1000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="input-range w-full"
          aria-valuetext={formatCurrency(maxPrice)}
        />
        <p className="mt-1 text-sm font-semibold text-navy-800">Up to {formatCurrency(maxPrice)}</p>
      </fieldset>
      <fieldset>
        <legend className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-navy-600">Certifications</legend>
        <div className="flex flex-wrap gap-2">
          {["CE", "ISO 9001", "UL", "OSHA", "FDA", "AS9100"].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => toggleCert(c)}
              className={cn(
                "rounded-full border px-2.5 py-1 text-xs font-semibold",
                certs.includes(c)
                  ? "border-navy-900 bg-navy-900 text-white"
                  : "border-navy-200 bg-white text-navy-700 hover:border-navy-400",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </fieldset>
      <button type="button" onClick={clearFilters} className="text-sm font-semibold text-navy-600 underline-offset-2 hover:underline">
        Reset all filters
      </button>
    </div>
  );

  return (
    <section id="catalog" className="bg-navy-50 py-16 sm:py-20" aria-labelledby="catalog-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">Wholesale catalog</p>
            <h2 id="catalog-heading" className="mt-1 font-display text-3xl font-extrabold text-navy-950 sm:text-4xl">
              Specify, filter, and quote
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-navy-600">
              Search by SKU or capability. Filter by certification, lead time, and stock. Unit prices shown are wholesale—list is struck through.
            </p>
          </div>
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <button
            type="button"
            onClick={() => {
              onCategoryPreset("all");
              setSelectedCats([]);
            }}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-semibold",
              categoryPreset === "all" && selectedCats.length === 0
                ? "bg-navy-900 text-white"
                : "bg-white text-navy-700 ring-1 ring-navy-200",
            )}
          >
            All machinery
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => onCategoryPreset(c.id)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-semibold",
                categoryPreset === c.id ? "bg-navy-900 text-white" : "bg-white text-navy-700 ring-1 ring-navy-200",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28 rounded-xl border border-navy-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-navy-950">
                <IconSliders size={18} /> Filters
                {chipCount > 0 && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">{chipCount}</span>
                )}
              </div>
              {filterPanel}
            </div>
          </aside>

          <div className="lg:col-span-9">
            <div className="flex flex-col gap-3 rounded-xl border border-navy-100 bg-white p-3 shadow-sm sm:flex-row sm:items-center">
              <div className="relative min-w-0 flex-1">
                <IconSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" size={18} />
                <label htmlFor="catalog-search" className="sr-only">
                  Filter catalog
                </label>
                <input
                  id="catalog-search"
                  value={search}
                  onChange={(e) => onSearch(e.target.value)}
                  placeholder="SKU, name, voltage, or process…"
                  className="w-full rounded-md border border-navy-200 bg-navy-50 py-2.5 pl-10 pr-3 text-sm"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-md border border-navy-200 px-3 py-2 text-sm font-semibold lg:hidden"
                  onClick={() => setFiltersOpen(true)}
                >
                  <IconFilter size={16} /> Filters
                  {chipCount > 0 && <span className="text-amber-700">({chipCount})</span>}
                </button>
                <label className="sr-only" htmlFor="sort">
                  Sort
                </label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="rounded-md border border-navy-200 bg-white px-3 py-2 text-sm"
                >
                  <option value="relevance">Featured</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                  <option value="lead">Fastest lead time</option>
                  <option value="name">Name A–Z</option>
                </select>
                <div className="flex rounded-md border border-navy-200">
                  <button
                    type="button"
                    aria-pressed={view === "grid"}
                    aria-label="Grid view"
                    onClick={() => setView("grid")}
                    className={cn("p-2", view === "grid" ? "bg-navy-900 text-white" : "text-navy-600")}
                  >
                    <IconGrid size={16} />
                  </button>
                  <button
                    type="button"
                    aria-pressed={view === "list"}
                    aria-label="List view"
                    onClick={() => setView("list")}
                    className={cn("p-2", view === "list" ? "bg-navy-900 text-white" : "text-navy-600")}
                  >
                    <IconList size={16} />
                  </button>
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm text-navy-600" aria-live="polite">
              {results.length} machine{results.length === 1 ? "" : "s"} match your filters
            </p>

            {results.length === 0 ? (
              <div className="mt-6 rounded-xl border border-dashed border-navy-200 bg-white p-10 text-center">
                <p className="font-display text-xl font-bold text-navy-900">No machines match</p>
                <p className="mt-1 text-sm text-navy-600">Broaden price, lead time, or certification filters.</p>
                <button type="button" onClick={clearFilters} className="mt-4 font-semibold text-amber-700 underline">
                  Reset filters
                </button>
              </div>
            ) : view === "grid" ? (
              <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    qty={qtyFor(p)}
                    onQty={(n) => setQty(p, n)}
                    onAdd={() => onAdd(p, qtyFor(p))}
                    onQuickView={() => onQuickView(p)}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {results.map((p) => (
                  <ProductRow
                    key={p.id}
                    product={p}
                    qty={qtyFor(p)}
                    onQty={(n) => setQty(p, n)}
                    onAdd={() => onAdd(p, qtyFor(p))}
                    onQuickView={() => onQuickView(p)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <button className="absolute inset-0 bg-navy-950/50" aria-label="Close filters" onClick={() => setFiltersOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[90vw] overflow-y-auto bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">Filters</h3>
              <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Close">
                <IconClose />
              </button>
            </div>
            {filterPanel}
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className="mt-6 w-full rounded-md bg-navy-900 py-2.5 text-sm font-bold text-white"
            >
              Show {results.length} results
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function QtyStepper({
  value,
  min,
  onChange,
}: {
  value: number;
  min: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-md border border-navy-200 bg-white">
      <button type="button" className="p-2 text-navy-700" aria-label="Decrease quantity" onClick={() => onChange(value - 1)} disabled={value <= min}>
        <IconMinus size={14} />
      </button>
      <input
        type="number"
        min={min}
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || min)}
        className="w-12 border-x border-navy-200 py-1.5 text-center text-sm"
        aria-label="Quantity"
      />
      <button type="button" className="p-2 text-navy-700" aria-label="Increase quantity" onClick={() => onChange(value + 1)}>
        <IconPlus size={14} />
      </button>
    </div>
  );
}

function ProductCard({
  product: p,
  qty,
  onQty,
  onAdd,
  onQuickView,
}: {
  product: Product;
  qty: number;
  onQty: (n: number) => void;
  onAdd: () => void;
  onQuickView: () => void;
}) {
  const price = unitPrice(p, qty);
  const save = Math.round(savingsPercent(p, qty));
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-navy-100 bg-white shadow-sm transition hover:shadow-md">
      <button type="button" onClick={onQuickView} className="relative block aspect-[16/10] overflow-hidden bg-navy-900">
        <img src={p.image} alt={p.imageAlt} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
        <span className="absolute left-3 top-3 rounded bg-navy-950/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
          {p.categoryLabel}
        </span>
        {p.inStock ? (
          <span className="absolute right-3 top-3 rounded bg-emerald-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            {p.stockQty} in stock
          </span>
        ) : (
          <span className="absolute right-3 top-3 rounded bg-navy-700 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            Made to order
          </span>
        )}
      </button>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-navy-400">{p.sku}</p>
        <h3 className="mt-1 font-display text-lg font-bold leading-snug text-navy-950">{p.shortName}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-navy-600">{p.description}</p>
        <p className="mt-2 inline-flex items-center gap-1 text-xs text-navy-500">
          <IconClock size={12} /> {leadTimeLabel(p.leadTimeDays)} · MOQ {p.moq}
        </p>
        <div className="mt-3 flex items-end justify-between gap-2">
          <div>
            <p className="text-[11px] text-navy-400 line-through">{formatCurrency(p.listPrice)}</p>
            <p className="font-display text-xl font-extrabold text-navy-950">{formatCurrency(price)}</p>
            <p className="text-[11px] font-semibold text-amber-700">{save}% below list</p>
          </div>
          <QtyStepper value={qty} min={p.moq} onChange={onQty} />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button type="button" onClick={onQuickView} className="rounded-md border border-navy-200 py-2 text-xs font-semibold text-navy-800 hover:bg-navy-50">
            Specs
          </button>
          <button type="button" onClick={onAdd} className="rounded-md bg-navy-900 py-2 text-xs font-bold text-white hover:bg-navy-800">
            Add to quote
          </button>
        </div>
      </div>
    </article>
  );
}

function ProductRow({
  product: p,
  qty,
  onQty,
  onAdd,
  onQuickView,
}: {
  product: Product;
  qty: number;
  onQty: (n: number) => void;
  onAdd: () => void;
  onQuickView: () => void;
}) {
  const price = unitPrice(p, qty);
  return (
    <article className="flex flex-col gap-4 rounded-xl border border-navy-100 bg-white p-3 shadow-sm sm:flex-row sm:items-center">
      <button type="button" onClick={onQuickView} className="h-28 w-full shrink-0 overflow-hidden rounded-lg bg-navy-900 sm:w-40">
        <img src={p.image} alt={p.imageAlt} className="h-full w-full object-cover" />
      </button>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-navy-400">
          {p.sku} · {p.categoryLabel}
        </p>
        <h3 className="font-display text-lg font-bold text-navy-950">{p.name}</h3>
        <p className="mt-1 line-clamp-1 text-xs text-navy-600">{p.description}</p>
        <p className="mt-1 text-xs text-navy-500">
          {leadTimeLabel(p.leadTimeDays)} · {p.voltage} · {p.certifications.join(" · ")}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3 sm:flex-col sm:items-end">
        <div className="text-right">
          <p className="text-[11px] text-navy-400 line-through">{formatCurrency(p.listPrice)}</p>
          <p className="font-display text-xl font-extrabold">{formatCurrency(price)}</p>
        </div>
        <QtyStepper value={qty} min={p.moq} onChange={onQty} />
        <button type="button" onClick={onAdd} className="inline-flex items-center gap-1 rounded-md bg-navy-900 px-3 py-2 text-xs font-bold text-white">
          <IconCheck size={14} /> Add
        </button>
      </div>
    </article>
  );
}
