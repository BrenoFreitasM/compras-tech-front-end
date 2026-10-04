import Image from "next/image";
import { Calendar, MessageCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { getProductTitle } from "../mappers";
import type { Product } from "../types";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit" });

function formatPostedAt(isoDate: string): string {
  const date = new Date(isoDate);
  const isToday = date.toDateString() === new Date().toDateString();
  return isToday ? "Hoje" : dateFormatter.format(date);
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
      <span className="flex-1 h-8 flex items-center justify-center text-xs text-text-tertiary border border-dashed border-brand-border  rounded-lg">
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

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group bg-brand-surface rounded-2xl border border-brand-border hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/30 transition-all duration-200 flex flex-col sm:flex-row gap-4 p-4">
      <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-900 w-full h-24 sm:w-28 sm:h-28 rounded-xl flex-shrink-0">
        <Image
          src={product.imageUrl}
          alt={getProductTitle(product)}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-semibold text-[#2563EB] uppercase tracking-wider">{product.category}</span>
          <span className="flex items-center gap-1 text-[10px] text-text-tertiary">
            <Calendar className="w-3 h-3" />
            {formatPostedAt(product.createdAt)}
          </span>
        </div>

        <h3 className="text-sm font-semibold text-text-primary mt-0.5 line-clamp-2 leading-snug">
          {getProductTitle(product)}
        </h3>

        <ProductSpecs product={product} />

        {product.notes && (
          <p className="text-[11px] text-text-tertiary mt-2 line-clamp-2">{product.notes}</p>
        )}

        <div className="mt-auto pt-3 flex gap-3 sm:items-center">
          <span className="text-base font-extrabold text-text-primary">
            {product.price !== null ? formatCurrency(product.price) : "Preço sob consulta"}
          </span>
          <div className="flex sm:ml-auto sm:w-48">
            <ContactButton whatsappUrl={product.whatsappUrl} />
          </div>
        </div>
      </div>
    </article>
  );
}
