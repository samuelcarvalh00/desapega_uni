import { useEffect, useRef } from "react";
import type { Anuncio } from "../types";
import { capitalizarPrimeiraLetra } from "../utils";

interface AnuncioDetalheModalProps {
  anuncio: Anuncio | null;
  aoFechar: () => void;
}

function ehEmail(contato: string) {
  return contato.includes("@");
}

function montarLinkDoAnuncio(anuncio: Anuncio) {
  return `${window.location.origin}/anuncios/${anuncio.id}`;
}

function montarMensagemWhatsApp(anuncio: Anuncio) {
  const acao = anuncio.tipo === "doacao" ? "saber mais sobre a doação" : "comprar";
  const link = montarLinkDoAnuncio(anuncio);
  const tituloFormatado = capitalizarPrimeiraLetra(anuncio.titulo);
  const texto = `Oi! Vi seu anúncio "${tituloFormatado}" no Desapega UNI e queria ${acao}.\n\nVeja o anúncio: ${link}`;
  return encodeURIComponent(texto);
}

export default function AnuncioDetalheModal({ anuncio, aoFechar }: AnuncioDetalheModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (anuncio) {
      document.body.style.overflow = "hidden";
      if (modalRef.current) {
        modalRef.current.scrollTop = 0;
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [anuncio]);

  if (!anuncio) return null;

  const contatoEhEmail = ehEmail(anuncio.contato);
  const numeroLimpo = anuncio.contato.replace(/\D/g, "");
  const mensagem = montarMensagemWhatsApp(anuncio);

  return (
    <div className="modal-overlay" onClick={aoFechar}>
      <div className="modal modal--anuncio" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <button className="modal__fechar" onClick={aoFechar} aria-label="Fechar">×</button>
        <img src={anuncio.imagemUrl} alt={capitalizarPrimeiraLetra(anuncio.titulo)} className="modal__imagem" />
        <div className="modal__conteudo-anuncio">
          <span className="card__categoria">{capitalizarPrimeiraLetra(anuncio.categoria)}</span>
          <h2>{capitalizarPrimeiraLetra(anuncio.titulo)}</h2>
          <p className="modal__descricao">{capitalizarPrimeiraLetra(anuncio.descricao)}</p>
          <p className="modal__preco">{anuncio.tipo === "doacao" ? "Doação" : `R$ ${anuncio.preco?.toFixed(2)}`}</p>
          <div className="modal__contato-anunciante">
            <img src="/mascote-unifor.png" alt="" className="modal__mascote-pequeno" />
            <div>
              <strong>Contato de quem anunciou</strong>
              <span>Combine a {anuncio.tipo === "doacao" ? "retirada" : "negociação"} diretamente.</span>
            </div>
          </div>
          {contatoEhEmail ? (
            <a className="modal__contato" href={`mailto:${anuncio.contato}?subject=${encodeURIComponent(`Sobre o anúncio: ${capitalizarPrimeiraLetra(anuncio.titulo)}`)}&body=${mensagem}`}>
              <span className="modal__icone">✉️</span>
              <div><strong>E-mail</strong><span>{anuncio.contato}</span></div>
            </a>
          ) : (
            <a className="modal__contato" href={`https://api.whatsapp.com/send?phone=55${numeroLimpo}&text=${mensagem}`} target="_blank" rel="noopener noreferrer">
              <span className="modal__icone">💬</span>
              <div><strong>WhatsApp</strong><span>{anuncio.contato}</span></div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}