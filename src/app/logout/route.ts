import { NextResponse } from "next/server";
import { clearSession, getSessionToken } from "@/lib/session";
import { api } from "@/services/api";

export async function GET(request: Request) {
  const token = await getSessionToken();
  if (token) {
    try {
      await api.post("/auth/logout", undefined, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error("[Logout] Failed to notify backend:", error);
    }
  }

  await clearSession();
  
  return new Response(null, {
    status: 302,
    headers: { Location: "/login" },
  });
}
