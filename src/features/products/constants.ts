import type { ProductFilters, ProductSort } from "./types";

export const STORAGE_OPTIONS = ["64GB", "128GB", "256GB", "512GB", "1TB"] as const;

export const COLOR_OPTIONS = [
  { label: "Preto", value: "preto", hex: "#171717" },
  { label: "Branco", value: "branco", hex: "#FFFFFF" },
  { label: "Prata", value: "silver", hex: "#E5E7EB" },
  { label: "Azul", value: "azul", hex: "#3B82F6" },
  { label: "Verde", value: "verde", hex: "#22C55E" },
  { label: "Rosa", value: "pink", hex: "#EC4899" },
  { label: "Lilás", value: "lilas", hex: "#A855F7" },
  { label: "Laranja", value: "laranja", hex: "#F97316" },
  { label: "Vermelho", value: "vermelho", hex: "#EF4444" },
  { label: "Dourado", value: "dourado", hex: "#EAB308" },
  { label: "Sem cor", value: "sem cor", hex: "transparent" },
] as const;

export const SORT_OPTIONS: ReadonlyArray<{ value: ProductSort; label: string }> = [
  { value: "recent", label: "Mais recentes" },
  { value: "price-asc", label: "Menor preço" },
  { value: "price-desc", label: "Maior preço" },
];

export const DEFAULT_PRODUCT_FILTERS: ProductFilters = {
  search: "",
  category: "",
  model: [],
  storage: "",
  color: "",
  minPrice: undefined,
  maxPrice: undefined,
  includeInactive: false,
  sort: "recent",
  page: 1,
};

/** URL query keys used to persist filters (keeps links shareable). */
export const FILTER_QUERY_KEYS = {
  search: "q",
  category: "categoria",
  model: "modelo",
  storage: "armazenamento",
  color: "cor",
  minPrice: "precoMin",
  maxPrice: "precoMax",
  includeInactive: "incluirAntigos",
  sort: "ordem",
  page: "pagina",
} as const satisfies Record<keyof ProductFilters, string>;

export const SEARCH_DEBOUNCE_MS = 400;
