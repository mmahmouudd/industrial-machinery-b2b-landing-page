import { useState } from "react";
import { cn } from "../utils/cn";
import {
  IconCart,
  IconClose,
  IconHeadset,
  IconMenu,
  IconPhone,
  IconSearch,
  IconUser,
} from "./Icons";

interface HeaderProps {
  cartCount: number;
  onOpenCheckout: () => void;
  onSearch: (q: string) => void;
  searchValue: string;
}

export function Header({ cartCount, onOpenCheckout, onSearch, searchValue }: HeaderProps) {
  const [open, setOpen] = useState(false);

  const nav = [
    { href: "#catalog", label: "Catalog" },
    { href: "#pricing", label: "Bulk Pricing" },
    { href: "#procurement", label: "Procurement" },
    { href: "#checkout-flow", label: "B2B Checkout" },
    { href: "#support", label: "Support" },
  ];

  return (
    <header className="sticky top-0 z-50">
      <div className="stripe-bar text-amber-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] sm:px-6">
          <p className="truncate">Volume tiers on 200+ SKUs · Net-30 for approved accounts · Worldwide freight</p>
          <a href="tel:+18045550140" className="hidden shrink-0 items-center gap-1.5 sm:inline-flex">
            <IconPhone size={12} />
            +1 (804) 555-0140
          </a>
        </div>
      </div>

      <div className="border-b border-navy-800/80 bg-navy-950/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-2.5 pr-2" aria-label="Apex Forge Industrial home">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-amber-500 font-display text-sm font-extrabold text-navy-950">
              AF
            </span>
            <span className="leading-tight">
              <span className="block font-display text-lg font-extrabold tracking-wide text-white">APEX FORGE</span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-400">
                Industrial Wholesale
              </span>
            </span>
          </a>

          <form
            className="relative mx-2 hidden min-w-0 flex-1 md:block"
            onSubmit={(e) => {
              e.preventDefault();
              document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
            }}
            role="search"
          >
            <IconSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy-300" size={18} />
            <input
              type="search"
              value={searchValue}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search SKU, machine, or spec…"
              className="w-full rounded-md border border-navy-700 bg-navy-900 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-navy-300 focus:border-amber-500"
              aria-label="Search catalog"
            />
          </form>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <a
              href="tel:+18045550140"
              className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm text-navy-100 hover:bg-navy-800 lg:flex"
            >
              <IconHeadset size={18} />
              <span className="leading-tight">
                <span className="block text-[10px] uppercase tracking-wider text-navy-300">Account desk</span>
                <span className="font-semibold text-white">Mon–Fri 7–7 ET</span>
              </span>
            </a>
            <button
              type="button"
              className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm text-navy-100 hover:bg-navy-800 sm:flex"
            >
              <IconUser size={18} />
              <span className="hidden lg:inline">Sign in</span>
            </button>
            <button
              type="button"
              onClick={onOpenCheckout}
              className="relative inline-flex items-center gap-2 rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold text-navy-950 hover:bg-amber-400"
              aria-label={`Open quote cart, ${cartCount} items`}
            >
              <IconCart size={18} />
              <span className="hidden sm:inline">Quote cart</span>
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[11px] font-bold text-navy-900">
                {cartCount}
              </span>
            </button>
            <button
              type="button"
              className="ml-1 rounded-md p-2 text-white md:hidden"
              aria-expanded={open}
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>

        <nav className="hidden border-t border-navy-800 md:block" aria-label="Primary">
          <div className="mx-auto flex max-w-7xl items-center gap-1 px-4 sm:px-6">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-2.5 text-sm font-medium text-navy-200 hover:text-amber-400"
              >
                {item.label}
              </a>
            ))}
            <span className="ml-auto py-2.5 text-xs text-navy-300">ISO 9001 · CE · UL listed inventory</span>
          </div>
        </nav>
      </div>

      {open && (
        <div className="border-b border-navy-800 bg-navy-900 md:hidden">
          <form
            className="px-4 pt-3"
            onSubmit={(e) => {
              e.preventDefault();
              setOpen(false);
              document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <label className="sr-only" htmlFor="mobile-search">
              Search catalog
            </label>
            <input
              id="mobile-search"
              type="search"
              value={searchValue}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search SKU or machine…"
              className="w-full rounded-md border border-navy-700 bg-navy-950 px-3 py-2.5 text-sm text-white"
            />
          </form>
          <nav className="flex flex-col px-2 py-2" aria-label="Mobile">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-navy-100"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex h-9 w-9 items-center justify-center rounded-md bg-amber-500 font-display text-sm font-extrabold text-navy-950", className)}>
      AF
    </span>
  );
}
