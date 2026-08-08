import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buscarAnuncio } from "../api";
import type { Anuncio } from "../types";
import { capitalizarPrimeiraLetra } from "../utils";

function ehEmail(contato: string) {
  return contato.includes("@");
}

export default function AnuncioDetalhe() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [anuncio, setAnuncio] = useState<Anuncio | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    buscarAnuncio(Number(id))
      .then((a) => setAnuncio(a))
      .catch(() => setErro("Não foi possível carregar este anúncio."))
      .finally(() => setCarregando(false));
  }, [id]);

  if (carregando) return <p className="anuncios">Carregando...</p>;
  if (erro) return <p className="anuncios erro">{erro}</p>;
  if (!anuncio) return <p className="anuncios">Anúncio não encontrado.</p>;

  const contatoEhEmail = ehEmail(anuncio.contato);
  const numeroLimpo = anuncio.contato.replace(/\D/g, "");
  const acao = anuncio.tipo === "doacao" ? "saber mais sobre a doação" : "comprar";
  const tituloFormatado = capitalizarPrimeiraLetra(anuncio.titulo);
  const mensagem = encodeURIComponent(
    `Oi! Vi seu anúncio "${tituloFormatado}" no Desapega UNI e queria ${acao}.`
  );

  return (
    <div className="anuncios" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "75vh" }}>
      <div className="modal modal--anuncio" style={{ position: "relative", transform: "none", margin: "0 auto", width: "100%" }}>
        <button className="modal__fechar" onClick={() => navigate("/anuncios")} aria-label="Voltar">
          ←
        </button>
        <img src={anuncio.imagemUrl} alt={tituloFormatado} className="modal__imagem" />
        <div className="modal__conteudo-anuncio">
          <span className="card__categoria">{capitalizarPrimeiraLetra(anuncio.categoria)}</span>
          <h2>{tituloFormatado}</h2>
          <p className="modal__descricao">{capitalizarPrimeiraLetra(anuncio.descricao)}</p>
          <p className="modal__preco">
            {anuncio.tipo === "doacao" ? "Doação" : `R$ ${anuncio.preco?.toFixed(2)}`}
          </p>

          <div className="modal__contato-anunciante">
            <img src="/mascote-unifor.png" alt="" className="modal__mascote-pequeno" />
            <div>
              <strong>Contato de quem anunciou</strong>
              <span>Combine a {anuncio.tipo === "doacao" ? "retirada" : "negociação"} diretamente.</span>
            </div>
          </div>

          {contatoEhEmail ? (
            <a
              className="modal__contato"
              href={`mailto:${anuncio.contato}?subject=${encodeURIComponent(`Sobre o anúncio: ${tituloFormatado}`)}&body=${mensagem}`}
            >
              <span className="modal__icone">✉️</span>
              <div>
                <strong>E-mail</strong>
                <span>{anuncio.contato}</span>
              </div>
            </a>
          ) : (
            <a
              className="modal__contato"
              href={`https://api.whatsapp.com/send?phone=55${numeroLimpo}&text=${mensagem}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="modal__icone">💬</span>
              <div>
                <strong>WhatsApp</strong>
                <span>{anuncio.contato}</span>
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}