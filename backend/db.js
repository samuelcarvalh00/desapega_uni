// db.js
// Persistência simples em arquivo JSON.
// Atende ao requisito "persistência de dados funcional (banco em arquivo ou em memória)".
// Se quiser evoluir para SQLite/Postgres depois (diferencial bônus), troque só este arquivo.

const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "data", "db.json");

function ensureDbFile() {
  if (!fs.existsSync(DB_PATH)) {
    const seed = {
      anuncios: [
        {
          id: 1,
          titulo: "Cálculo Vol. 1 - James Stewart",
          descricao: "Livro usado, em bom estado, poucas anotações a lápis.",
          categoria: "Livros",
          tipo: "venda", // "venda" | "doacao"
          preco: 45.0,
          imagemUrl: "https://picsum.photos/seed/livro1/400/300",
          autor: "convidado",
          criadoEm: new Date().toISOString()
        },
        {
          id: 2,
          titulo: "Calculadora Científica HP 12C",
          descricao: "Funcionando perfeitamente, ideal para Engenharia.",
          categoria: "Engenharia",
          tipo: "venda",
          preco: 120.0,
          imagemUrl: "https://picsum.photos/seed/calc1/400/300",
          autor: "convidado",
          criadoEm: new Date().toISOString()
        },
        {
          id: 3,
          titulo: "Jaleco Branco Tamanho M",
          descricao: "Doação para quem está começando o curso.",
          categoria: "Jalecos",
          tipo: "doacao",
          preco: null,
          imagemUrl: "https://picsum.photos/seed/jaleco1/400/300",
          autor: "convidado",
          criadoEm: new Date().toISOString()
        }
      ],
      nextId: 4
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(seed, null, 2));
  }
}

function readDb() {
  ensureDbFile();
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeDb(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

module.exports = { readDb, writeDb };
