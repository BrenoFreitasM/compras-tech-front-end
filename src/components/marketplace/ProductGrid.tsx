"use client";

import { Package } from "lucide-react";
import { Product, FilterState } from "@/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  filters: FilterState;
}

export default function ProductGrid({ products, filters }: ProductGridProps) {
  // Filtragem no cliente
  const filtered = products.filter((p) => {
    // Busca por texto
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const match =
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.supplier.name.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Estado
    if (filters.state && p.supplier.state !== filters.state) return false;

    // Categorias
    if (filters.categories.length > 0 && !filters.categories.includes(p.category)) return false;

    // Condições
    if (filters.conditions.length > 0 && !filters.conditions.includes(p.condition)) return false;

    // Fornecedores
    if (filters.suppliers.length > 0 && !filters.suppliers.includes(p.supplier.id)) return false;

    // Preço
    if (p.price < filters.priceMin || p.price > filters.priceMax) return false;

    return true;
  });

  const hasActiveFilters =
    filters.search ||
    filters.state ||
    filters.categories.length > 0 ||
    filters.conditions.length > 0 ||
    filters.suppliers.length > 0;

  return (
    <div className="flex-1 min-w-0 p-4 lg:p-6">
      {/* Cabeçalho do grid */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-lg font-bold text-text-primary dark:text-white">
            {hasActiveFilters ? "Resultados da busca" : "Todos os produtos"}
          </h1>
          <p className="text-sm text-text-secondary dark:text-gray-400 mt-0.5">
            {filtered.length} {filtered.length === 1 ? "produto encontrado" : "produtos encontrados"}
          </p>
        </div>

        {/* Ordenação (visual only por agora) */}
        <select className="hidden sm:block text-sm border border-brand-border dark:border-brand-border-strong rounded-lg px-3 py-1.5 bg-white dark:bg-brand-card text-text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50">
          <option>Mais relevantes</option>
          <option>Menor preço</option>
          <option>Maior preço</option>
          <option>Mais recentes</option>
        </select>
      </div>

      {/* Grid ou estado vazio */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Package className="w-8 h-8 text-text-tertiary" />
          </div>
          <div className="text-center">
            <p className="text-base font-semibold text-text-primary dark:text-white">
              Nenhum produto encontrado
            </p>
            <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">
              Tente ajustar os filtros ou a busca
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
