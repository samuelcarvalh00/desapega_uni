import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ContactModalProps {
  aberto: boolean;
  aoFechar: () => void;
}

export default function ContactModal({ aberto, aoFechar }: ContactModalProps) {
  useEffect(() => {
    if (aberto) {
      document.documentElement.classList.add("modal-open");
    } else {
      document.documentElement.classList.remove("modal-open");
    }
    return () => {
      document.documentElement.classList.remove("modal-open");
    };
  }, [aberto]);

  if (!aberto) return null;

  const modalContent = (
    <div className="modal-overlay" onClick={aoFechar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <img src="/mascote-unifor.png" alt="Mascote UNIFOR" className="modal__mascote" />
          <div>
            <h2>Fale com a gente</h2>
            <p className="modal__subtitulo">Dúvidas, sugestões ou problemas com um anúncio?</p>
          </div>
          <button className="modal__fechar" onClick={aoFechar} aria-label="Fechar">✕</button>
        </div>

        <div className="modal__body">
          <a className="modal__contato" href="mailto:contato@desapegauni.com.br">
            <span className="modal__icone">✉️</span>
            <div><strong>E-mail</strong><span>contato@desapegauni.com.br</span></div>
          </a>

          <a className="modal__contato" href="https://wa.me/5585999999999" target="_blank" rel="noopener noreferrer">
            <span className="modal__icone">💬</span>
            <div><strong>WhatsApp</strong><span>(85) 99999-9999</span></div>
          </a>

          <div className="modal__contato modal__contato--estatico">
            <span className="modal__icone">📍</span>
            <div><strong>Campus</strong><span>UNIFOR — Av. Washington Soares, 1321, Fortaleza/CE</span></div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}