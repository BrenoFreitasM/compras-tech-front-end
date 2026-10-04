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
    page: filters.page,
    limit: 20, // explicitly ask for 20 per page just in case
  };
}

export async function listProducts(filters: ProductFilters): Promise<import("./types").PaginatedProducts> {
  const response = await api.get<ListProductsResponse | ProductDto[]>(PRODUCTS_ENDPOINT, {
    params: toApiQuery(filters),
    cache: "no-store",
  });

  const rawData = Array.isArray(response) ? response : response.data;
  const products = (rawData || []).map(toProduct);
  const sorted = sortProducts(applyLocalFilters(products, filters), filters.sort);

  return {
    products: sorted,
    pagination: {
      currentPage: Array.isArray(response) ? 1 : response.currentPage ?? 1,
      totalPages: Array.isArray(response) ? 1 : response.totalPages ?? 1,
      totalCount: Array.isArray(response) ? sorted.length : response.totalCount ?? sorted.length,
    },
  };
}

export async function listCategories(): Promise<string[]> {
  const response = await api.get<import("./types").ListCategoriesResponse>("/categories", {
    cache: "no-store",
  });
  return response.categories.map((c) => c.name);
}

