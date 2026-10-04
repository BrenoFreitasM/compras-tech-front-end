import type { Product, ProductDto } from "./types";

const WHATSAPP_USER_SUFFIX = "@s.whatsapp.net";

/** "R$ 1.090,50" -> 1090.5 | invalid/empty -> null */
export function parseBrlPrice(value: string | null): number | null {
  if (!value) return null;

  const normalized = value
    .replace(/[^\d,.]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  const price = Number.parseFloat(normalized);
  return Number.isFinite(price) ? price : null;
}

/** "87%" -> 87 | invalid/empty -> null */
export function parsePercentage(value: string | null): number | null {
  if (!value) return null;

  const percentage = Number.parseInt(value.replace(/\D/g, ""), 10);
  return Number.isFinite(percentage) ? percentage : null;
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
    batteryHealth: parsePercentage(dto.saude_bateria),
    price: parseBrlPrice(dto.preco),
    notes: dto.observacoes,
    whatsappUrl: toWhatsAppUrl(dto.remoteJid),
    createdAt: dto.timestamp,
    isActive: dto.active,
  };
}

export function getProductTitle(product: Product): string {
  return [product.model, product.version, product.storage].filter(Boolean).join(" ");
}
