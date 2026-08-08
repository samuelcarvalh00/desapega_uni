// visitor.ts
// Gerencia a identidade do visitante local e o modo Administrador (Criador do site)

const CHAVE_VISITOR = "desapega-uni:visitor-id";
const CHAVE_ADMIN = "desapega-uni:is-admin";

export function getVisitorId(): string {
  let id = localStorage.getItem(CHAVE_VISITOR);
  if (!id) {
    id = "visitante-" + Math.random().toString(36).slice(2, 8);
    localStorage.setItem(CHAVE_VISITOR, id);
  }
  return id;
}

export function isAdmin(): boolean {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    if (params.get("admin") === "true" || params.get("admin") === "1") {
      localStorage.setItem(CHAVE_ADMIN, "true");
      return true;
    }
  }
  return localStorage.getItem(CHAVE_ADMIN) === "true";
}

export function setAdmin(status: boolean): void {
  if (status) {
    localStorage.setItem(CHAVE_ADMIN, "true");
  } else {
    localStorage.removeItem(CHAVE_ADMIN);
  }
}

export function toggleAdmin(): boolean {
  const novoEstado = !isAdmin();
  setAdmin(novoEstado);
  return novoEstado;
}
