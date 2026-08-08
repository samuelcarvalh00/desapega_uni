import { useEffect } from "react";

export function useLockBodyScroll(ativo: boolean) {
  useEffect(() => {
    if (!ativo) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ativo]);
}