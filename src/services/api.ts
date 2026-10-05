// HTTP client for the back-end. Use only on the server (Server Components / Route Handlers):
// API_URL is a private env var and the back-end does not enable CORS.

import { env } from "@/config/env";
import { ApiError, NETWORK_ERROR_STATUS } from "./errors";

type QueryValue = string | number | boolean | null | undefined;
export type QueryParams = Record<string, QueryValue>;

type RequestOptions = Omit<RequestInit, "method" | "body"> & {
  params?: QueryParams;
};

const DEFAULT_HEADERS: HeadersInit = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

function buildUrl(endpoint: string, params?: QueryParams): string {
  const url = new URL(`${env.apiUrl}${endpoint}`);

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.append(key, String(value));
    }
  });

  return url.toString();
}

async function parseBody(response: Response): Promise<unknown> {
  if (response.status === 204) return null;
  return response.json().catch(() => null);
}

function extractErrorMessage(body: unknown, fallback: string): string {
  if (body && typeof body === "object") {
    const { message, error } = body as { message?: unknown; error?: unknown };
    if (typeof message === "string") return message;
    if (typeof error === "string") return error;
  }
  return fallback;
}

async function request<T>(method: string, endpoint: string, body?: unknown, options: RequestOptions = {}): Promise<T> {
  const { params, headers, ...init } = options;

  let response: Response;
  try {
    response = await fetch(buildUrl(endpoint, params), {
      ...init,
      method,
      headers: { ...DEFAULT_HEADERS, ...headers },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch (error) {
    let message = error instanceof Error ? error.message : "Falha de conexão com o servidor";
    if (message === "fetch failed") {
      message = "Falha de conexão com o servidor (back-end indisponível ou porta incorreta).";
    }
    throw new ApiError(NETWORK_ERROR_STATUS, message);
  }

  const data = await parseBody(response);

  if (!response.ok) {
    throw new ApiError(response.status, extractErrorMessage(data, response.statusText || "Erro na requisição"), data);
  }

  return data as T;
}

export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) => request<T>("GET", endpoint, undefined, options),
  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) => request<T>("POST", endpoint, body, options),
  put: <T>(endpoint: string, body?: unknown, options?: RequestOptions) => request<T>("PUT", endpoint, body, options),
  patch: <T>(endpoint: string, body?: unknown, options?: RequestOptions) => request<T>("PATCH", endpoint, body, options),
  delete: <T>(endpoint: string, options?: RequestOptions) => request<T>("DELETE", endpoint, undefined, options),
};
