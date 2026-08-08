export function capitalizarPrimeiraLetra(texto?: string | null): string {
  if (!texto) return "";
  const limpo = texto.trim();
  if (limpo.length === 0) return "";
  return limpo.charAt(0).toUpperCase() + limpo.slice(1);
}
