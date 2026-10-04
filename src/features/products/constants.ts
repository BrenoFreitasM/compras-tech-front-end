import type { ProductFilters, ProductSort } from "./types";

export const STORAGE_OPTIONS = ["64GB", "128GB", "256GB", "512GB", "1TB"] as const;

export const BATTERY_OPTIONS = [80, 85, 90, 95, 100] as const;

export const SORT_OPTIONS: ReadonlyArray<{ value: ProductSort; label: string }> = [
  { value: "recent", label: "Mais recentes" },
  { value: "price-asc", label: "Menor preço" },
  { value: "price-desc", label: "Maior preço" },
  { value: "battery-desc", label: "Melhor bateria" },
];

export const DEFAULT_PRODUCT_FILTERS: ProductFilters = {
  search: "",
  category: "",
  storage: "",
  color: "",
  minPrice: undefined,
  maxPrice: undefined,
  minBattery: undefined,
  includeInactive: false,
  sort: "recent",
};

/** URL query keys used to persist filters (keeps links shareable). */
export const FILTER_QUERY_KEYS = {
  search: "q",
  category: "categoria",
  storage: "armazenamento",
  color: "cor",
  minPrice: "precoMin",
  maxPrice: "precoMax",
  minBattery: "bateriaMin",
  includeInactive: "incluirAntigos",
  sort: "ordem",
} as const satisfies Record<keyof ProductFilters, string>;

export const SEARCH_DEBOUNCE_MS = 400;
