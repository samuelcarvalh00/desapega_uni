// routes/anuncios.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// GET /api/anuncios -> lista, com filtros opcionais ?categoria= &tipo= &autor=
router.get("/", async (req, res, next) => {
  try {
    const { categoria, tipo, autor } = req.query;
    const anuncios = await db.listarAnuncios({ categoria, tipo, autor });
    res.json(anuncios);
  } catch (err) {
    next(err);
  }
});

// GET /api/anuncios/:id -> um anúncio específico
router.get("/:id", async (req, res, next) => {
  try {
    const anuncio = await db.buscarAnuncioPorId(Number(req.params.id));
    if (!anuncio) {
      return res.status(404).json({ erro: "Anúncio não encontrado." });
    }
    res.json(anuncio);
  } catch (err) {
    next(err);
  }
});

// POST /api/anuncios -> cria um novo anúncio
router.post("/", async (req, res, next) => {
  try {
    const { titulo, descricao, categoria, tipo, preco, imagemUrl, autor } = req.body;

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

    const novoAnuncio = await db.criarAnuncio({
      titulo,
      descricao,
      categoria,
      tipo,
      preco: Number(preco) || 0,
      imagemUrl,
      autor
    });

    res.status(201).json(novoAnuncio);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/anuncios/:id -> remove um anúncio
router.delete("/:id", async (req, res, next) => {
  try {
    const removido = await db.deletarAnuncio(Number(req.params.id));
    if (!removido) {
      return res.status(404).json({ erro: "Anúncio não encontrado." });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
