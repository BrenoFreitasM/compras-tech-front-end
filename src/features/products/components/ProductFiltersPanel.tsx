"use client";

import { RotateCcw } from "lucide-react";
import { DebouncedInput } from "@/components/ui/DebouncedInput";
import { FilterSection } from "@/components/ui/FilterSection";
import { COLOR_OPTIONS, SEARCH_DEBOUNCE_MS, STORAGE_OPTIONS } from "../constants";
import { hasActiveFilters } from "../filters";
import { useProductFilters } from "../hooks/useProductFilters";

const FIELD_CLASS =
  "w-full h-10 px-3 bg-brand-surface border border-brand-border rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 focus:border-[#2563EB]";

const LABEL_CLASS = "block text-xs font-medium text-text-tertiary mb-1.5";

function toOptionalNumber(value: string): number | undefined {
  return value === "" ? undefined : Number(value);
}

interface ProductFiltersPanelProps {
  categories: string[];
  models?: string[];
}

export function ProductFiltersPanel({ categories, models = [] }: ProductFiltersPanelProps) {
  const { filters, updateFilters, clearFilters } = useProductFilters();

  return (
    <div>
      {hasActiveFilters(filters) && (
        <div className="px-4 pb-3">
          <button
            type="button"
            onClick={clearFilters}
            className="w-full flex items-center justify-center gap-2 h-9 text-sm font-medium text-[#2563EB] border border-[#2563EB]/40 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 active:scale-[0.98]"
          >
            <RotateCcw className="w-4 h-4" />
            Limpar filtros
          </button>
        </div>
      )}

      <div className="divide-y divide-brand-border border-t border-brand-border">
        <FilterSection title="Categoria" defaultOpen={true}>
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            {categories.map((category) => {
              const isSelected = filters.category === category;
              return (
                <label key={category} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-200 ${
                    isSelected ? "bg-[#2563EB] border-[#2563EB]" : "border-brand-border group-hover:border-[#2563EB]/50"
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full bg-white transition-transform duration-200 ${isSelected ? "scale-100" : "scale-0"}`} />
                  </div>
                  <input
                    type="radio"
                    className="sr-only"
                    name="category"
                    checked={isSelected}
                    onChange={() => {
                      const newCategory = isSelected ? "" : category;
                      updateFilters({ category: newCategory, model: [] }); // reset model on category change
                    }}
                  />
                  <span className={`text-sm ${isSelected ? "text-text-primary font-medium" : "text-text-secondary group-hover:text-text-primary"}`}>
                    {category}
                  </span>
                </label>
              );
            })}
          </div>
        </FilterSection>

        {models.length > 0 && (
          <div className="animate-fade-in">
            <FilterSection title="Modelo" defaultOpen={true}>
              <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {models.map((model) => {
                  const isSelected = filters.model.includes(model);
                  return (
                    <label key={model} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all duration-200 ${
                        isSelected ? "bg-[#2563EB] border-[#2563EB]" : "border-brand-border group-hover:border-[#2563EB]/50"
                      }`}>
                        <svg viewBox="0 0 14 14" fill="none" className={`w-3 h-3 text-white transition-all duration-200 ${isSelected ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
                          <path d="M3 7.5L5.5 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <input
                      type="checkbox"
                      className="sr-only"
                      checked={isSelected}
                      onChange={() => {
                        const newModels = isSelected
                          ? filters.model.filter((m) => m !== model)
                          : [...filters.model, model];
                        updateFilters({ model: newModels });
                      }}
                    />
                    <span className={`text-sm ${isSelected ? "text-text-primary font-medium" : "text-text-secondary group-hover:text-text-primary"}`}>
                      {model}
                    </span>
                  </label>
                );
              })}
            </div>
          </FilterSection>
          </div>
        )}

        <FilterSection title="Faixa de preço">
          <div className="flex items-end gap-2">
            <label className="flex-1">
              <span className={LABEL_CLASS}>Mínimo (R$)</span>
              <DebouncedInput
                type="number"
                min={0}
                inputMode="numeric"
                placeholder="0"
                value={filters.minPrice?.toString() ?? ""}
                delayMs={SEARCH_DEBOUNCE_MS}
                onDebouncedChange={(value) => updateFilters({ minPrice: toOptionalNumber(value) })}
                className={FIELD_CLASS}
              />
            </label>
            <span className="pb-2.5 text-text-tertiary">-</span>
            <label className="flex-1">
              <span className={LABEL_CLASS}>Máximo (R$)</span>
              <DebouncedInput
                type="number"
                min={0}
                inputMode="numeric"
                placeholder="Sem limite"
                value={filters.maxPrice?.toString() ?? ""}
                delayMs={SEARCH_DEBOUNCE_MS}
                onDebouncedChange={(value) => updateFilters({ maxPrice: toOptionalNumber(value) })}
                className={FIELD_CLASS}
              />
            </label>
          </div>
        </FilterSection>

        <FilterSection title="Armazenamento">
          <div className="flex flex-wrap gap-2">
            {STORAGE_OPTIONS.map((storage) => {
              const isSelected = filters.storage === storage;
              return (
                <button
                  key={storage}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => updateFilters({ storage: isSelected ? "" : storage })}
                  className={`px-3 h-8 rounded-lg text-xs font-medium border transition-all duration-200 ${
                    isSelected
                      ? "bg-[#2563EB] border-[#2563EB] text-white"
                      : "border-brand-border text-text-secondary hover:border-[#2563EB]"
                  }`}
                >
                  {storage}
                </button>
              );
            })}
          </div>
        </FilterSection>

        <FilterSection title="Cor" defaultOpen={false}>
          <div className="flex flex-wrap gap-3">
            {COLOR_OPTIONS.map((colorOption) => {
              const isSelected = filters.color === colorOption.value;
              const isTransparent = colorOption.hex === "transparent";
              return (
                <button
                  key={colorOption.value}
                  type="button"
                  aria-label={colorOption.label}
                  title={colorOption.label}
                  aria-pressed={isSelected}
                  onClick={() => updateFilters({ color: isSelected ? "" : colorOption.value })}
                  className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 flex items-center justify-center relative overflow-hidden ${
                    isSelected
                      ? "border-blue-600 ring-2 ring-blue-500/30 ring-offset-2 dark:ring-offset-gray-950 scale-110"
                      : "border-black/10 dark:border-white/10"
                  }`}
                  style={{ backgroundColor: colorOption.hex }}
                >
                  {isTransparent && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-0.5 bg-red-500 -rotate-45" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </FilterSection>

        {/* <FilterSection title="Disponibilidade" defaultOpen={false}>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.includeInactive}
              onChange={(event) => updateFilters({ includeInactive: event.target.checked })}
              className="w-4 h-4 accent-[#2563EB]"
            />
            <span className="text-sm text-text-secondary">Incluir ofertas de dias anteriores</span>
          </label>
        </FilterSection> */}
      </div>
    </div>
  );
}
