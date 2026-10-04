import { env } from "@/config/env";
import type { Product, ProductDto } from "./types";

const WHATSAPP_USER_SUFFIX = "@s.whatsapp.net";

/** "R$ 1.090,50" -> 1090.5 | "2.700" -> 2700 | invalid/empty -> null */
export function parseBrlPrice(value: string | null): number | null {
  if (!value) return null;

  const cleaned = value.replace(/[^\d,.]/g, "");
  if (!cleaned) return null;

  const lastCommaIndex = cleaned.lastIndexOf(",");
  const lastDotIndex = cleaned.lastIndexOf(".");

  let decimalSeparator = "";
  if (lastCommaIndex > -1 && lastDotIndex > -1) {
    decimalSeparator = lastCommaIndex > lastDotIndex ? "," : ".";
  } else if (lastCommaIndex > -1) {
    decimalSeparator = ",";
  } else if (lastDotIndex > -1) {
    // If only dot exists, guess if it's decimal (2 digits) or thousand separator (3 digits)
    const parts = cleaned.split(".");
    const lastPart = parts[parts.length - 1];
    decimalSeparator = lastPart.length === 2 ? "." : "";
  }

  let normalized = "";
  const actualDecimalIndex = Math.max(lastCommaIndex, lastDotIndex);
  for (let i = 0; i < cleaned.length; i++) {
    const char = cleaned[i];
    if (char === decimalSeparator && i === actualDecimalIndex) {
      normalized += ".";
    } else if (char !== "." && char !== ",") {
      normalized += char;
    }
  }

  const price = Number.parseFloat(normalized);
  return Number.isFinite(price) ? price : null;
}

/** Only direct chats have a phone number; group JIDs (@g.us) return null. */
export function toWhatsAppUrl(remoteJid: string): string | null {
  if (!remoteJid.endsWith(WHATSAPP_USER_SUFFIX)) return null;

  const phone = remoteJid.replace(WHATSAPP_USER_SUFFIX, "").replace(/\D/g, "");
  return phone ? `https://wa.me/${phone}` : null;
}

export function toProduct(dto: ProductDto): Product {
  return {
    id: dto._id,
    category: dto.categoryId?.name ?? dto.categoria ?? "Sem Categoria",
    model: dto.modelo,
    version: dto.versao,
    storage: dto.armazenamento,
    color: dto.cor,
    price: parseBrlPrice(dto.preco),
    notes: dto.observacoes,
    imageUrl: dto.imageUrl || env.defaultProductImage,
    whatsappUrl: toWhatsAppUrl(dto.remoteJid),
    createdAt: dto.timestamp,
    isActive: dto.active,
  };
}

export function getProductTitle(product: Product): string {
  return [product.model, product.version, product.storage].filter(Boolean).join(" ");
}
