"use client";

import { useState } from "react";
import {
  ChevronDown, ChevronLeft, X, Gift,
  Smartphone, TabletSmartphone, Laptop, Monitor,
  Headphones, Watch, Plug, Gamepad2, Bot,
} from "lucide-react";
import { Category, Condition, FilterState } from "@/types";
import { MOCK_SUPPLIERS, BRAZIL_STATES } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

const CATEGORIES: { value: Category; icon: React.ReactNode }[] = [
  { value: "iPhone", icon: <Smartphone className="w-4 h-4 text-text-tertiary" /> },
  { value: "iPad", icon: <TabletSmartphone className="w-4 h-4 text-text-tertiary" /> },
  { value: "MacBook", icon: <Laptop className="w-4 h-4 text-text-tertiary" /> },
  { value: "Macs", icon: <Monitor className="w-4 h-4 text-text-tertiary" /> },
  { value: "AirPods", icon: <Headphones className="w-4 h-4 text-text-tertiary" /> },
  { value: "Apple Watch", icon: <Watch className="w-4 h-4 text-text-tertiary" /> },
  { value: "Acessórios", icon: <Plug className="w-4 h-4 text-text-tertiary" /> },
  { value: "Eletrônicos", icon: <Gamepad2 className="w-4 h-4 text-text-tertiary" /> },
  { value: "Android", icon: <Bot className="w-4 h-4 text-text-tertiary" /> },
];

const CONDITIONS: Condition[] = ["Novo", "Usado"];

