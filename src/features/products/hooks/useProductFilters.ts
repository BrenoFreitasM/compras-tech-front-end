"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useTransition } from "react";
import { DEFAULT_PRODUCT_FILTERS } from "../constants";
import { parseProductFilters, serializeProductFilters } from "../filters";
import type { ProductFilters } from "../types";

/** Filters live in the URL: shareable links, back/forward support and server-side fetching. */
export function useProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const filters = useMemo(() => parseProductFilters(Object.fromEntries(searchParams)), [searchParams]);

  const navigate = useCallback(
    (next: ProductFilters) => {
      const query = serializeProductFilters(next);
      startTransition(() => {
        router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
      });
    },
    [pathname, router],
  );

  const updateFilters = useCallback(
    (patch: Partial<ProductFilters>) => navigate({ ...filters, ...patch }),
    [filters, navigate],
  );

  const clearFilters = useCallback(
    () => navigate({ ...DEFAULT_PRODUCT_FILTERS, sort: filters.sort }),
    [filters.sort, navigate],
  );

  return { filters, updateFilters, clearFilters, isPending };
}
