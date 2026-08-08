import type { Anuncio } from "../types";

interface AnuncioCardProps {
  anuncio: Anuncio;
  onDelete?: (id: number) => void;
  onClick?: (anuncio: Anuncio) => void;
}

export default function AnuncioCard({ anuncio, onDelete, onClick }: AnuncioCardProps) {
  return (
    <div
      className="card"
      onClick={() => onClick?.(anuncio)}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <img src={anuncio.imagemUrl} alt={anuncio.titulo} className="card__img" />
      <div className="card__body">
        <span className="card__categoria">{anuncio.categoria}</span>
        <h3>{anuncio.titulo}</h3>
        <p className="card__descricao">{anuncio.descricao}</p>
        <div className="card__footer">
          <span className="card__preco">
            {anuncio.tipo === "doacao" ? "Doação" : `R$ ${anuncio.preco?.toFixed(2)}`}
          </span>
          {onDelete && (
            <button
              className="card__delete"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(anuncio.id);
              }}
            >
              Remover
            </button>
          )}
        </div>
      </div>
    </div>
  );
}