interface SidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  isOpen: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-brand-border dark:border-brand-border-strong last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
      >
        <span className="text-sm font-medium text-text-primary dark:text-white">{title}</span>
        <ChevronDown
          className={`w-4 h-4 text-text-tertiary transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="px-4 pb-4 animate-fade-in">{children}</div>}
    </div>
  );
}

export default function Sidebar({
  filters,
  onFiltersChange,
  isOpen,
  onClose,
  collapsed,
  onToggleCollapse,
}: SidebarProps) {
  function toggleCategory(cat: Category) {
    const exists = filters.categories.includes(cat);
    onFiltersChange({
      ...filters,
      categories: exists
        ? filters.categories.filter((c) => c !== cat)
        : [...filters.categories, cat],
    });
  }

  function toggleCondition(cond: Condition) {
    const exists = filters.conditions.includes(cond);
    onFiltersChange({
      ...filters,
      conditions: exists
        ? filters.conditions.filter((c) => c !== cond)
        : [...filters.conditions, cond],
    });
  }

  function toggleSupplier(id: string) {
    const exists = filters.suppliers.includes(id);
    onFiltersChange({
      ...filters,
      suppliers: exists
        ? filters.suppliers.filter((s) => s !== id)
        : [...filters.suppliers, id],
    });
  }

  function handleAffiliate() {
    toast.success("Ganhe R$ 100", {
      description: "Indique o WhatsApp ou e-mail de um amigo. Quando ele finalizar o pagamento, você recebe R$ 100!",
    });
  }

  const sidebarContent = (
    <div className="block">
      {/* Header da sidebar */}
      <div className="sticky top-0 z-10 bg-brand-surface dark:bg-brand-card border-b border-brand-border dark:border-brand-border-strong">
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-base font-semibold text-text-primary dark:text-white">Filtros</h2>
          <div className="flex items-center gap-1">
            {!collapsed && (
              <button
                onClick={onToggleCollapse}
                className="hidden lg:flex p-1.5 text-text-secondary hover:text-[#2563EB] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                title="Encolher filtros"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 text-text-secondary hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Botão afiliado */}
      <div className="p-3">
        <button
          onClick={handleAffiliate}
          className="w-full flex items-center gap-2.5 p-3 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-left text-white shadow-lg shadow-[#2563EB]/50 ring-1 ring-[#2563EB]/40 hover:from-[#1D4ED8] hover:to-[#1E40AF] hover:shadow-[#2563EB]/70 transition-all"
        >
          <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
            <Gift className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-extrabold leading-tight">Ganhe R$ 100</p>
            <p className="text-[11px] text-white/85 leading-tight">indicando a ComprasTech</p>
          </div>
        </button>
      </div>

      {/* Filtros */}
      <div className="divide-y divide-brand-border dark:divide-brand-border-strong">
        {/* Localização */}
        <FilterSection title="Localização">
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1.5">Estado</label>
            <select
              value={filters.state}
              onChange={(e) => onFiltersChange({ ...filters, state: e.target.value })}
              className="w-full px-3 py-2 bg-brand-surface dark:bg-brand-surface border border-brand-border rounded-lg text-sm text-text-primary focus:ring-2 focus:ring-[#2563EB] outline-none dark:text-gray-800"
            >
              <option value="">Todos</option>
              {BRAZIL_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </FilterSection>

        {/* Categoria */}
        <FilterSection title="Categoria">
          <div className="space-y-2">
            {CATEGORIES.map(({ value, icon }) => {
              const active = filters.categories.includes(value);
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => toggleCategory(value)}
                  className="flex items-center gap-3 cursor-pointer group w-full text-left"
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      active
                        ? "border-[#2563EB] bg-[#2563EB]"
                        : "border-brand-border dark:border-brand-border-strong group-hover:border-[#2563EB]"
                    }`}
                  >
                    {active && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  {icon}
                  <span className={`text-sm flex-1 ${active ? "text-[#2563EB] font-medium" : "text-text-secondary group-hover:text-text-primary dark:text-gray-300"}`}>
                    {value}
                  </span>
                </button>
              );
            })}
          </div>
        </FilterSection>

        {/* Faixa de Preço */}
        <FilterSection title="Faixa de Preço">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label className="text-xs text-text-tertiary mb-1 block">Mínimo</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-text-tertiary">R$</span>
                  <input
                    type="number"
                    value={filters.priceMin}
                    onChange={(e) => onFiltersChange({ ...filters, priceMin: Number(e.target.value) })}
                    className="w-full h-10 pl-9 pr-3 bg-white dark:bg-brand-background border border-brand-border dark:border-brand-border-strong rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 focus:border-[#2563EB] dark:text-white"
                  />
                </div>
              </div>
              <span className="text-text-tertiary mt-5">-</span>
              <div className="flex-1">
                <label className="text-xs text-text-tertiary mb-1 block">Máximo</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-text-tertiary">R$</span>
                  <input
                    type="number"
                    value={filters.priceMax}
                    onChange={(e) => onFiltersChange({ ...filters, priceMax: Number(e.target.value) })}
                    className="w-full h-10 pl-9 pr-3 bg-white dark:bg-brand-background border border-brand-border dark:border-brand-border-strong rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 focus:border-[#2563EB] dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </FilterSection>

        {/* Condição */}
        <FilterSection title="Condição">
          <div className="space-y-2">
            {CONDITIONS.map((cond) => {
              const active = filters.conditions.includes(cond);
              return (
                <div
                  key={cond}
                  onClick={() => toggleCondition(cond)}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      active
                        ? "border-[#2563EB] bg-[#2563EB]"
                        : "border-brand-border dark:border-brand-border-strong group-hover:border-[#2563EB]"
                    }`}
                  >
                    {active && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm flex-1 ${active ? "text-[#2563EB] font-medium" : "text-text-secondary group-hover:text-text-primary dark:text-gray-300"}`}>
                    {cond}
                  </span>
                </div>
              );
            })}
          </div>
        </FilterSection>

        {/* Fornecedor */}
        <FilterSection title="Fornecedor" defaultOpen={false}>
          <div className="space-y-2">
            {MOCK_SUPPLIERS.map((supplier) => {
              const active = filters.suppliers.includes(supplier.id);
              return (
                <div
                  key={supplier.id}
                  onClick={() => toggleSupplier(supplier.id)}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      active
                        ? "border-[#2563EB] bg-[#2563EB]"
                        : "border-brand-border dark:border-brand-border-strong group-hover:border-[#2563EB]"
                    }`}
                  >
                    {active && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm flex-1 ${active ? "text-[#2563EB] font-medium" : "text-text-secondary group-hover:text-text-primary dark:text-gray-300"}`}>
                    {supplier.name}
                  </span>
                  <span className="text-xs text-text-tertiary">{supplier.state}</span>
                </div>
              );
            })}
          </div>
        </FilterSection>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-14 left-0 z-50 h-[calc(100%-56px)]
          lg:relative lg:top-0 lg:z-10 lg:h-auto lg:flex-shrink-0
          bg-brand-surface dark:bg-brand-card
          border-r border-brand-border dark:border-brand-border-strong
          transform transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          overflow-y-auto lg:sticky lg:top-16 lg:h-[calc(100vh-64px)]
          shadow-xl lg:shadow-none
          w-[85vw] max-w-[320px]
          ${collapsed ? "lg:w-0 lg:overflow-hidden lg:border-r-0" : "lg:w-[280px] lg:max-w-none"}
        `}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
