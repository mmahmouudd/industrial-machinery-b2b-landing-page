import { CATEGORIES, TESTIMONIALS } from "../data/products";
import type { Category, Product } from "../types";
import { formatCurrency, leadTimeLabel } from "../lib/format";
import { unitPrice } from "../lib/pricing";
import {
  IconAward,
  IconCheck,
  IconClock,
  IconClose,
  IconFile,
  IconGlobe,
  IconHeadset,
  IconMail,
  IconMinus,
  IconPhone,
  IconPlus,
  IconShield,
  IconTruck,
} from "./Icons";

export function CategoryBand({ onSelect }: { onSelect: (c: Category) => void }) {
  const images: Record<Category, string> = {
    cnc: "https://images.pexels.com/photos/20607184/pexels-photo-20607184.jpeg?auto=compress&cs=tinysrgb&w=900",
    cutting: "https://images.pexels.com/photos/7254423/pexels-photo-7254423.jpeg?auto=compress&cs=tinysrgb&w=900",
    forming: "https://images.pexels.com/photos/18569742/pexels-photo-18569742.jpeg?auto=compress&cs=tinysrgb&w=900",
    robotics: "https://images.pexels.com/photos/34207364/pexels-photo-34207364.jpeg?auto=compress&cs=tinysrgb&w=900",
    handling: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=900",
  };

  return (
    <section className="bg-white py-14" aria-labelledby="cat-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">Product lines</p>
            <h2 id="cat-heading" className="mt-1 font-display text-3xl font-extrabold text-navy-950">
              Shop by process
            </h2>
          </div>
          <a href="#catalog" className="hidden text-sm font-semibold text-navy-700 underline-offset-4 hover:underline sm:inline">
            View full catalog
          </a>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelect(c.id)}
              className="group relative isolate overflow-hidden rounded-2xl text-left"
            >
              <img src={images[c.id]} alt="" className="h-52 w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-4 text-white">
                <span className="block font-display text-lg font-bold">{c.label}</span>
                <span className="mt-0.5 block text-xs text-navy-200">{c.blurb}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Procurement() {
  const items = [
    { icon: IconFile, title: "Blanket POs", body: "Release against an annual agreement. Pricing locked for 12 months on signed fleet contracts." },
    { icon: IconShield, title: "Credit terms", body: "Net-30 and Net-60 after a one-page application. Letters of credit for export lanes." },
    { icon: IconTruck, title: "Project freight", body: "Crating, export docs, and appointed carriers. DDP available into NA, EU, and GCC." },
    { icon: IconHeadset, title: "Named engineer", body: "Every account over $75k gets an applications engineer for install, tooling, and spares." },
    { icon: IconGlobe, title: "Multi-plant ship-to", body: "Split a single order across docks. Commercial invoices per site for local receiving." },
    { icon: IconAward, title: "Compliance pack", body: "CE declarations, UL files, ISO certs, and origin statements attached to every proforma." },
  ];
  return (
    <section id="procurement" className="bg-navy-50 py-16 sm:py-20" aria-labelledby="proc-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">For procurement teams</p>
          <h2 id="proc-heading" className="mt-1 font-display text-3xl font-extrabold text-navy-950 sm:text-4xl">
            The paperwork capital equipment actually needs
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <article key={it.title} className="rounded-2xl border border-navy-100 bg-white p-5 shadow-sm">
              <it.icon className="text-amber-600" />
              <h3 className="mt-3 font-display text-xl font-bold text-navy-950">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{it.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="bg-white py-16 sm:py-20" aria-labelledby="social-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">Plant references</p>
        <h2 id="social-heading" className="mt-1 font-display text-3xl font-extrabold text-navy-950 sm:text-4xl">
          Trusted on the floor
        </h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="flex flex-col rounded-2xl border border-navy-100 bg-navy-50 p-6">
              <blockquote className="flex-1 text-sm leading-relaxed text-navy-800">“{t.quote}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <img src={t.image} alt="" className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-navy-950">{t.name}</p>
                  <p className="text-xs text-navy-500">
                    {t.title}, {t.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const faqs = [
    {
      q: "What is the typical MOQ?",
      a: "Most capital machines are MOQ 1. Compact tools such as drill presses and engravers start at 2–12 units so we can keep fleet pricing honest.",
    },
    {
      q: "Do you offer Net-30?",
      a: "Yes, for approved accounts after a credit application. First orders may ship on PO plus wire. Export orders can use letters of credit.",
    },
    {
      q: "Can machines be customized?",
      a: "Voltage, enclosure, language packs, tooling, and safety guarding can be specified on the quote. Custom configs add 2–6 weeks depending on SKU.",
    },
    {
      q: "Which incoterms are supported?",
      a: "EXW, FOB, CIF, and DDP. Freight is estimated from shipment weight in checkout and confirmed by our logistics desk before the proforma is locked.",
    },
    {
      q: "How does warranty and commissioning work?",
      a: "Standard coverage is 12–24 months. On-site start-up is available in North America and the EU; remote commissioning is included on CNC and laser cells.",
    },
    {
      q: "Can we issue a blanket purchase order?",
      a: "Yes. Signed annual agreements lock tiers for 12 months with scheduled releases and a shared spare-parts buffer.",
    },
  ];
  return (
    <section id="support" className="bg-navy-50 py-16 sm:py-20" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 id="faq-heading" className="font-display text-3xl font-extrabold text-navy-950">
          Procurement FAQ
        </h2>
        <div className="mt-8 divide-y divide-navy-200 border-y border-navy-200">
          {faqs.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="cursor-pointer list-none font-display text-lg font-bold text-navy-950 marker:content-none">
                <span className="flex items-center justify-between gap-3">
                  {f.q}
                  <span className="text-amber-600 group-open:hidden">
                    <IconPlus size={18} />
                  </span>
                  <span className="hidden text-amber-600 group-open:inline">
                    <IconMinus size={18} />
                  </span>
                </span>
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function QuoteBand({ onQuote }: { onQuote: () => void }) {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-16 text-white">
      <img
        src="https://images.pexels.com/photos/37602851/pexels-photo-37602851.jpeg?auto=compress&cs=tinysrgb&w=1600"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Need a mixed-line quote?</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold">Talk to the account desk</h2>
          <p className="mt-2 max-w-xl text-sm text-navy-200">
            Mix CNC, press, and handling on one proforma. We’ll return a packed PDF with freight, duty estimate, and install options in one business day.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="tel:+18045550140" className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-3 text-sm font-bold text-navy-950">
            <IconPhone size={16} /> +1 (804) 555-0140
          </a>
          <button type="button" onClick={onQuote} className="inline-flex items-center gap-2 rounded-md bg-amber-500 px-4 py-3 text-sm font-bold text-navy-950">
            Open quote cart
          </button>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-amber-500 font-display text-sm font-extrabold text-navy-950">
              AF
            </span>
            <span className="font-display text-lg font-extrabold tracking-wide text-white">APEX FORGE</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed">
            Wholesale industrial machinery for plants that buy in volume. Richmond HQ · bonded warehouses in Rotterdam, Houston, and Shenzhen.
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-400">Catalog</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="#catalog" className="hover:text-white">CNC machining</a></li>
            <li><a href="#catalog" className="hover:text-white">Cutting & laser</a></li>
            <li><a href="#pricing" className="hover:text-white">Bulk pricing</a></li>
            <li><a href="#checkout-flow" className="hover:text-white">B2B checkout</a></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-400">Procurement</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>ISO 9001:2015</li>
            <li>CE / UL / OSHA files</li>
            <li>Incoterms 2020</li>
            <li>ITAR-aware screening</li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-400">Account desk</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <IconPhone size={14} /> +1 (804) 555-0140
            </li>
            <li className="flex items-center gap-2">
              <IconMail size={14} /> wholesale@apexforge.example
            </li>
            <li>Mon–Fri 07:00–19:00 ET</li>
            <li>400 East Cary St, Richmond, VA</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-navy-400 sm:flex-row sm:justify-between sm:px-6">
          <p>© 2026 Apex Forge Industrial. Wholesale demonstration storefront.</p>
          <p>Prices in USD. Specifications subject to confirmation on proforma.</p>
        </div>
      </div>
    </footer>
  );
}

export function QuickView({
  product,
  qty,
  onQty,
  onAdd,
  onClose,
}: {
  product: Product;
  qty: number;
  onQty: (n: number) => void;
  onAdd: () => void;
  onClose: () => void;
}) {
  const price = unitPrice(product, qty);
  return (
    <div className="fixed inset-0 z-[55] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-labelledby="qv-title">
      <button type="button" className="absolute inset-0 bg-navy-950/60" aria-label="Close product details" onClick={onClose} />
      <div className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
        <button type="button" onClick={onClose} className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2" aria-label="Close">
          <IconClose />
        </button>
        <div className="grid md:grid-cols-2">
          <img src={product.image} alt={product.imageAlt} className="h-56 w-full object-cover md:h-full" />
          <div className="p-6">
            <p className="text-[11px] font-bold uppercase tracking-wider text-navy-400">
              {product.sku} · {product.origin}
            </p>
            <h3 id="qv-title" className="mt-1 font-display text-2xl font-bold text-navy-950">
              {product.name}
            </h3>
            <p className="mt-2 text-sm text-navy-600">{product.description}</p>
            <p className="mt-3 inline-flex items-center gap-1 text-xs text-navy-500">
              <IconClock size={12} /> {leadTimeLabel(product.leadTimeDays)} · {product.warranty} warranty
            </p>
            <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
              {product.specs.map((s) => (
                <div key={s.label} className="rounded-md bg-navy-50 px-3 py-2">
                  <dt className="text-navy-500">{s.label}</dt>
                  <dd className="font-semibold text-navy-900">{s.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {product.certifications.map((c) => (
                <span key={c} className="rounded-full bg-navy-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  {c}
                </span>
              ))}
            </div>
            <div className="mt-5 flex items-end justify-between">
              <div>
                <p className="text-xs text-navy-400 line-through">{formatCurrency(product.listPrice)}</p>
                <p className="font-display text-3xl font-extrabold text-navy-950">{formatCurrency(price)}</p>
                <p className="text-xs text-navy-500">Wholesale unit · {product.voltage}</p>
              </div>
              <div className="inline-flex items-center rounded-md border border-navy-200">
                <button type="button" className="p-2" aria-label="Decrease" onClick={() => onQty(qty - 1)}>
                  <IconMinus size={14} />
                </button>
                <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                <button type="button" className="p-2" aria-label="Increase" onClick={() => onQty(qty + 1)}>
                  <IconPlus size={14} />
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={onAdd}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-amber-500 py-3 text-sm font-bold text-navy-950"
            >
              <IconCheck size={16} /> Add {qty} to quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Toast({ message }: { message: string }) {
  return (
    <div
      role="status"
      className="fixed bottom-5 left-1/2 z-[70] -translate-x-1/2 rounded-full bg-navy-950 px-4 py-2.5 text-sm font-semibold text-white shadow-lg"
    >
      {message}
    </div>
  );
}
