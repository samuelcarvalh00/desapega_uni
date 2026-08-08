// db.js
// Camada de acesso ao banco de dados Postgres.
// Esta e a UNICA parte do sistema que conversa diretamente com o banco -
// as rotas nunca escrevem SQL, sempre chamam uma funcao daqui.

const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://vortex:vortex123@localhost:5432/vortex_marketplace"
});

// Garante que a tabela existe (e tem as colunas mais recentes) e, se
// estiver vazia, semeia alguns anúncios de exemplo.
async function init() {
  const schema = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf-8");
  await pool.query(schema);

  const { rows } = await pool.query("SELECT COUNT(*)::int AS total FROM anuncios");
  if (rows[0].total === 0) {
    await pool.query(
      `INSERT INTO anuncios (titulo, descricao, categoria, tipo, preco, imagem_url, contato, autor)
       VALUES
       ('Cálculo Vol. 1 - James Stewart', 'Livro usado, em bom estado, poucas anotações a lápis.', 'Livros', 'venda', 45.00, 'https://picsum.photos/seed/livro1/400/300', 'contato@exemplo.com', 'convidado'),
       ('Calculadora Científica HP 12C', 'Funcionando perfeitamente, ideal para Engenharia.', 'Eletrônicos', 'venda', 120.00, 'https://picsum.photos/seed/calc1/400/300', '(85) 90000-0000', 'convidado'),
       ('Jaleco Branco Tamanho M', 'Doação para quem está começando o curso.', 'Roupas', 'doacao', NULL, 'https://picsum.photos/seed/jaleco1/400/300', 'contato@exemplo.com', 'convidado')`
    );
  }
}

// Converte a linha do banco (snake_case) para o formato usado pelo frontend (camelCase)
function paraAnuncio(row) {
  return {
    id: row.id,
    titulo: row.titulo,
    descricao: row.descricao,
    categoria: row.categoria,
    tipo: row.tipo,
    preco: row.preco !== null ? Number(row.preco) : null,
    imagemUrl: row.imagem_url,
    contato: row.contato,
    autor: row.autor,
    criadoEm: row.criado_em
  };
}

async function listarAnuncios({ categoria, tipo, autor } = {}) {
  const condicoes = [];
  const valores = [];

  if (categoria) {
    valores.push(categoria);
    condicoes.push(`categoria ILIKE $${valores.length}`);
  }
  if (tipo) {
    valores.push(tipo);
    condicoes.push(`tipo = $${valores.length}`);
  }
  if (autor) {
    valores.push(autor);
    condicoes.push(`autor = $${valores.length}`);
  }

  const where = condicoes.length ? `WHERE ${condicoes.join(" AND ")}` : "";
  const { rows } = await pool.query(
    `SELECT * FROM anuncios ${where} ORDER BY criado_em DESC`,
    valores
  );
  return rows.map(paraAnuncio);
}

async function buscarAnuncioPorId(id) {
  const { rows } = await pool.query("SELECT * FROM anuncios WHERE id = $1", [id]);
  return rows[0] ? paraAnuncio(rows[0]) : null;
}

async function criarAnuncio({ titulo, descricao, categoria, tipo, preco, imagemUrl, contato, autor }) {
  const { rows } = await pool.query(
    `INSERT INTO anuncios (titulo, descricao, categoria, tipo, preco, imagem_url, contato, autor)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [
      titulo,
      descricao,
      categoria,
      tipo,
      tipo === "venda" ? preco : null,
      imagemUrl || "https://picsum.photos/400/300",
      contato,
      autor || "anonimo"
    ]
  );
  return paraAnuncio(rows[0]);
}

async function deletarAnuncio(id) {
  const { rowCount } = await pool.query("DELETE FROM anuncios WHERE id = $1", [id]);
  return rowCount > 0;
}

module.exports = {
  pool,
  init,
  listarAnuncios,
  buscarAnuncioPorId,
  criarAnuncio,
  deletarAnuncio
};
