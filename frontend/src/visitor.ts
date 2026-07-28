// visitor.ts
// Gera e guarda um identificador simples por navegador, simulando um
// "usuario atual" sem precisar de login/autenticacao completa (bonus
// nao implementado pelo prazo do desafio).

const CHAVE = "desapega-uni:visitor-id";

export function getVisitorId(): string {
  let id = localStorage.getItem(CHAVE);
  if (!id) {
    id = "visitante-" + Math.random().toString(36).slice(2, 8);
    localStorage.setItem(CHAVE, id);
  }
  return id;
}
