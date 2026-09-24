export type Category = "cnc" | "cutting" | "forming" | "robotics" | "handling";

export interface PriceTier {
  minQty: number;
  maxQty: number | null;
  unitPrice: number;
  label: string;
}

export interface Spec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  shortName: string;
  category: Category;
  categoryLabel: string;
  description: string;
  image: string;
  imageAlt: string;
  listPrice: number;
  tiers: PriceTier[];
  moq: number;
  leadTimeDays: number;
  inStock: boolean;
  stockQty: number;
  voltage: string;
  powerKw: number;
  weightKg: number;
  certifications: string[];
  origin: string;
  warranty: string;
  specs: Spec[];
  featured?: boolean;
}

export interface CartItem {
  productId: string;
  qty: number;
}

export type View = "home" | "checkout";

export type CheckoutStep = 1 | 2 | 3 | 4;

export interface CompanyForm {
  company: string;
  taxId: string;
  contact: string;
  email: string;
  phone: string;
  poNumber: string;
  address: string;
  city: string;
  region: string;
  postal: string;
  country: string;
  incoterm: "FOB" | "CIF" | "DDP" | "EXW";
  payment: "po" | "wire" | "net30" | "lc";
  notes: string;
}
