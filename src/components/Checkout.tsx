import { useMemo, useState } from "react";
import { PRODUCTS } from "../data/products";
import { formatCurrency } from "../lib/format";
import { freightEstimate, lineTotal, savingsVsList, unitPrice } from "../lib/pricing";
import type { CartItem, CheckoutStep, CompanyForm, Product } from "../types";
import { cn } from "../utils/cn";
import {
  IconArrowLeft,
  IconArrowRight,
  IconBuilding,
  IconCheck,
  IconClose,
  IconCredit,
  IconFile,
  IconLock,
  IconMinus,
  IconPackage,
  IconPlus,
  IconTruck,
} from "./Icons";

const EMPTY_FORM: CompanyForm = {
  company: "",
  taxId: "",
  contact: "",
  email: "",
  phone: "",
  poNumber: "",
  address: "",
  city: "",
  region: "",
  postal: "",
  country: "United States",
  incoterm: "FOB",
  payment: "po",
  notes: "",
};

interface CheckoutProps {
  items: CartItem[];
  onQty: (productId: string, qty: number) => void;
  onRemove: (productId: string) => void;
  onClose: () => void;
  onSeedDemo: () => void;
}

export function Checkout({ items, onQty, onRemove, onClose, onSeedDemo }: CheckoutProps) {
  const [step, setStep] = useState<CheckoutStep>(1);
  const [form, setForm] = useState<CompanyForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<string[]>([]);
  const [orderId, setOrderId] = useState<string | null>(null);

  const lines = useMemo(() => {
    return items
      .map((i) => {
        const product = PRODUCTS.find((p) => p.id === i.productId);
        if (!product) return null;
        return { product, qty: i.qty };
      })
      .filter((x): x is { product: Product; qty: number } => Boolean(x));
  }, [items]);

  const merchandise = lines.reduce((s, l) => s + lineTotal(l.product, l.qty), 0);
  const listTotal = lines.reduce((s, l) => s + l.product.listPrice * l.qty, 0);
  const saved = lines.reduce((s, l) => s + savingsVsList(l.product, l.qty), 0);
  const weight = lines.reduce((s, l) => s + l.product.weightKg * l.qty, 0);
  const freight = freightEstimate(weight, form.incoterm);
  const total = merchandise + freight;

  const set = (key: keyof CompanyForm, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validateStep2 = () => {
    const missing: string[] = [];
    if (!form.company.trim()) missing.push("Company name");
    if (!form.taxId.trim()) missing.push("Tax ID / VAT");
    if (!form.contact.trim()) missing.push("Purchasing contact");
    if (!form.email.trim()) missing.push("Work email");
    if (!form.address.trim()) missing.push("Ship-to address");
    if (!form.city.trim()) missing.push("City");
    setErrors(missing);
    return missing.length === 0;
  };

  const next = () => {
    if (step === 1 && lines.length === 0) return;
    if (step === 2 && !validateStep2()) return;
    setErrors([]);
    if (step === 3) {
      setOrderId(`AF-2026-${Math.floor(84000 + Math.random() * 4000)}`);
      setStep(4);
      return;
    }
    setStep((s) => (s + 1) as CheckoutStep);
  };

  const steps = [
    { n: 1 as const, label: "Review", icon: IconPackage },
    { n: 2 as const, label: "Company & ship", icon: IconBuilding },
    { n: 3 as const, label: "Terms", icon: IconCredit },
    { n: 4 as const, label: "Confirm", icon: IconFile },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-navy-50" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
      <div className="border-b border-navy-200 bg-navy-950 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">B2B checkout</p>
            <h2 id="checkout-title" className="font-display text-2xl font-bold">
              Wholesale order
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-sm hover:bg-white/10"
          >
            <IconClose size={16} /> Close
          </button>
        </div>
        <ol className="mx-auto grid max-w-6xl grid-cols-4 px-2 sm:px-6">
          {steps.map((s) => (
            <li key={s.n} className={cn("flex items-center gap-2 border-t-2 px-2 py-3 text-xs sm:text-sm", step >= s.n ? "border-amber-500 text-white" : "border-white/15 text-navy-300")}>
              <s.icon size={16} />
              <span className="hidden sm:inline">{s.n}. {s.label}</span>
              <span className="sm:hidden">{s.n}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {step === 1 && (
              <section>
                <h3 className="font-display text-xl font-bold text-navy-950">Review quote cart</h3>
                <p className="mt-1 text-sm text-navy-600">Quantities respect MOQ. Unit price updates automatically with volume tiers.</p>
                {lines.length === 0 ? (
                  <div className="mt-6 rounded-xl border border-dashed border-navy-200 bg-white p-8 text-center">
                    <p className="font-semibold text-navy-800">Cart is empty</p>
                    <p className="mt-1 text-sm text-navy-600">Add machines from the catalog or load a sample fleet order.</p>
                    <button type="button" onClick={onSeedDemo} className="mt-4 rounded-md bg-navy-900 px-4 py-2 text-sm font-bold text-white">
                      Load demo order
                    </button>
                  </div>
                ) : (
                  <ul className="mt-5 space-y-3">
                    {lines.map(({ product, qty }) => (
                      <li key={product.id} className="flex flex-col gap-3 rounded-xl border border-navy-100 bg-white p-4 sm:flex-row sm:items-center">
                        <img src={product.image} alt="" className="h-20 w-full rounded-lg object-cover sm:w-28" />
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-navy-400">{product.sku}</p>
                          <p className="font-display font-bold text-navy-950">{product.shortName}</p>
                          <p className="text-xs text-navy-500">MOQ {product.moq} · {product.weightKg} kg each</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button type="button" className="rounded border border-navy-200 p-1" aria-label="Decrease" onClick={() => onQty(product.id, qty - 1)}>
                            <IconMinus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                          <button type="button" className="rounded border border-navy-200 p-1" aria-label="Increase" onClick={() => onQty(product.id, qty + 1)}>
                            <IconPlus size={14} />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-display text-lg font-bold">{formatCurrency(unitPrice(product, qty))}</p>
                          <p className="text-xs text-navy-500">{formatCurrency(lineTotal(product, qty))} ext.</p>
                          <button type="button" onClick={() => onRemove(product.id)} className="mt-1 text-xs text-red-700 underline">
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}

            {step === 2 && (
              <section>
                <h3 className="font-display text-xl font-bold text-navy-950">Company & ship-to</h3>
                <p className="mt-1 text-sm text-navy-600">Used for tax exemption, commercial invoice, and dock delivery.</p>
                {errors.length > 0 && (
                  <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
                    Required: {errors.join(", ")}
                  </div>
                )}
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Field label="Legal company name" value={form.company} onChange={(v) => set("company", v)} required />
                  <Field label="EIN / VAT / GST" value={form.taxId} onChange={(v) => set("taxId", v)} required />
                  <Field label="Purchasing contact" value={form.contact} onChange={(v) => set("contact", v)} required />
                  <Field label="Work email" type="email" value={form.email} onChange={(v) => set("email", v)} required />
                  <Field label="Phone" value={form.phone} onChange={(v) => set("phone", v)} />
                  <Field label="PO number (if issued)" value={form.poNumber} onChange={(v) => set("poNumber", v)} />
                  <div className="sm:col-span-2">
                    <Field label="Ship-to street" value={form.address} onChange={(v) => set("address", v)} required />
                  </div>
                  <Field label="City" value={form.city} onChange={(v) => set("city", v)} required />
                  <Field label="State / region" value={form.region} onChange={(v) => set("region", v)} />
                  <Field label="Postal code" value={form.postal} onChange={(v) => set("postal", v)} />
                  <Field label="Country" value={form.country} onChange={(v) => set("country", v)} />
                </div>
              </section>
            )}

            {step === 3 && (
              <section>
                <h3 className="font-display text-xl font-bold text-navy-950">Incoterms & payment</h3>
                <p className="mt-1 text-sm text-navy-600">Wholesale terms. Net-30 requires an approved credit file.</p>
                <fieldset className="mt-6">
                  <legend className="text-xs font-bold uppercase tracking-wider text-navy-500">Incoterms</legend>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {(
                      [
                        ["EXW", "Ex works origin — you arrange pickup"],
                        ["FOB", "Free on board origin port"],
                        ["CIF", "Cost, insurance, freight to port"],
                        ["DDP", "Delivered duty paid to your dock"],
                      ] as const
                    ).map(([code, blurb]) => (
                      <label
                        key={code}
                        className={cn(
                          "cursor-pointer rounded-xl border p-4 text-sm",
                          form.incoterm === code ? "border-amber-500 bg-amber-50" : "border-navy-200 bg-white",
                        )}
                      >
                        <input
                          type="radio"
                          className="sr-only"
                          name="incoterm"
                          checked={form.incoterm === code}
                          onChange={() => set("incoterm", code)}
                        />
                        <span className="font-display text-base font-bold">{code}</span>
                        <span className="mt-1 block text-navy-600">{blurb}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <fieldset className="mt-8">
                  <legend className="text-xs font-bold uppercase tracking-wider text-navy-500">Payment method</legend>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {(
                      [
                        ["po", "Purchase order — billed on ship"],
                        ["wire", "Wire / ACH on confirmation"],
                        ["net30", "Net-30 (approved accounts)"],
                        ["lc", "Letter of credit (export)"],
                      ] as const
                    ).map(([code, blurb]) => (
                      <label
                        key={code}
                        className={cn(
                          "cursor-pointer rounded-xl border p-4 text-sm",
                          form.payment === code ? "border-amber-500 bg-amber-50" : "border-navy-200 bg-white",
                        )}
                      >
                        <input
                          type="radio"
                          className="sr-only"
                          name="pay"
                          checked={form.payment === code}
                          onChange={() => set("payment", code)}
                        />
                        <span className="font-semibold text-navy-950">{blurb}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <label className="mt-6 block text-sm font-semibold text-navy-800" htmlFor="notes">
                  Receiving notes / dock hours
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  className="mt-2 w-full rounded-md border border-navy-200 px-3 py-2 text-sm"
                  placeholder="Liftgate, appointment window, site contact…"
                />
              </section>
            )}

            {step === 4 && (
              <section className="rounded-2xl border border-emerald-200 bg-white p-6 sm:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <IconCheck />
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold text-navy-950">Quote submitted</h3>
                <p className="mt-2 text-sm text-navy-600">
                  Reference <span className="font-semibold text-navy-950">{orderId}</span>. A confirmation PDF and commercial proforma will be emailed to {form.email || "your purchasing contact"} within one business hour.
                </p>
                <ul className="mt-5 space-y-2 text-sm text-navy-700">
                  <li className="flex gap-2">
                    <IconCheck className="text-emerald-600" size={16} /> Account engineer assigned for install & spare parts
                  </li>
                  <li className="flex gap-2">
                    <IconCheck className="text-emerald-600" size={16} /> Credit check queued if Net-30 was selected
                  </li>
                  <li className="flex gap-2">
                    <IconCheck className="text-emerald-600" size={16} /> Production slot held for 5 business days
                  </li>
                </ul>
                <button type="button" onClick={onClose} className="mt-6 rounded-md bg-navy-900 px-4 py-2.5 text-sm font-bold text-white">
                  Return to catalog
                </button>
              </section>
            )}
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-6 rounded-2xl border border-navy-100 bg-white p-5 shadow-sm">
              <h3 className="font-display text-lg font-bold text-navy-950">Order summary</h3>
              <dl className="mt-4 space-y-2 text-sm">
                <Row k="Merchandise" v={formatCurrency(merchandise)} />
                <Row k="List comparison" v={formatCurrency(listTotal)} muted />
                <Row k="Volume savings" v={`−${formatCurrency(saved)}`} accent />
                <Row k={`Freight (${form.incoterm})`} v={freight === 0 ? "Buyer arranged" : formatCurrency(freight)} />
                <div className="flex justify-between border-t border-navy-100 pt-3 font-display text-xl font-extrabold">
                  <dt>Total</dt>
                  <dd>{formatCurrency(total)}</dd>
                </div>
              </dl>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-navy-500">
                <IconLock size={12} /> Encrypted RFQ · no card required
              </p>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-navy-500">
                <IconTruck size={12} /> Est. {Math.round(weight).toLocaleString()} kg shipment weight
              </p>
            </div>
          </aside>
        </div>
      </div>

      {step !== 4 && (
        <div className="border-t border-navy-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
            <button
              type="button"
              onClick={() => (step === 1 ? onClose() : setStep((s) => (s - 1) as CheckoutStep))}
              className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-navy-700"
            >
              <IconArrowLeft size={16} /> {step === 1 ? "Back to catalog" : "Previous"}
            </button>
            <button
              type="button"
              onClick={next}
              disabled={step === 1 && lines.length === 0}
              className="inline-flex items-center gap-2 rounded-md bg-amber-500 px-5 py-2.5 text-sm font-bold text-navy-950 hover:bg-amber-400 disabled:opacity-40"
            >
              {step === 3 ? "Submit wholesale order" : "Continue"}
              <IconArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  const id = label.replace(/\s+/g, "-").toLowerCase();
  return (
    <div>
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-navy-500">
        {label}
        {required && <span className="text-amber-700"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-md border border-navy-200 px-3 py-2.5 text-sm"
      />
    </div>
  );
}

function Row({ k, v, muted, accent }: { k: string; v: string; muted?: boolean; accent?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className="text-navy-500">{k}</dt>
      <dd className={cn(muted && "text-navy-400 line-through", accent && "font-semibold text-amber-700")}>{v}</dd>
    </div>
  );
}

export function CheckoutPreview({ onOpen }: { onOpen: () => void }) {
  const steps = [
    { title: "Quote cart", body: "Line items inherit volume tiers as qty climbs. MOQ and stock flags sit on every SKU." },
    { title: "Company file", body: "Tax ID, ship-to dock, and purchasing contact in one pass—no consumer address book." },
    { title: "Terms", body: "Pick EXW/FOB/CIF/DDP and pay by PO, wire, Net-30, or letter of credit." },
    { title: "Proforma", body: "Locked production slot, PDF packet, and an assigned applications engineer." },
  ];
  return (
    <section id="checkout-flow" className="bg-navy-950 py-16 text-white sm:py-20" aria-labelledby="flow-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Streamlined B2B checkout</p>
          <h2 id="flow-heading" className="mt-1 font-display text-3xl font-extrabold sm:text-4xl">
            Built for POs, not shopping carts
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-navy-200">
            Four steps from configuration to a commercial proforma. No guest checkout, no consumer wallets—just the fields a buyer actually needs.
          </p>
        </div>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <span className="font-display text-3xl font-extrabold text-amber-400">0{i + 1}</span>
              <h3 className="mt-3 font-display text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-navy-200">{s.body}</p>
            </li>
          ))}
        </ol>
        <button
          type="button"
          onClick={onOpen}
          className="mt-10 inline-flex items-center gap-2 rounded-md bg-amber-500 px-5 py-3 text-sm font-bold text-navy-950 hover:bg-amber-400"
        >
          Launch checkout mockup
          <IconArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
