"use server";

import { redirect } from "next/navigation";
import { api } from "@/services/api";
import { setSessionToken } from "@/lib/session";
import { ApiError } from "@/services/errors";

export async function loginAction(prevState: any, formData: FormData) {
  const rawEmail = formData.get("email")?.toString();
  const password = formData.get("password")?.toString().trim();

  const email = rawEmail?.trim().toLowerCase();

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
    if (error instanceof ApiError) {
      if (error.status === 401) {
        console.warn(`[LoginAction] Falha de autenticação para ${email}: credenciais inválidas.`);
      } else {
        console.error("[LoginAction] Erro na API durante o login:", error.message);
      }
      return { error: error.message };
    }

    console.error("[LoginAction] Erro inesperado:", error);
    return { error: "Erro interno. Tente novamente mais tarde." };
  }

  redirect("/");
}
