import { ApiError } from './errors';

type FetchOptions = RequestInit & {
  params?: Record<string, string | number | boolean | undefined>;
};

// Pega a URL do back-end do .env (NEXT_PUBLIC_ para o lado do cliente também ter acesso)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

/**
 * Função utilitária para montar a query string
 */
function buildQueryString(params?: Record<string, string | number | boolean | undefined>): string {
  if (!params) return '';
  
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, String(value));
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * Wrapper de Fetch padronizado para chamadas à API
 */
async function fetchClient<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, headers, ...customOptions } = options;
  
  const url = `${API_BASE_URL}${endpoint}${buildQueryString(params)}`;
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  // Se houver lógica de token de autenticação, podemos adicionar aqui no futuro
  // const token = getAuthToken();
  // if (token) {
  //   defaultHeaders['Authorization'] = `Bearer ${token}`;
  // }

  const config: RequestInit = {
    ...customOptions,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    // Status 204 No Content não tem body para parsear
    if (response.status === 204) {
      return {} as T;
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new ApiError(
        response.status,
        data?.message || response.statusText || 'Erro na requisição',
        data
      );
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Tratamento de erro de rede genérico
    throw new ApiError(
      500,
      error instanceof Error ? error.message : 'Erro de conexão com o servidor'
    );
  }
}

// Objeto que contém os métodos HTTP mais comuns
export const api = {
  get: <T>(endpoint: string, options?: Omit<FetchOptions, 'method' | 'body'>) => 
    fetchClient<T>(endpoint, { ...options, method: 'GET' }),
    
  post: <T>(endpoint: string, data?: any, options?: Omit<FetchOptions, 'method' | 'body'>) => 
    fetchClient<T>(endpoint, { 
      ...options, 
      method: 'POST', 
      body: data ? JSON.stringify(data) : undefined 
    }),
    
  put: <T>(endpoint: string, data?: any, options?: Omit<FetchOptions, 'method' | 'body'>) => 
    fetchClient<T>(endpoint, { 
      ...options, 
      method: 'PUT', 
      body: data ? JSON.stringify(data) : undefined 
    }),
    
  patch: <T>(endpoint: string, data?: any, options?: Omit<FetchOptions, 'method' | 'body'>) => 
    fetchClient<T>(endpoint, { 
      ...options, 
      method: 'PATCH', 
      body: data ? JSON.stringify(data) : undefined 
    }),
    
  delete: <T>(endpoint: string, options?: Omit<FetchOptions, 'method' | 'body'>) => 
    fetchClient<T>(endpoint, { ...options, method: 'DELETE' }),
};
