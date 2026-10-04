"use client";

import { Search } from "lucide-react";
import { DebouncedInput } from "@/components/ui/DebouncedInput";
import { cn } from "@/lib/utils";
import { SEARCH_DEBOUNCE_MS } from "../constants";
import { useProductFilters } from "../hooks/useProductFilters";

interface ProductSearchInputProps {
  className?: string;
}

export function ProductSearchInput({ className }: ProductSearchInputProps) {
  const { filters, updateFilters } = useProductFilters();

  return (
    <form role="search" className={cn("relative", className)} onSubmit={(event) => event.preventDefault()}>
      <Search className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none" />
      <DebouncedInput
        type="search"
        aria-label="Buscar produtos"
        placeholder="Buscar por modelo (ex: iPhone 15)..."
        value={filters.search}
        delayMs={SEARCH_DEBOUNCE_MS}
        onDebouncedChange={(search) => updateFilters({ search })}
        className="w-full h-10 lg:h-11 pl-9 lg:pl-11 pr-4 bg-white dark:bg-brand-background border border-brand-border dark:border-brand-border-strong rounded-xl text-text-primary dark:text-white placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all text-sm lg:text-base"
      />
    </form>
  );
}
