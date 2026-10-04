import { api, type QueryParams } from "@/services/api";
import { applyLocalFilters, sortProducts } from "./filters";
import { toProduct } from "./mappers";
import type { ListProductsResponse, Product, ProductDto, ProductFilters } from "./types";

const PRODUCTS_ENDPOINT = "/products";

/** The back-end builds a RegExp from the raw value, so special chars must be escaped. */
function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function toApiQuery(filters: ProductFilters): QueryParams {
  return {
    modelo: escapeRegex(filters.search),
    categoria: escapeRegex(filters.category),
    armazenamento: escapeRegex(filters.storage),
    cor: escapeRegex(filters.color),
    active: filters.includeInactive ? undefined : true,
  };
}

export async function listProducts(filters: ProductFilters): Promise<Product[]> {
  const response = await api.get<ListProductsResponse | ProductDto[]>(PRODUCTS_ENDPOINT, {
    params: toApiQuery(filters),
    cache: "no-store",
  });

  const rawData = Array.isArray(response) ? response : response.data;
  const products = (rawData || []).map(toProduct);
  return sortProducts(applyLocalFilters(products, filters), filters.sort);
}

export async function listCategories(): Promise<string[]> {
  const response = await api.get<import("./types").ListCategoriesResponse>("/categories", {
    cache: "no-store",
  });
  return response.categories.map((c) => c.name);
}

