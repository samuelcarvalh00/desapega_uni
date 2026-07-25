// routes/anuncios.js
const express = require("express");
const router = express.Router();
const { readDb, writeDb } = require("../db");

// GET /api/anuncios  -> lista todos, com filtros opcionais ?categoria= &tipo= &autor=
router.get("/", (req, res) => {
  const { categoria, tipo, autor } = req.query;
  const db = readDb();
  let anuncios = db.anuncios;

  if (categoria) {
    anuncios = anuncios.filter(
      (a) => a.categoria.toLowerCase() === categoria.toLowerCase()
    );
  }
  if (tipo) {
    anuncios = anuncios.filter((a) => a.tipo === tipo);
  }
  if (autor) {
    anuncios = anuncios.filter((a) => a.autor === autor);
  }

  // mais recentes primeiro
  anuncios = [...anuncios].sort(
    (a, b) => new Date(b.criadoEm) - new Date(a.criadoEm)
  );

  res.json(anuncios);
});

// GET /api/anuncios/:id -> um anúncio específico
router.get("/:id", (req, res) => {
  const db = readDb();
  const anuncio = db.anuncios.find((a) => a.id === Number(req.params.id));
  if (!anuncio) {
    return res.status(404).json({ erro: "Anúncio não encontrado." });
  }
  res.json(anuncio);
});

// POST /api/anuncios -> cria um novo anúncio
router.post("/", (req, res) => {
  const { titulo, descricao, categoria, tipo, preco, imagemUrl, autor } =
    req.body;

  if (!titulo || !descricao || !categoria || !tipo) {
    return res.status(400).json({
      erro: "Campos obrigatórios: titulo, descricao, categoria, tipo."
    });
  }
  if (tipo !== "venda" && tipo !== "doacao") {
    return res
      .status(400)
      .json({ erro: "O campo 'tipo' deve ser 'venda' ou 'doacao'." });
  }

  const db = readDb();
  const novoAnuncio = {
    id: db.nextId,
    titulo,
    descricao,
    categoria,
    tipo,
    preco: tipo === "venda" ? Number(preco) || 0 : null,
    imagemUrl: imagemUrl || "https://picsum.photos/400/300",
    autor: autor || "anonimo",
    criadoEm: new Date().toISOString()
  };

  db.anuncios.push(novoAnuncio);
  db.nextId += 1;
  writeDb(db);

  res.status(201).json(novoAnuncio);
});

// DELETE /api/anuncios/:id -> remove um anúncio
router.delete("/:id", (req, res) => {
  const db = readDb();
  const id = Number(req.params.id);
  const existe = db.anuncios.some((a) => a.id === id);

  if (!existe) {
    return res.status(404).json({ erro: "Anúncio não encontrado." });
  }

  db.anuncios = db.anuncios.filter((a) => a.id !== id);
  writeDb(db);

  res.status(204).send();
});

module.exports = router;
