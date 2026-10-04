"use client";

import type { ReactNode } from "react";
import { ChevronLeft, X, Gift } from "lucide-react";
import { toast } from "sonner";

interface SidebarProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

function handleAffiliate() {
  toast.success("Ganhe R$ 100", {
    description: "Indique o WhatsApp ou e-mail de um amigo. Quando ele finalizar o pagamento, você recebe R$ 100!",
  });
}

export default function Sidebar({ children, isOpen, onClose, collapsed, onToggleCollapse }: SidebarProps) {
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
          border-r border-brand-border 
          transform transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          overflow-y-auto lg:sticky lg:top-16 lg:h-[calc(100vh-64px)]
          shadow-xl lg:shadow-none
          w-[85vw] max-w-[320px]
          ${collapsed ? "lg:w-0 lg:overflow-hidden lg:border-r-0" : "lg:w-[280px] lg:max-w-none"}
        `}
      >
        {/* Header da sidebar */}
        <div className="sticky top-0 z-10 bg-brand-surface dark:bg-brand-card border-b border-brand-border ">
          <div className="flex items-center justify-between px-4 py-3">
            <h2 className="text-base font-semibold text-text-primary ">Filtros</h2>
            <div className="flex items-center gap-1">
              {!collapsed && (
                <button
                  type="button"
                  onClick={onToggleCollapse}
                  className="hidden lg:flex p-1.5 text-text-secondary hover:text-[#2563EB] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  title="Encolher filtros"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar filtros"
                className="lg:hidden p-1.5 text-text-secondary hover:text-text-primary hover:bg-black/5 dark:hover:bg-brand-surface/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Botão afiliado */}
        <div className="p-3">
          <button
            type="button"
            onClick={handleAffiliate}
            className="w-full flex items-center gap-2.5 p-3 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-left text-white shadow-lg shadow-[#2563EB]/50 ring-1 ring-[#2563EB]/40 hover:from-[#1D4ED8] hover:to-[#1E40AF] hover:shadow-[#2563EB]/70 transition-all"
          >
            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-brand-surface/20 flex items-center justify-center">
              <Gift className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-extrabold leading-tight">Ganhe R$ 100</p>
              <p className="text-[11px] text-white/85 leading-tight">indicando a ComprasTech</p>
            </div>
          </button>
        </div>

        {children}
      </aside>
    </>
  );
}
