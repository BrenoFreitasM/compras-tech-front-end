import Image from "next/image";
import { Calendar, MessageCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { getProductTitle } from "../mappers";
import type { Product } from "../types";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit" });

function formatPostedAt(isoDate: string): string {
  const date = new Date(isoDate);
  const isToday = date.toDateString() === new Date().toDateString();
  
  if (isToday) {
    const timeFormatter = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" });
    return `Hoje, ${timeFormatter.format(date)}`;
  }
  return dateFormatter.format(date);
}

function ProductSpecs({ product }: { product: Product }) {
  const specs = [product.storage, product.color].filter(Boolean);

  return (
    <div className="mt-2 flex flex-wrap items-center gap-1.5">
      {specs.map((spec) => (
        <span
          key={spec}
          className="px-2 py-0.5 rounded-md bg-brand-background text-[11px] text-text-secondary "
        >
          {spec}
        </span>
      ))}
    </div>
  );
}

function ContactButton({ whatsappUrl }: { whatsappUrl: string | null }) {
  if (!whatsappUrl) {
    return (
      <span className="flex-1 h-11 flex items-center justify-center text-sm font-medium text-text-tertiary border border-dashed border-brand-border rounded-xl bg-brand-background/50">
        Número indisponível
      </span>
    );
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1 h-11 px-4 flex items-center justify-center gap-2 text-sm font-bold bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl shadow-md shadow-[#25D366]/20 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
    >
      <MessageCircle className="w-5 h-5" />
      Chamar no WhatsApp
    </a>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group bg-brand-surface rounded-3xl border border-brand-border hover:border-[#2563EB]/30 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-[#2563EB]/10 transition-all duration-300 flex flex-col sm:flex-row gap-5 p-4 sm:p-5">
      <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-900 w-full h-40 sm:w-36 sm:h-36 rounded-2xl flex-shrink-0">
        <Image
          src={product.imageUrl}
          alt={getProductTitle(product)}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-full">{product.category}</span>
          <span className="flex items-center gap-1.5 text-xs font-medium text-text-tertiary">
            <Calendar className="w-3.5 h-3.5" />
            {formatPostedAt(product.createdAt)}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-text-primary mt-2 line-clamp-2 leading-snug group-hover:text-[#2563EB] transition-colors">
          {getProductTitle(product)}
        </h3>

        <ProductSpecs product={product} />

        {product.notes && (
          <p className="text-xs text-text-tertiary mt-2.5 line-clamp-2 leading-relaxed">{product.notes}</p>
        )}

        <div className="mt-auto pt-5 flex flex-col sm:flex-row gap-4 sm:items-end justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-text-tertiary mb-1">Valor à vista</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-500 tracking-tight leading-none">
              {product.price !== null ? formatCurrency(product.price) : "Sob consulta"}
            </span>
          </div>
          <div className="flex sm:w-56 shrink-0">
            <ContactButton whatsappUrl={product.whatsappUrl} />
          </div>
        </div>
      </div>
    </article>
  );
}
