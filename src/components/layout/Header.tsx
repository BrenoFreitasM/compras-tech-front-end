"use client";

import { useState } from "react";
import { Search, Store, Package, Gift, ChevronDown, Menu, X } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { toast } from "sonner";

const TOTAL_SUPPLIERS = 97;
const TOTAL_OFFERS = 6200;

interface HeaderProps {
  onSearch: (value: string) => void;
  searchValue: string;
  onMenuToggle: () => void;
}

export default function Header({ onSearch, searchValue, onMenuToggle }: HeaderProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  function handleAffiliate() {
    toast.success("Programa de indicação", {
      description: "Em breve você poderá indicar amigos e ganhar R$150!",
    });
  }

  return (
    <header className="sticky top-0 z-40 bg-brand-surface/95 dark:bg-brand-card/95 backdrop-blur-xl border-b border-brand-border dark:border-brand-border-strong">
      {/* Desktop */}
      <div className="hidden md:block">
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 xl:gap-7 2xl:gap-10 px-4 lg:px-6 xl:px-8 2xl:px-12 h-14 lg:h-16 w-full">
          {/* Logo + Stats */}
          <div className="flex min-w-0 items-center gap-3 xl:gap-4">
            <a href="/" className="flex-shrink-0">
              <span className="text-xl font-extrabold text-orange-500 tracking-tight">
                Buska<span className="text-text-primary dark:text-white">Phone</span>
              </span>
            </a>

            <div className="hidden xl:flex items-center gap-3 px-3 py-1.5 bg-gray-100/80 dark:bg-gray-800/50 rounded-lg">
              <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                <Store className="w-3.5 h-3.5 text-orange-500" />
                <span className="font-medium text-text-primary">{TOTAL_SUPPLIERS}</span>
                <span className="hidden 2xl:inline">fornecedores</span>
              </div>
              <div className="w-px h-3 bg-gray-300 dark:bg-gray-600" />
              <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                <Package className="w-3.5 h-3.5 text-orange-500" />
                <span className="font-medium text-text-primary">{formatNumber(TOTAL_OFFERS)}</span>
                <span className="hidden 2xl:inline">ofertas</span>
              </div>
            </div>
          </div>

          {/* Search */}
          <form className="w-full min-w-0 max-w-4xl justify-self-center" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <Search className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchValue}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full h-10 lg:h-11 pl-9 lg:pl-11 pr-9 bg-white dark:bg-brand-background border border-brand-border dark:border-brand-border-strong rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-sm lg:text-base dark:text-white"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 xl:gap-3">
            <button
              onClick={handleAffiliate}
              title="Indique e ganhe R$150"
              className="flex-shrink-0 flex min-h-9 items-center gap-1 px-2 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white text-xs xl:text-sm font-bold shadow-sm xl:shadow-[0_3px_14px_rgba(255,77,0,0.38)] ring-1 ring-orange-300/40 hover:-translate-y-0.5 transition-all"
            >
              <Gift className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
              <span className="xl:hidden">R$150</span>
              <span className="hidden xl:inline">Ganhe R$150</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 transition-all px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
                  IR
                </div>
                <span className="hidden lg:block text-sm font-medium text-text-primary dark:text-white max-w-24 truncate">
                  Isac reis
                </span>
                <ChevronDown className={`w-4 h-4 text-text-secondary transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-brand-card border border-brand-border dark:border-brand-border-strong rounded-xl shadow-lg py-1 animate-fade-in">
                  <a href="#" className="block px-4 py-2 text-sm text-text-primary dark:text-white hover:bg-gray-50 dark:hover:bg-white/5">
                    Meu Perfil
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-text-primary dark:text-white hover:bg-gray-50 dark:hover:bg-white/5">
                    Meus Pedidos
                  </a>
                  <hr className="my-1 border-brand-border dark:border-brand-border-strong" />
                  <a href="#" className="block px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                    Sair
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={onMenuToggle}
            className="p-2 -ml-2 text-text-secondary hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex flex-col items-center">
            <a href="/" className="flex-shrink-0">
              <span className="text-lg font-extrabold text-orange-500 tracking-tight">
                Buska<span className="text-text-primary dark:text-white">Phone</span>
              </span>
            </a>
            <div className="flex items-center gap-2 text-[10px] text-text-tertiary mt-0.5">
              <span>{TOTAL_SUPPLIERS} fornecedores</span>
              <span>•</span>
              <span>{formatNumber(TOTAL_OFFERS)} ofertas</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAffiliate}
              title="Indique e ganhe R$150"
              className="flex min-h-9 items-center gap-1 px-2 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[11px] font-bold shadow-sm ring-1 ring-orange-300/30"
            >
              <Gift className="w-3.5 h-3.5" />
              <span>R$150</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
              IR
            </div>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchValue}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full h-10 pl-9 pr-4 bg-white dark:bg-brand-background border border-brand-border dark:border-brand-border-strong rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-sm dark:text-white"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
