const DEFAULT_API_URL = "http://localhost:3002";

function readApiUrl(): string {
  const url = process.env.API_URL ?? DEFAULT_API_URL;
  return url.replace(/\/+$/, "");
}

export const env = {
  apiUrl: readApiUrl(),
  defaultProductImage:
    process.env.DEFAULT_PRODUCT_IMAGE ??
    "https://pub-fb292f9d89654c618a6670a6e0f12faf.r2.dev/Apple-Iphone-16-256gb-Preto_1782766723.webp",
} as const;
