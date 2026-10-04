"use client";

import { ChevronLeft, ChevronRight, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { SORT_OPTIONS } from "../constants";
import { useProductFilters } from "../hooks/useProductFilters";
import type { PaginationMeta, Product, ProductSort } from "../types";
import { ProductCard } from "./ProductCard";

interface ProductCatalogProps {
  products: Product[];
  pagination: PaginationMeta;
  title: string;
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <Package className="w-8 h-8 text-text-tertiary" />
      </div>
      <div>
        <p className="text-base font-semibold text-text-primary ">Nenhum produto encontrado</p>
        <p className="text-sm text-text-secondary  mt-1">Tente ajustar os filtros ou a busca</p>
      </div>
      <button type="button" onClick={onClear} className="text-sm font-medium text-[#2563EB] hover:underline">
        Limpar filtros
      </button>
    </div>
  );
}

export function ProductCatalog({ products, pagination, title }: ProductCatalogProps) {
  const { filters, updateFilters, clearFilters, isPending } = useProductFilters();
  const countLabel = pagination.totalCount === 1 ? "produto encontrado" : "produtos encontrados";

  return (
    <section aria-busy={isPending} className={cn("transition-opacity", isPending && "opacity-60")}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-lg font-bold text-text-primary ">{title}</h1>
          <p className="text-sm text-text-secondary  mt-0.5">
            {pagination.totalCount} {countLabel}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <select
            aria-label="Ordenar produtos"
            value={filters.sort}
            onChange={(event) => updateFilters({ sort: event.target.value as ProductSort })}
            className="text-sm border border-brand-border  rounded-lg px-3 py-2 bg-brand-surface text-text-primary  focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {products.length === 0 ? (
        <EmptyState onClear={clearFilters} />
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                type="button"
                disabled={pagination.currentPage <= 1}
                onClick={() => updateFilters({ page: pagination.currentPage - 1 })}
                className="p-2 rounded-lg border border-brand-border bg-brand-surface text-text-secondary hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none transition-colors"
                aria-label="Página anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <span className="text-sm font-medium text-text-secondary px-4">
                Página {pagination.currentPage} de {pagination.totalPages}
              </span>

              <button
                type="button"
                disabled={pagination.currentPage >= pagination.totalPages}
                onClick={() => updateFilters({ page: pagination.currentPage + 1 })}
                className="p-2 rounded-lg border border-brand-border bg-brand-surface text-text-secondary hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none transition-colors"
                aria-label="Próxima página"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
