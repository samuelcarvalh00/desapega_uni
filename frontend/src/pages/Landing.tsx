import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarAnuncios } from "../api";
import AnuncioCard from "../components/AnuncioCard";
import AnuncioDetalheModal from "../components/AnuncioDetalheModal";
import type { Anuncio } from "../types";

const CATEGORIAS = ["Todos", "Livros", "Objetos", "Informática", "Roupas"];

export default function Landing() {
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
  const [categoria, setCategoria] = useState<string>("Todos");
  const [carregando, setCarregando] = useState<boolean>(true);
  const [selecionado, setSelecionado] = useState<Anuncio | null>(null);

  useEffect(() => {
    setCarregando(true);
    listarAnuncios(categoria !== "Todos" ? { categoria } : {})
      .then(setAnuncios)
      .catch(() => setAnuncios([]))
      .finally(() => setCarregando(false));
  }, [categoria]);

  return (
    <div className="landing">
      <section className="hero">
        <img src="/mascote-unifor.png" alt="Mascote UNIFOR" className="hero__mascote" />
        <h1>Economia circular dentro do seu campus</h1>
        <p>
          Doe, venda e encontre livros, calculadoras, jalecos e materiais que
          outros estudantes não usam mais — e ajude quem está começando agora.
        </p>
        <div className="hero__cta">
          <Link to="/anuncios/novo" className="btn btn--primary">
            Anunciar um item
          </Link>
          <Link to="/anuncios" className="btn btn--secondary">
            Ver anúncios
          </Link>
        </div>
      </section>

      <section className="stats">
        <div className="stat">
          <strong>{anuncios.length}+</strong>
          <span>itens ativos</span>
        </div>
        <div className="stat">
          <strong>350kg</strong>
          <span>de material reaproveitado (simulado)</span>
        </div>
      </section>

      <section className="vitrine">
        <h2>Últimos itens anunciados</h2>
        <div className="filtros">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              className={`filtro ${categoria === cat ? "filtro--ativo" : ""}`}
              onClick={() => setCategoria(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {carregando ? (
          <p>Carregando itens...</p>
        ) : anuncios.length === 0 ? (
          <p>Nenhum item nessa categoria ainda.</p>
        ) : (
          <div className="grid">
            {anuncios.slice(0, 6).map((a) => (
              <AnuncioCard key={a.id} anuncio={a} onClick={setSelecionado} />
            ))}
          </div>
        )}
      </section>

      <AnuncioDetalheModal anuncio={selecionado} aoFechar={() => setSelecionado(null)} />
    </div>
  );
}