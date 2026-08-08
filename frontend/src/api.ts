// api.ts
// Centraliza a URL da API. Em produção, troque pela URL do deploy do backend
// (ex: via variável de ambiente VITE_API_URL).
import type { Anuncio, NovoAnuncioInput, FiltrosAnuncio } from "./types";

export const API_URL: string = import.meta.env.VITE_API_URL || "http://localhost:3333";

export async function listarAnuncios(filtros: FiltrosAnuncio = {}): Promise<Anuncio[]> {
  const params = new URLSearchParams(filtros as Record<string, string>).toString();
  const res = await fetch(`${API_URL}/api/anuncios${params ? `?${params}` : ""}`);
  if (!res.ok) throw new Error("Erro ao buscar anúncios");
  return res.json();
}

export async function criarAnuncio(dados: NovoAnuncioInput): Promise<Anuncio> {
  const res = await fetch(`${API_URL}/api/anuncios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  });
  if (!res.ok) {
    const erro = await res.json().catch(() => ({}));
    throw new Error(erro.erro || "Erro ao criar anúncio");
  }
  return res.json();
}

export async function deletarAnuncio(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/api/anuncios/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao deletar anúncio");
}

export async function buscarAnuncio(id: number): Promise<Anuncio> {
  const res = await fetch(`${API_URL}/api/anuncios/${id}`);
  if (!res.ok) throw new Error("Erro ao buscar anúncio");
  return res.json();
}