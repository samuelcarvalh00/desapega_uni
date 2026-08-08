import type { Anuncio } from "../types";

interface AnuncioDetalheModalProps {
  anuncio: Anuncio | null;
  aoFechar: () => void;
}

function ehEmail(contato: string) {
  return contato.includes("@");
}

function montarMensagemWhatsApp(anuncio: Anuncio) {
  const acao = anuncio.tipo === "doacao" ? "saber mais sobre a doacao" : "comprar";
  const texto = `Oi! Vi seu anuncio "${anuncio.titulo}" no Desapega UNI e queria ${acao}.`;
  return encodeURIComponent(texto);
}

export default function AnuncioDetalheModal({ anuncio, aoFechar }: AnuncioDetalheModalProps) {
  if (!anuncio) return null;

  const contatoEhEmail = ehEmail(anuncio.contato);
  const numeroLimpo = anuncio.contato.replace(/\D/g, "");
  const mensagem = montarMensagemWhatsApp(anuncio);

  return (
    <div className="modal-overlay" onClick={aoFechar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__fechar" onClick={aoFechar} aria-label="Fechar">X</button>
        <img src={anuncio.imagemUrl} alt={anuncio.titulo} className="modal__imagem" />
        <div className="modal__conteudo-anuncio">
          <span className="card__categoria">{anuncio.categoria}</span>
          <h2>{anuncio.titulo}</h2>
          <p className="modal__descricao">{anuncio.descricao}</p>
          <p className="modal__preco">{anuncio.tipo === "doacao" ? "Doacao" : `R$ ${anuncio.preco?.toFixed(2)}`}</p>
          <div className="modal__contato-anunciante">
            <img src="/mascote-unifor.png" alt="" className="modal__mascote-pequeno" />
            <div>
              <strong>Contato de quem anunciou</strong>
              <span>Combine a {anuncio.tipo === "doacao" ? "retirada" : "negociacao"} diretamente.</span>
            </div>
          </div>
          {contatoEhEmail ? (
            <a className="modal__contato" href={`mailto:${anuncio.contato}?subject=${encodeURIComponent(`Sobre o anuncio: ${anuncio.titulo}`)}&body=${mensagem}`}>
              <span className="modal__icone">Email</span>
              <div><strong>E-mail</strong><span>{anuncio.contato}</span></div>
            </a>
          ) : (
            <a className="modal__contato" href={`https://api.whatsapp.com/send?phone=55${numeroLimpo}&text=${mensagem}`} target="_blank" rel="noopener noreferrer">
              <span className="modal__icone">WhatsApp</span>
              <div><strong>WhatsApp</strong><span>{anuncio.contato}</span></div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}