"use server";

import { redirect } from "next/navigation";
import { api } from "@/services/api";
import { setSessionToken } from "@/lib/session";
import { ApiError } from "@/services/errors";

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { error: "E-mail e senha são obrigatórios." };
  }

  try {
    const response = await api.post<{ success: boolean; token: string }>("/auth/login", {
      email,
      password,
    });

    if (response.success && response.token) {
      await setSessionToken(response.token);
    } else {
      return { error: "Credenciais inválidas." };
    }
  } catch (error) {
    console.error("[LoginAction] Login failed:", error);
    if (error instanceof ApiError) {
      return { error: error.message };
    }
    return { error: "Erro interno. Tente novamente mais tarde." };
  }

  redirect("/");
}
