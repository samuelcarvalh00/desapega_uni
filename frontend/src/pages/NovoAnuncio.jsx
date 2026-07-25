import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarAnuncio } from "../api";

const USUARIO_ATUAL = "voce";

const CATEGORIAS = ["Livros", "Engenharia", "Computação", "Jalecos", "Eletrônicos", "Móveis"];

export default function NovoAnuncio() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    categoria: CATEGORIAS[0],
    tipo: "venda",
    preco: "",
    imagemUrl: ""
  });
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro(null);

    if (!form.titulo || !form.descricao || !form.categoria) {
      setErro("Preencha título, descrição e categoria.");
      return;
    }

    setEnviando(true);
    try {
      await criarAnuncio({ ...form, autor: USUARIO_ATUAL });
      navigate("/anuncios");
    } catch (err) {
      setErro(err.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="form-page">
      <h1>Anunciar um item</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Título
          <input name="titulo" value={form.titulo} onChange={handleChange} required />
        </label>

        <label>
          Descrição
          <textarea name="descricao" value={form.descricao} onChange={handleChange} required />
        </label>

        <label>
          Categoria
          <select name="categoria" value={form.categoria} onChange={handleChange}>
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>

        <label>
          Tipo
          <select name="tipo" value={form.tipo} onChange={handleChange}>
            <option value="venda">Venda</option>
            <option value="doacao">Doação</option>
          </select>
        </label>

        {form.tipo === "venda" && (
          <label>
            Preço (R$)
            <input
              name="preco"
              type="number"
              min="0"
              step="0.01"
              value={form.preco}
              onChange={handleChange}
            />
          </label>
        )}

        <label>
          URL da imagem (opcional)
          <input
            name="imagemUrl"
            placeholder="https://..."
            value={form.imagemUrl}
            onChange={handleChange}
          />
        </label>

        {erro && <p className="erro">{erro}</p>}

        <button type="submit" className="btn btn--primary" disabled={enviando}>
          {enviando ? "Publicando..." : "Publicar anúncio"}
        </button>
      </form>
    </div>
  );
}
