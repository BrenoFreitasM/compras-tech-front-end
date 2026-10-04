import { DEFAULT_PRODUCT_FILTERS, FILTER_QUERY_KEYS, SORT_OPTIONS } from "./constants";
import type { Product, ProductFilters, ProductSort, SearchParams } from "./types";

function firstValue(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

function toPositiveNumber(value: string): number | undefined {
  if (!value) return undefined;
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : undefined;
}

function isProductSort(value: string): value is ProductSort {
  return SORT_OPTIONS.some((option) => option.value === value);
}

export function parseProductFilters(params: SearchParams): ProductFilters {
  const read = (key: keyof ProductFilters) => firstValue(params[FILTER_QUERY_KEYS[key]]);
  const sort = read("sort");

  return {
    search: read("search"),
    category: read("category").split(",").filter(Boolean),
    storage: read("storage"),
    color: read("color"),
    minPrice: toPositiveNumber(read("minPrice")),
    maxPrice: toPositiveNumber(read("maxPrice")),
    includeInactive: read("includeInactive") === "true",
    sort: isProductSort(sort) ? sort : DEFAULT_PRODUCT_FILTERS.sort,
    page: toPositiveNumber(read("page")) || 1,
  };
}

/** Serializes only values that differ from the defaults, keeping URLs short. */
export function serializeProductFilters(filters: ProductFilters): string {
  const params = new URLSearchParams();

  (Object.keys(FILTER_QUERY_KEYS) as Array<keyof ProductFilters>).forEach((key) => {
    const value = filters[key];
    if (key === "category") {
      const arr = value as string[];
      if (arr.length > 0) params.set(FILTER_QUERY_KEYS[key], arr.join(","));
      return;
    }
    if (value === undefined || value === "" || value === DEFAULT_PRODUCT_FILTERS[key]) return;
    params.set(FILTER_QUERY_KEYS[key], String(value));
  });

  return params.toString();
}

export function hasActiveFilters(filters: ProductFilters): boolean {
  const { sort: _sort, page: _page, ...criteria } = filters;
  return (Object.keys(criteria) as Array<keyof typeof criteria>).some((key) => {
    if (key === "category") return (criteria[key] as string[]).length > 0;
    return criteria[key] !== undefined && criteria[key] !== DEFAULT_PRODUCT_FILTERS[key];
  });
}

function isWithinRange(value: number | null, min?: number, max?: number): boolean {
  if (min === undefined && max === undefined) return true;
  if (value === null) return false;
  return (min === undefined || value >= min) && (max === undefined || value <= max);
}

/** Filters the back-end cannot apply (numeric ranges over string fields). */
export function applyLocalFilters(products: Product[], filters: ProductFilters): Product[] {
  return products.filter(
    (product) => isWithinRange(product.price, filters.minPrice, filters.maxPrice),
  );
}

const compareNullableDesc = (a: number | null, b: number | null) => (b ?? -Infinity) - (a ?? -Infinity);
const compareNullableAsc = (a: number | null, b: number | null) => (a ?? Infinity) - (b ?? Infinity);

const SORTERS: Record<ProductSort, ((a: Product, b: Product) => number) | null> = {
  recent: null, // back-end already returns newest first
  "price-asc": (a, b) => compareNullableAsc(a.price, b.price),
  "price-desc": (a, b) => compareNullableDesc(a.price, b.price),
};

export function sortProducts(products: Product[], sort: ProductSort): Product[] {
  const sorter = SORTERS[sort];
  return sorter ? [...products].sort(sorter) : products;
}
