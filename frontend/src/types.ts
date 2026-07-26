// types.ts
export type TipoAnuncio = "venda" | "doacao";

export interface Anuncio {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  tipo: TipoAnuncio;
  preco: number | null;
  imagemUrl: string;
  autor: string;
  criadoEm: string;
}

// Dados enviados ao criar um anúncio (sem os campos gerados pelo backend)
export interface NovoAnuncioInput {
  titulo: string;
  descricao: string;
  categoria: string;
  tipo: TipoAnuncio;
  preco?: number | string;
  imagemUrl?: string;
  autor: string;
}

export interface FiltrosAnuncio {
  categoria?: string;
  tipo?: TipoAnuncio;
  autor?: string;
}
