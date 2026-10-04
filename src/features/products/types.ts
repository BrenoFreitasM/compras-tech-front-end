/** Raw product as returned by `GET /products` on the back-end. */
export interface ProductDto {
  _id: string;
  categoria?: string;
  categoryId?: {
    _id: string;
    name: string;
  };
  modelo: string;
  versao: string | null;
  armazenamento: string | null;
  cor: string | null;
  saude_bateria: string | null;
  preco: string | null;
  observacoes: string | null;
  remoteJid: string;
  messageId: string;
  timestamp: string;
  active: boolean;
}

export interface CategoryDto {
  _id: string;
  name: string;
}

export interface ListCategoriesResponse {
  categories: CategoryDto[];
}

export interface ListProductsResponse {
  success: boolean;
  count: number;
  data: ProductDto[];
}

/** Product as used by the UI, with parsed/normalized values. */
export interface Product {
  id: string;
  category: string;
  model: string;
  version: string | null;
  storage: string | null;
  color: string | null;
  batteryHealth: number | null;
  price: number | null;
  notes: string | null;
  whatsappUrl: string | null;
  createdAt: string;
  isActive: boolean;
}

export type ProductSort = "recent" | "price-asc" | "price-desc" | "battery-desc";

export interface ProductFilters {
  search: string;
  category: string;
  storage: string;
  color: string;
  minPrice?: number;
  maxPrice?: number;
  minBattery?: number;
  includeInactive: boolean;
  sort: ProductSort;
}

export type SearchParams = Record<string, string | string[] | undefined>;
