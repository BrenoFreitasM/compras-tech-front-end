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
  preco: string | null;
  observacoes: string | null;
  imageUrl?: string | null;
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
  price: number | null;
  notes: string | null;
  imageUrl: string;
  whatsappUrl: string | null;
  createdAt: string;
  isActive: boolean;
}

export type ProductSort = "recent" | "price-asc" | "price-desc";

export interface ProductFilters {
  search: string;
  category: string;
  storage: string;
  color: string;
  minPrice?: number;
  maxPrice?: number;
  includeInactive: boolean;
  sort: ProductSort;
}

export type SearchParams = Record<string, string | string[] | undefined>;
