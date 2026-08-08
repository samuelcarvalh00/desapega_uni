import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { criarAnuncio } from "../api";
import { getVisitorId } from "../visitor";
import type { TipoAnuncio } from "../types";

const USUARIO_ATUAL = getVisitorId();

const CATEGORIAS = ["Livros", "Engenharia", "Computação", "Jalecos", "Eletrônicos", "Móveis"];

interface FormState {
  titulo: string;
  descricao: string;
  categoria: string;
  tipo: TipoAnuncio;
  preco: string;
  imagemUrl: string;
  contato: string;
}

export default function NovoAnuncio() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({
    titulo: "",
    descricao: "",
    categoria: CATEGORIAS[0],
    tipo: "venda",
    preco: "",
    imagemUrl: "",
    contato: ""
  });
  const [enviando, setEnviando] = useState<boolean>(false);
  const [erro, setErro] = useState<string | null>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro(null);

    if (!form.titulo || !form.descricao || !form.categoria || !form.contato) {
      setErro("Preencha título, descrição, categoria e uma forma de contato.");
      return;
    }

    setEnviando(true);
    try {
      await criarAnuncio({ ...form, autor: USUARIO_ATUAL });
      navigate("/anuncios");
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao publicar anúncio.");
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

        <label>
          Contato (e-mail ou WhatsApp)
          <input
            name="contato"
            placeholder="seuemail@exemplo.com ou (85) 90000-0000"
            value={form.contato}
            onChange={handleChange}
            required
          />
        </label>
        <p className="form__ajuda">
          Esse contato vai aparecer para quem clicar no seu anúncio, pra combinar a doação/venda.
        </p>

        {erro && <p className="erro">{erro}</p>}

        <button type="submit" className="btn btn--primary" disabled={enviando}>
          {enviando ? "Publicando..." : "Publicar anúncio"}
        </button>
      </form>
    </div>
  );
}
