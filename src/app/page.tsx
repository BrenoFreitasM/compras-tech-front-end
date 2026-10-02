"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import ProductGrid from "@/components/marketplace/ProductGrid";
import { FilterState } from "@/types";
import { MOCK_PRODUCTS } from "@/lib/mock-data";

const DEFAULT_FILTERS: FilterState = {
  search: "",
  state: "",
  categories: [],
  conditions: [],
  suppliers: [],
  priceMin: 0,
  priceMax: 50000,
};

export default function HomePage() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="bp-shell min-h-screen transition-colors duration-300">
      <div className="min-h-screen bg-brand-background dark:bg-[#050505]">
        <Header
          onSearch={(value) => setFilters((f) => ({ ...f, search: value }))}
          searchValue={filters.search}
          onMenuToggle={() => setSidebarOpen(true)}
        />

        <div className="flex">
          <Sidebar
            filters={filters}
            onFiltersChange={setFilters}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
          />

          {/* Botão para expandir sidebar quando colapsada */}
          {sidebarCollapsed && (
            <button
              onClick={() => setSidebarCollapsed(false)}
              className="hidden lg:flex fixed left-0 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-6 h-12 bg-brand-surface dark:bg-brand-card border border-brand-border dark:border-brand-border-strong border-l-0 rounded-r-lg shadow-sm text-text-secondary hover:text-orange-500 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          <ProductGrid products={MOCK_PRODUCTS} filters={filters} />
        </div>
      </div>
    </div>
  );
}
