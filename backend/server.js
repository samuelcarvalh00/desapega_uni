// server.js
const express = require("express");
const cors = require("cors");
const anunciosRouter = require("./routes/anuncios");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

// rota de saúde, útil para testar se a API está no ar
app.get("/", (req, res) => {
  res.json({ status: "ok", mensagem: "API do Marketplace de Economia Circular no ar" });
});

app.use("/api/anuncios", anunciosRouter);

// tratamento de rota não encontrada
app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada." });
});

// tratamento de erro genérico
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ erro: "Erro interno no servidor." });
});

// Garante que a tabela existe (e semeia dados de exemplo) antes de aceitar requisições
db.init()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API rodando em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Não foi possível conectar ao Postgres:", err.message);
    console.error("Confira se o banco está no ar (ex: docker compose up -d) e se DATABASE_URL está correto.");
    process.exit(1);
  });
