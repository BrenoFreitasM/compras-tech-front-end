import { Suspense } from "react";
import { MarketplaceShell } from "@/components/layout/MarketplaceShell";
import PriceTrendChart from "@/components/marketplace/PriceTrendChart";
import { ProductFiltersPanel } from "@/features/products/components/ProductFiltersPanel";
import { ProductListSkeleton } from "@/features/products/components/ProductListSkeleton";
import { ProductResults } from "@/features/products/components/ProductResults";
import { hasActiveFilters, parseProductFilters, serializeProductFilters } from "@/features/products/filters";
import { listCategories, listModels } from "@/features/products/products.service";
import type { SearchParams } from "@/features/products/types";

interface HomePageProps {
  searchParams: Promise<SearchParams>;
}

import { redirect } from "next/navigation";
import { ApiError } from "@/services/errors";

export default async function HomePage({ searchParams }: HomePageProps) {
  const filters = parseProductFilters(await searchParams);
  
  let categories: string[] = [];
  let models: string[] = [];

  try {
    categories = await listCategories();
    if (filters.category.length > 0) {
      models = await listModels(filters.category);
    }
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      redirect("/logout");
    }
    console.error("[HomePage] Failed to list categories or models:", error);
  }

  return (
    <MarketplaceShell sidebar={<ProductFiltersPanel categories={categories} models={models} />}>
      {/* {!hasActiveFilters(filters) && <PriceTrendChart />} */}

      <Suspense key={serializeProductFilters(filters)} fallback={<ProductListSkeleton />}>
        <ProductResults filters={filters} />
      </Suspense>
    </MarketplaceShell>
  );
}
