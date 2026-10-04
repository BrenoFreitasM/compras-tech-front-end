import { BatteryMedium, Calendar, Camera, Headphones, Laptop, MessageCircle, Package, Smartphone, Tablet, Watch } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { getProductTitle } from "../mappers";
import type { Product } from "../types";

export type ProductCardLayout = "grid" | "list";

interface ProductCardProps {
  product: Product;
  layout: ProductCardLayout;
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  smartphone: Smartphone,
  smartwatch: Watch,
  notebook: Laptop,
  tablet: Tablet,
  fone: Headphones,
  câmera: Camera,
};

const dateFormatter = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit" });

function getCategoryIcon(category: string): LucideIcon {
  return CATEGORY_ICONS[category.toLowerCase()] ?? Package;
}

function formatPostedAt(isoDate: string): string {
  const date = new Date(isoDate);
  const isToday = date.toDateString() === new Date().toDateString();
  return isToday ? "Hoje" : dateFormatter.format(date);
}

function getBatteryColor(battery: number): string {
  if (battery >= 90) return "text-emerald-600 dark:text-emerald-400";
  if (battery >= 80) return "text-amber-600 dark:text-amber-400";
  return "text-red-600 dark:text-red-400";
}

function ProductSpecs({ product }: { product: Product }) {
  const specs = [product.storage, product.color].filter(Boolean);

  return (
    <div className="mt-2 flex flex-wrap items-center gap-1.5">
      {specs.map((spec) => (
        <span
          key={spec}
          className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/5 text-[11px] text-text-secondary dark:text-gray-300"
        >
          {spec}
        </span>
      ))}
      {product.batteryHealth !== null && (
        <span className={cn("flex items-center gap-1 text-[11px] font-medium", getBatteryColor(product.batteryHealth))}>
          <BatteryMedium className="w-3.5 h-3.5" />
          {product.batteryHealth}%
        </span>
      )}
    </div>
  );
}

function ContactButton({ whatsappUrl }: { whatsappUrl: string | null }) {
  if (!whatsappUrl) {
    return (
      <span className="flex-1 h-8 flex items-center justify-center text-xs text-text-tertiary border border-dashed border-brand-border dark:border-brand-border-strong rounded-lg">
        Contato via grupo
      </span>
    );
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1 h-8 flex items-center justify-center gap-1.5 text-xs font-semibold bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white rounded-lg transition-all"
    >
      <MessageCircle className="w-3.5 h-3.5" />
      Chamar no WhatsApp
    </a>
  );
}

export function ProductCard({ product, layout }: ProductCardProps) {
  const CategoryIcon = getCategoryIcon(product.category);
  const isList = layout === "list";

  return (
    <article
      className={cn(
        "group bg-white dark:bg-brand-card rounded-2xl border border-brand-border dark:border-brand-border-strong hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/30 transition-all duration-200",
        isList ? "flex flex-col sm:flex-row gap-4 p-4" : "flex flex-col overflow-hidden hover:-translate-y-0.5",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 dark:from-gray-900 dark:to-gray-800",
          isList ? "w-full h-24 sm:w-28 sm:h-28 rounded-xl flex-shrink-0" : "aspect-[4/3]",
        )}
      >
        <CategoryIcon className="w-10 h-10 text-[#2563EB]/60" aria-hidden />
      </div>

      <div className={cn("flex flex-1 flex-col min-w-0", !isList && "p-3")}>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-semibold text-[#2563EB] uppercase tracking-wider">{product.category}</span>
          <span className="flex items-center gap-1 text-[10px] text-text-tertiary">
            <Calendar className="w-3 h-3" />
            {formatPostedAt(product.createdAt)}
          </span>
        </div>

        <h3 className="text-sm font-semibold text-text-primary dark:text-white mt-0.5 line-clamp-2 leading-snug">
          {getProductTitle(product)}
        </h3>

        <ProductSpecs product={product} />

        {product.notes && (
          <p className="text-[11px] text-text-tertiary dark:text-gray-400 mt-2 line-clamp-2">{product.notes}</p>
        )}

        <div className={cn("mt-auto pt-3 flex gap-3", isList ? "sm:items-center" : "flex-col")}>
          <span className="text-base font-extrabold text-text-primary dark:text-white">
            {product.price !== null ? formatCurrency(product.price) : "Preço sob consulta"}
          </span>
          <div className={cn("flex", isList && "sm:ml-auto sm:w-48")}>
            <ContactButton whatsappUrl={product.whatsappUrl} />
          </div>
        </div>
      </div>
    </article>
  );
}
