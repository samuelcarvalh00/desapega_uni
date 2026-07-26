-- schema.sql
-- Cria a tabela de anúncios. Executado automaticamente pelo db.js na subida
-- do servidor (CREATE TABLE IF NOT EXISTS), mas também pode ser rodado manualmente:
--   psql "postgresql://vortex:vortex123@localhost:5432/vortex_marketplace" -f schema.sql

CREATE TABLE IF NOT EXISTS anuncios (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  descricao TEXT NOT NULL,
  categoria VARCHAR(80) NOT NULL,
  tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('venda', 'doacao')),
  preco NUMERIC(10, 2),
  imagem_url TEXT,
  autor VARCHAR(80) NOT NULL DEFAULT 'anonimo',
  criado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_anuncios_categoria ON anuncios (categoria);
CREATE INDEX IF NOT EXISTS idx_anuncios_autor ON anuncios (autor);
