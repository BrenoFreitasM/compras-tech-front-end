"use client";

import { useState } from "react";
import {
  Gift,
  ChevronDown,
  Menu,
  Sun,
  Moon,
  User,
  ShoppingBag,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "@/components/ThemeProvider";
import { ProductSearchInput } from "@/features/products/components/ProductSearchInput";

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  function handleAffiliate() {
    toast.success("Ganhe 1 Mês VIP", {
      description: "Programa de Membros – aproveite benefícios exclusivos!",
    });
  }

  return (
    <header className="sticky top-0 z-40 bg-[#F8FAFC] dark:bg-[#0F172A] backdrop-blur-xl border-b border-brand-border ">
      {/* Desktop */}
      <div className="hidden md:block">
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 xl:gap-7 2xl:gap-10 px-4 lg:px-6 xl:px-8 2xl:px-12 h-14 lg:h-16 w-full">
          {/* Logo */}
          <div className="flex min-w-0 items-center gap-3 xl:gap-4">
            <a href="/" className="flex-shrink-0">
              <span className="text-xl font-extrabold text-[#2563EB] tracking-tight">
                ComprasTech<span className="text-text-primary "></span>
              </span>
            </a>
          </div>

          {/* Search */}
          <ProductSearchInput className="w-full min-w-0 max-w-4xl justify-self-center" />

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 xl:gap-3">
            {/* Botão Ganhe 1 Mês VIP */}
            <button
              onClick={handleAffiliate}
              title="Programa de Membros"
              className="flex-shrink-0 flex min-h-9 items-center gap-1 px-2 py-1.5 rounded-lg
                         bg-gradient-to-r from-[#2563EB] to-[#2563EB] hover:from-[#1D4ED8] hover:to-[#1D4ED8]
                         text-white text-xs xl:text-sm font-bold shadow-sm xl:shadow-[0_3px_14px_rgba(37,99,235,0.38)]
                         ring-1 ring-[#2563EB]/40 hover:-translate-y-0.5 transition-all"
            >
              <Gift className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
              <span className="xl:hidden">1 Mês VIP</span>
              <span className="hidden xl:inline">Ganhe 1 Mês VIP</span>
              <span className="ml-1 rounded-full bg-[#7C3AED] px-2 py-0.5 text-xs font-medium text-white">
                Programa de Membros
              </span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 transition-all px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-brand-surface/5"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#2563EB] flex items-center justify-center text-white text-sm font-bold shadow-md">
                  IR
                </div>
                <span className="hidden lg:block text-sm font-medium text-text-primary  max-w-24 truncate">
                  Isac Reis
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-text-secondary transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-52 bg-brand-surface border border-brand-border  rounded-xl shadow-xl py-1 z-20 animate-fade-in">
                    {/* user info */}
                    <div className="px-4 py-3 border-b border-brand-border ">
                      <p className="text-sm font-semibold text-text-primary ">Isac Reis</p>
                      <p className="text-xs text-text-secondary  truncate">isac@email.com</p>
                    </div>
                    {/* menu items */}
                    <a
                      href="#"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-text-primary  hover:bg-gray-50 dark:hover:bg-brand-surface/5 transition-colors"
                    >
                      <User className="w-4 h-4 text-text-secondary" />
                      Meu Perfil
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-text-primary  hover:bg-gray-50 dark:hover:bg-brand-surface/5 transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4 text-text-secondary" />
                      Meus Pedidos
                    </a>
                    {/* dark/light toggle */}
                    <div className="px-4 py-2.5 border-t border-brand-border  mt-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          {theme === "dark" ? (
                            <Moon className="w-4 h-4 text-text-secondary" />
                          ) : (
                            <Sun className="w-4 h-4 text-text-secondary" />
                          )}
                          <span className="text-sm text-text-primary ">
                            {theme === "dark" ? "Modo Escuro" : "Modo Claro"}
                          </span>
                        </div>
                        <button
                          onClick={toggleTheme}
                          className={`relative w-10 h-6 rounded-full transition-colors duration-300 focus:outline-none ${
                            theme === "dark" ? "bg-[#2563EB]" : "bg-gray-200"
                          }`}
                          aria-label="Alternar tema"
                        >
                          <span
                            className={`absolute top-1 left-1 w-4 h-4 bg-brand-surface rounded-full shadow-sm transition-transform duration-300 ${
                              theme === "dark" ? "translate-x-4" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                    <hr className="my-1 border-brand-border " />
                    <a
                      href="#"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sair
                    </a>
                  </div>
                </>
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
            className="p-2 -ml-2 text-text-secondary hover:text-text-primary hover:bg-black/5 dark:hover:bg-brand-surface/5 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex flex-col items-center">
            <a href="/" className="flex-shrink-0">
              <span className="text-lg font-extrabold text-[#2563EB] tracking-tight">
                ComprasTech<span className="text-text-primary ">.app.br</span>
              </span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-black/5 dark:hover:bg-brand-surface/5 rounded-lg transition-colors"
              aria-label="Alternar tema"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#2563EB] flex items-center justify-center text-white text-sm font-bold shadow-md">
              IR
            </div>
          </div>
        </div>
        <div className="px-4 pb-3">
          <ProductSearchInput />
        </div>
      </div>
    </header>
  );
}
