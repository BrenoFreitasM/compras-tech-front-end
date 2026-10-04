import { AlertTriangle } from "lucide-react";
import { ApiError } from "@/services/errors";
import { hasActiveFilters } from "../filters";
import { listProducts } from "../products.service";
import type { Product, ProductFilters } from "../types";
import { ProductCatalog } from "./ProductCatalog";

interface ProductResultsProps {
  filters: ProductFilters;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError && error.isNetworkError) {
    return "Não foi possível conectar ao servidor. Verifique se o back-end está rodando.";
  }
  return "Ocorreu um erro ao carregar os produtos. Tente novamente em instantes.";
}

function ErrorState({ message }: { message: string }) {
  return (
    <div role="alert" className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
        <AlertTriangle className="w-8 h-8 text-red-500" />
      </div>
      <div>
        <p className="text-base font-semibold text-text-primary ">Erro ao carregar produtos</p>
        <p className="text-sm text-text-secondary  mt-1 max-w-md">{message}</p>
      </div>
    </div>
  );
}

/** Server Component: fetches products on the server so the back-end URL stays private and CORS is not needed. */
export async function ProductResults({ filters }: ProductResultsProps) {
  let products: Product[];

  try {
    products = await listProducts(filters);
  } catch (error) {
    console.error("[ProductResults] Failed to list products:", error);
    return <ErrorState message={getErrorMessage(error)} />;
  }

  const title = hasActiveFilters(filters) ? "Resultados da busca" : "Ofertas do dia";
  return <ProductCatalog products={products} title={title} />;
}
