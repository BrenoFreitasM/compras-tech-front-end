"use client";

import { useState, type ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface MarketplaceShellProps {
  sidebar: ReactNode;
  children: ReactNode;
}

/** Client-side layout state (mobile drawer / collapsed sidebar). Content is passed in as server-rendered slots. */
export function MarketplaceShell({ sidebar, children }: MarketplaceShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="bp-shell min-h-screen transition-colors duration-300">
      <div className="min-h-screen bg-brand-background dark:bg-[#050505]">
        <Header onMenuToggle={() => setSidebarOpen(true)} />

        <div className="flex">
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed((collapsed) => !collapsed)}
          >
            {sidebar}
          </Sidebar>

          {sidebarCollapsed && (
            <button
              type="button"
              onClick={() => setSidebarCollapsed(false)}
              aria-label="Expandir filtros"
              className="hidden lg:flex fixed left-0 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-6 h-12 bg-brand-surface dark:bg-brand-card border border-brand-border dark:border-brand-border-strong border-l-0 rounded-r-lg shadow-sm text-text-secondary hover:text-[#2563EB] transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          <main className="flex-1 min-w-0 p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
