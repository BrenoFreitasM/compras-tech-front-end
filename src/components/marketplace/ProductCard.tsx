"use client";

import Image from "next/image";
import { ShoppingCart, Star, MapPin, BadgeCheck } from "lucide-react";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.priceOld
    ? Math.round(((product.priceOld - product.price) / product.priceOld) * 100)
    : null;

  function handleBuy() {
    toast.success("Produto adicionado!", {
      description: `${product.name} foi adicionado ao carrinho.`,
    });
  }

  function handleContact() {
    toast.info("Contato com fornecedor", {
      description: `Entrando em contato com ${product.supplier.name}...`,
    });
  }

  return (
    <div className="group bg-white dark:bg-brand-card rounded-2xl border border-brand-border dark:border-brand-border-strong overflow-hidden hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/30 hover:-translate-y-0.5 transition-all duration-200">
      {/* Imagem */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {discount && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
              -{discount}%
            </span>
          )}
          <span
            className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${
              product.condition === "Novo"
                ? "bg-emerald-500 text-white"
                : "bg-amber-500 text-white"
            }`}
          >
            {product.condition}
          </span>
        </div>

        {product.stock <= 3 && (
          <div className="absolute bottom-2 left-2">
            <span className="bg-orange-500/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
              Últimas {product.stock} unidades
            </span>
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-3">
        {/* Categoria */}
        <span className="text-[10px] font-semibold text-orange-500 uppercase tracking-wider">
          {product.category}
        </span>

        {/* Nome */}
        <h3 className="text-sm font-semibold text-text-primary dark:text-white mt-0.5 line-clamp-2 leading-snug">
          {product.name}
        </h3>

        {/* Descrição */}
        <p className="text-[11px] text-text-tertiary dark:text-gray-400 mt-1 line-clamp-2">
          {product.description}
        </p>

        {/* Preço */}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-base font-extrabold text-text-primary dark:text-white">
            {formatCurrency(product.price)}
          </span>
          {product.priceOld && (
            <span className="text-xs text-text-tertiary line-through">
              {formatCurrency(product.priceOld)}
            </span>
          )}
        </div>

        {/* Fornecedor */}
        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex items-center gap-1 text-[11px] text-text-secondary dark:text-gray-400 min-w-0">
            {product.supplier.verified && (
              <BadgeCheck className="w-3 h-3 text-blue-500 flex-shrink-0" />
            )}
            <span className="truncate font-medium">{product.supplier.name}</span>
          </div>
          <span className="text-text-muted">·</span>
          <div className="flex items-center gap-0.5 text-[11px] text-text-secondary dark:text-gray-400">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span>{product.supplier.state}</span>
          </div>
          <span className="text-text-muted">·</span>
          <div className="flex items-center gap-0.5 text-[11px] text-amber-500">
            <Star className="w-3 h-3 fill-amber-500" />
            <span>{product.supplier.rating}</span>
          </div>
        </div>

        {/* Botões */}
        <div className="mt-3 flex gap-2">
          <button
            onClick={handleContact}
            className="flex-1 h-8 text-xs font-semibold border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
          >
            Contato
          </button>
          <button
            onClick={handleBuy}
            className="flex-1 h-8 text-xs font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white rounded-lg flex items-center justify-center gap-1 transition-all"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}
