import { IconArrowRight, IconAward, IconCheck, IconGlobe, IconShield, IconTruck } from "./Icons";

interface HeroProps {
  onBrowse: () => void;
  onQuote: () => void;
}

export function Hero({ onBrowse, onQuote }: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 text-white" aria-labelledby="hero-heading">
      <img
        src="https://images.pexels.com/photos/38852437/pexels-photo-38852437.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt="Row of industrial CNC machines in a large warehouse"
        className="absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-900/55" />
      <div className="bg-grid absolute inset-0 opacity-40" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-7">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            <IconAward size={14} />
            Factory-direct wholesale since 1987
          </p>
          <h1 id="hero-heading" className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Industrial machinery.
            <span className="block text-amber-400">Priced for volume.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-200 sm:text-lg">
            CNC, laser, press, robotics, and handling equipment with published bulk tiers, blanket POs, and freight booked to your dock. Built for plant managers and procurement teams—not retail browsers.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onBrowse}
              className="inline-flex items-center gap-2 rounded-md bg-amber-500 px-5 py-3 text-sm font-bold text-navy-950 hover:bg-amber-400"
            >
              Browse wholesale catalog
              <IconArrowRight size={18} />
            </button>
            <button
              type="button"
              onClick={onQuote}
              className="inline-flex items-center gap-2 rounded-md border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Request a volume quote
            </button>
          </div>
          <ul className="mt-8 grid gap-2 text-sm text-navy-100 sm:grid-cols-2">
            {[
              "MOQ from 1 unit · fleet discounts at 2+",
              "Net-30 / Net-60 for approved accounts",
              "FOB, CIF, DDP, and EXW incoterms",
              "CE, UL, ISO 9001 certified inventory",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <IconCheck className="mt-0.5 shrink-0 text-amber-400" size={16} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <aside className="lg:col-span-5">
          <div className="rounded-2xl border border-white/10 bg-navy-950/70 p-5 shadow-2xl backdrop-blur-md sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">Live wholesale snapshot</p>
            <h2 className="mt-2 font-display text-2xl font-bold">VM-850 VMC · in stock</h2>
            <p className="mt-1 text-sm text-navy-300">SKU AF-CNC-850 · 6 units on hand · 28-day additional build</p>
            <dl className="mt-5 divide-y divide-white/10 border-y border-white/10">
              {[
                ["1 unit", "$54,800", "15% off list"],
                ["2–4 units", "$51,200", "21% off list"],
                ["5–9 units", "$47,900", "26% off list"],
                ["10+ fleet", "$44,200", "31% off list"],
              ].map(([qty, price, save]) => (
                <div key={qty} className="flex items-baseline justify-between gap-3 py-2.5 text-sm">
                  <dt className="text-navy-200">{qty}</dt>
                  <dd className="font-display text-lg font-bold text-white">{price}</dd>
                  <span className="text-xs font-semibold text-amber-400">{save}</span>
                </div>
              ))}
            </dl>
            <button
              type="button"
              onClick={onBrowse}
              className="mt-5 w-full rounded-md bg-white px-4 py-3 text-sm font-bold text-navy-950 hover:bg-navy-50"
            >
              Configure quantity & add to quote
            </button>
            <p className="mt-3 text-center text-xs text-navy-300">List $64,500 · freight quoted at checkout</p>
          </div>
        </aside>
      </div>

      <div className="relative border-t border-white/10 bg-navy-950/80">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px sm:grid-cols-4">
          {[
            { icon: IconGlobe, k: "42 countries", v: "Dock-to-dock freight" },
            { icon: IconTruck, k: "12,400 machines", v: "Shipped since 1987" },
            { icon: IconShield, k: "18–24 mo", v: "Standard warranty" },
            { icon: IconAward, k: "2,400+ plants", v: "Active wholesale accounts" },
          ].map((s) => (
            <div key={s.k} className="flex items-center gap-3 px-4 py-5 sm:px-6">
              <s.icon className="text-amber-400" />
              <div>
                <p className="font-display text-lg font-bold leading-none">{s.k}</p>
                <p className="mt-1 text-xs text-navy-300">{s.v}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
