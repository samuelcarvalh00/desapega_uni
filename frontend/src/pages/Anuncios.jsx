import { useEffect, useState } from "react";
import { listarAnuncios, deletarAnuncio } from "../api";
import AnuncioCard from "../components/AnuncioCard.jsx";

// Simulação simples de "usuário logado" via localStorage,
// já que autenticação completa é diferencial bônus.
const USUARIO_ATUAL = "voce";

export default function Anuncios() {
  const [anuncios, setAnuncios] = useState([]);
  const [apenasMeus, setApenasMeus] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  function carregar() {
    setCarregando(true);
    listarAnuncios(apenasMeus ? { autor: USUARIO_ATUAL } : {})
      .then(setAnuncios)
      .catch(() => setErro("Não foi possível carregar os anúncios."))
      .finally(() => setCarregando(false));
  }

  useEffect(() => {
    carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apenasMeus]);

  async function handleDelete(id) {
    if (!confirm("Remover este anúncio?")) return;
    try {
      await deletarAnuncio(id);
      setAnuncios((prev) => prev.filter((a) => a.id !== id));
    } catch {
      alert("Erro ao remover o anúncio.");
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
              onDelete={a.autor === USUARIO_ATUAL ? handleDelete : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
