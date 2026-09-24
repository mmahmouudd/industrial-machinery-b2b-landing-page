import { useEffect, useMemo, useState } from "react";
import { Catalog } from "./components/Catalog";
import { BulkPricing } from "./components/BulkPricing";
import { Checkout, CheckoutPreview } from "./components/Checkout";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import {
  CategoryBand,
  FAQ,
  Footer,
  Procurement,
  QuickView,
  QuoteBand,
  Testimonials,
  Toast,
} from "./components/Sections";
import { PRODUCTS } from "./data/products";
import type { CartItem, Category, Product } from "./types";

export default function App() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quickViewId, setQuickViewId] = useState<string | null>(null);
  const [quickQty, setQuickQty] = useState(1);
  const [toast, setToast] = useState<string | null>(null);
  const [categoryPreset, setCategoryPreset] = useState<Category | "all">("all");

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const quickProduct = useMemo(
    () => PRODUCTS.find((p) => p.id === quickViewId) ?? null,
    [quickViewId],
  );

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    document.body.style.overflow = checkoutOpen || quickProduct ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [checkoutOpen, quickProduct]);

  const addToCart = (product: Product, qty: number) => {
    const safeQty = Math.max(product.moq, qty);
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        return prev.map((i) =>
          i.productId === product.id ? { ...i, qty: i.qty + safeQty } : i,
        );
      }
      return [...prev, { productId: product.id, qty: safeQty }];
    });
    setToast(`${product.shortName} added to quote cart`);
    setQuickViewId(null);
  };

  const updateQty = (productId: string, qty: number) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;
    if (qty < product.moq) {
      setCart((prev) => prev.filter((i) => i.productId !== productId));
      return;
    }
    setCart((prev) => prev.map((i) => (i.productId === productId ? { ...i, qty } : i)));
  };

  const removeItem = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  };

  const seedDemo = () => {
    setCart([
      { productId: "vm-850", qty: 3 },
      { productId: "r6-weld", qty: 2 },
      { productId: "fl-3500", qty: 6 },
    ]);
  };

  const goCatalog = (cat: Category | "all" = "all") => {
    setCategoryPreset(cat);
    if (cat !== "all") setSearch("");
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
  };

  const openQuick = (product: Product) => {
    setQuickViewId(product.id);
    setQuickQty(product.moq);
  };

  return (
    <div id="top" className="min-h-screen bg-navy-50 text-navy-950">
      <a
        href="#catalog"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-md focus:bg-amber-500 focus:px-3 focus:py-2 focus:text-navy-950"
      >
        Skip to catalog
      </a>

      <Header
        cartCount={cartCount}
        onOpenCheckout={() => setCheckoutOpen(true)}
        onSearch={(q) => {
          setSearch(q);
          setCategoryPreset("all");
        }}
        searchValue={search}
      />

      <main>
        <Hero onBrowse={() => goCatalog("all")} onQuote={() => setCheckoutOpen(true)} />
        <CategoryBand onSelect={(c) => goCatalog(c)} />
        <Catalog
          search={search}
          onSearch={(q) => {
            setSearch(q);
            setCategoryPreset("all");
          }}
          onAdd={addToCart}
          onQuickView={openQuick}
          categoryPreset={categoryPreset}
          onCategoryPreset={(c) => setCategoryPreset(c)}
        />
        <BulkPricing onAdd={addToCart} />
        <Procurement />
        <CheckoutPreview onOpen={() => setCheckoutOpen(true)} />
        <Testimonials />
        <FAQ />
        <QuoteBand onQuote={() => setCheckoutOpen(true)} />
      </main>

      <Footer />

      {quickProduct && (
        <QuickView
          product={quickProduct}
          qty={Math.max(quickProduct.moq, quickQty)}
          onQty={(n) => setQuickQty(Math.max(quickProduct.moq, n))}
          onAdd={() => addToCart(quickProduct, quickQty)}
          onClose={() => setQuickViewId(null)}
        />
      )}

      {checkoutOpen && (
        <Checkout
          items={cart}
          onQty={updateQty}
          onRemove={removeItem}
          onClose={() => setCheckoutOpen(false)}
          onSeedDemo={seedDemo}
        />
      )}

      {toast && <Toast message={toast} />}
    </div>
  );
}
