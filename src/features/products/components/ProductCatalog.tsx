"use client";

import { useState } from "react";
import { Grid, List, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { SORT_OPTIONS } from "../constants";
import { useProductFilters } from "../hooks/useProductFilters";
import type { Product, ProductSort } from "../types";
import { ProductCard, type ProductCardLayout } from "./ProductCard";

interface ProductCatalogProps {
  products: Product[];
  title: string;
}

const VIEW_OPTIONS: ReadonlyArray<{ value: ProductCardLayout; label: string; Icon: typeof Grid }> = [
  { value: "list", label: "Lista", Icon: List },
  { value: "grid", label: "Cards", Icon: Grid },
];

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <Package className="w-8 h-8 text-text-tertiary" />
      </div>
      <div>
        <p className="text-base font-semibold text-text-primary dark:text-white">Nenhum produto encontrado</p>
        <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">Tente ajustar os filtros ou a busca</p>
      </div>
      <button type="button" onClick={onClear} className="text-sm font-medium text-[#2563EB] hover:underline">
        Limpar filtros
      </button>
    </div>
  );
}

export function ProductCatalog({ products, title }: ProductCatalogProps) {
  const [layout, setLayout] = useState<ProductCardLayout>("grid");
  const { filters, updateFilters, clearFilters, isPending } = useProductFilters();
  const countLabel = products.length === 1 ? "produto encontrado" : "produtos encontrados";

  return (
    <section aria-busy={isPending} className={cn("transition-opacity", isPending && "opacity-60")}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-lg font-bold text-text-primary dark:text-white">{title}</h1>
          <p className="text-sm text-text-secondary dark:text-gray-400 mt-0.5">
            {products.length} {countLabel}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-brand-surface dark:bg-brand-card rounded-lg border border-brand-border dark:border-brand-border-strong shadow-sm p-1">
            {VIEW_OPTIONS.map(({ value, label, Icon }) => (
              <button
                key={value}
                type="button"
                aria-pressed={layout === value}
                onClick={() => setLayout(value)}
                title={`Visualização em ${label.toLowerCase()}`}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200",
                  layout === value
                    ? "bg-[#2563EB] text-white shadow-md"
                    : "text-text-muted hover:bg-gray-100 dark:hover:bg-gray-700",
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>

          <select
            aria-label="Ordenar produtos"
            value={filters.sort}
            onChange={(event) => updateFilters({ sort: event.target.value as ProductSort })}
            className="text-sm border border-brand-border dark:border-brand-border-strong rounded-lg px-3 py-2 bg-white dark:bg-brand-card text-text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50"
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
        <div
          className={
            layout === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4"
              : "flex flex-col gap-3"
          }
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} layout={layout} />
          ))}
        </div>
      )}
    </section>
  );
}
