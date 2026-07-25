export default function AnuncioCard({ anuncio, onDelete }) {
  return (
    <div className="card">
      <img src={anuncio.imagemUrl} alt={anuncio.titulo} className="card__img" />
      <div className="card__body">
        <span className="card__categoria">{anuncio.categoria}</span>
        <h3>{anuncio.titulo}</h3>
        <p>{anuncio.descricao}</p>
        <div className="card__footer">
          <span className="card__preco">
            {anuncio.tipo === "doacao" ? "Doação" : `R$ ${anuncio.preco?.toFixed(2)}`}
          </span>
          {onDelete && (
            <button className="card__delete" onClick={() => onDelete(anuncio.id)}>
              Remover
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
