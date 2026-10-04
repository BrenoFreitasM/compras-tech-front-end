"use client";

import { useState } from "react";
import { Package, List, Grid, MapPin, BadgeCheck, ShoppingCart, Star } from "lucide-react";
import { Product, FilterState } from "@/types";
import ProductCard from "./ProductCard";
import PriceTrendChart from "./PriceTrendChart";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

interface ProductGridProps {
  products: Product[];
  filters: FilterState;
}

export default function ProductGrid({ products, filters }: ProductGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filtragem no cliente
  const filtered = products.filter((p) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const match =
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.supplier.name.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (filters.state && p.supplier.state !== filters.state) return false;
    if (filters.categories.length > 0 && !filters.categories.includes(p.category)) return false;
    if (filters.conditions.length > 0 && !filters.conditions.includes(p.condition)) return false;
    if (filters.suppliers.length > 0 && !filters.suppliers.includes(p.supplier.id)) return false;
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
      {/* Gráfico de Tendência (Ocultar se houver busca) */}
      {!hasActiveFilters && <PriceTrendChart />}

      {/* Cabeçalho do grid */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-lg font-bold text-text-primary dark:text-white">
            {hasActiveFilters ? "Resultados da busca" : "Novidades"}
          </h1>
          <p className="text-sm text-text-secondary dark:text-gray-400 mt-0.5">
            {filtered.length} {filtered.length === 1 ? "produto encontrado" : "produtos encontrados"}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Botões de Visualização */}
          <div className="flex items-center gap-1 bg-brand-surface dark:bg-brand-card rounded-lg border border-brand-border dark:border-brand-border-strong shadow-sm p-1">
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 ${viewMode === "list" ? "bg-[#2563EB] text-white shadow-md" : "text-text-muted hover:bg-gray-100 dark:hover:bg-gray-700"}`}
              title="Visualização em lista"
            >
              <List className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">Lista</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 ${viewMode === "grid" ? "bg-[#2563EB] text-white shadow-md" : "text-text-muted hover:bg-gray-100 dark:hover:bg-gray-700"}`}
              title="Visualização em cards"
            >
              <Grid className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">Cards</span>
            </button>
          </div>

          {/* Ordenação */}
          <select className="hidden sm:block text-sm border border-brand-border dark:border-brand-border-strong rounded-lg px-3 py-2 bg-white dark:bg-brand-card text-text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50">
            <option>Mais relevantes</option>
            <option>Menor preço</option>
            <option>Maior preço</option>
            <option>Mais recentes</option>
          </select>
        </div>
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
        <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4" : "flex flex-col gap-3"}>
          {filtered.map((product) => (
            viewMode === "grid" ? (
              <ProductCard key={product.id} product={product} />
            ) : (
              <div key={product.id} className="flex flex-col sm:flex-row bg-white dark:bg-brand-card border border-brand-border dark:border-brand-border-strong rounded-2xl p-4 gap-4 sm:gap-6 hover:shadow-md transition-shadow">
                {/* Imagem */}
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden">
                  <Image src={product.imageUrl} alt={product.name} fill className="object-cover" sizes="128px" />
                </div>
                
                {/* Infos */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-semibold text-[#2563EB] uppercase tracking-wider">{product.category}</span>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${product.condition === "Novo" ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"}`}>{product.condition}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-text-primary dark:text-white line-clamp-1">{product.name}</h3>
                  <p className="text-xs text-text-tertiary dark:text-gray-400 mt-1 line-clamp-2 sm:line-clamp-1">{product.description}</p>
                  
                  {/* Fornecedor */}
                  <div className="mt-3 flex items-center gap-2 text-xs text-text-secondary dark:text-gray-400">
                    {product.supplier.verified && <BadgeCheck className="w-3.5 h-3.5 text-blue-500" />}
                    <span className="font-medium">{product.supplier.name}</span>
                    <span>·</span>
                    <MapPin className="w-3 h-3" /> <span>{product.supplier.state}</span>
                    <span>·</span>
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> <span>{product.supplier.rating}</span>
                  </div>
                </div>

                {/* Preço e Ações */}
                <div className="sm:w-48 flex flex-col justify-center sm:items-end border-t sm:border-t-0 sm:border-l border-brand-border dark:border-brand-border-strong pt-3 sm:pt-0 sm:pl-6">
                  <div className="flex items-baseline gap-2 sm:flex-col sm:items-end sm:gap-0">
                    <span className="text-lg font-extrabold text-text-primary dark:text-white">{formatCurrency(product.price)}</span>
                    {product.priceOld && <span className="text-xs text-text-tertiary line-through">{formatCurrency(product.priceOld)}</span>}
                  </div>
                  <div className="flex gap-2 mt-3 w-full">
                    <button onClick={() => toast.info("Contato", {description: "Entrando em contato..."})} className="flex-1 sm:flex-none px-3 h-8 text-xs font-semibold border border-[#2563EB] text-[#2563EB] rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                      Contato
                    </button>
                    <button onClick={() => toast.success("Adicionado")} className="flex-1 sm:flex-none px-3 h-8 text-xs font-semibold bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] text-white rounded-lg flex items-center justify-center gap-1 transition-all">
                      <ShoppingCart className="w-3.5 h-3.5" /> Comprar
                    </button>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}
