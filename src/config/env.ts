const DEFAULT_API_URL = "http://localhost:3002";

function readApiUrl(): string {
  const url = process.env.API_URL ?? DEFAULT_API_URL;
  return url.replace(/\/+$/, "");
}

export const env = {
  apiUrl: readApiUrl(),
} as const;
