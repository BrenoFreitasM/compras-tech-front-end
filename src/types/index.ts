// Tipos do domínio ComprasTech

export type Category =
  | "iPhone"
  | "iPad"
  | "MacBook"
  | "Macs"
  | "AirPods"
  | "Apple Watch"
  | "Acessórios"
  | "Eletrônicos"
  | "Android";
  

export type Condition = "Novo" | "Usado";

export interface Supplier {
  id: string;
  name: string;
  state: string;
  city: string;
  rating: number;
  totalProducts: number;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  priceOld?: number;
  category: Category;
  condition: Condition;
  supplier: Supplier;
  imageUrl: string;
  stock: number;
  model?: string;
  storage?: string;
  color?: string;
  createdAt: string;
}

export interface FilterState {
  search: string;
  state: string;
  categories: Category[];
  conditions: Condition[];
  suppliers: string[];
  priceMin: number;
  priceMax: number;
}
