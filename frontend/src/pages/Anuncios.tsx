import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { listarAnuncios, deletarAnuncio } from "../api";
import AnuncioCard from "../components/AnuncioCard";
import AnuncioDetalheModal from "../components/AnuncioDetalheModal";
import { getVisitorId, isAdmin } from "../visitor";
import type { Anuncio } from "../types";

const USUARIO_ATUAL = getVisitorId();

export default function Anuncios() {
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
  const [apenasMeus, setApenasMeus] = useState<boolean>(false);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);
  const [selecionado, setSelecionado] = useState<Anuncio | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  function carregar() {
    setCarregando(true);
    listarAnuncios(apenasMeus ? { autor: USUARIO_ATUAL } : {})
      .then((lista) => {
        setAnuncios(lista);
        const idNaUrl = searchParams.get("item");
        if (idNaUrl) {
          const encontrado = lista.find((a) => a.id === Number(idNaUrl));
          if (encontrado) setSelecionado(encontrado);
        }
      })
      .catch(() => setErro("Não foi possível carregar os anúncios."))
      .finally(() => setCarregando(false));
  }

  useEffect(() => {
    carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apenasMeus]);

  async function handleDelete(id: number) {
    if (!confirm("Remover este anúncio?")) return;
    try {
      await deletarAnuncio(id);
      setAnuncios((prev) => prev.filter((a) => a.id !== id));
    } catch {
      alert("Erro ao remover o anúncio.");
    }
  }

  function fecharModal() {
    setSelecionado(null);
    if (searchParams.get("item")) {
      searchParams.delete("item");
      setSearchParams(searchParams, { replace: true });
    }
  }

  return (
    <div className="anuncios">
      <div className="anuncios__header">
        <h1>Anúncios</h1>
        <label className="toggle">
          <input
            type="checkbox"
            checked={apenasMeus}
            onChange={(e) => setApenasMeus(e.target.checked)}
          />
          Ver só meus anúncios
        </label>
      </div>

      {erro && <p className="erro">{erro}</p>}
      {carregando ? (
        <p>Carregando...</p>
      ) : anuncios.length === 0 ? (
        <p>Nenhum anúncio por aqui ainda.</p>
      ) : (
        <div className="grid">
          {anuncios.map((a) => (
            <AnuncioCard
              key={a.id}
              anuncio={a}
              onClick={setSelecionado}
              onDelete={isAdmin() || a.autor === USUARIO_ATUAL ? handleDelete : undefined}
            />
          ))}
        </div>
      )}

      <AnuncioDetalheModal anuncio={selecionado} aoFechar={fecharModal} />
    </div>
  );
}