# Desapega UNI — Marketplace de Economia Circular do Campus

Plataforma para estudantes cadastrarem itens (livros, calculadoras, jalecos,
componentes etc.) para **doação ou venda** dentro do ambiente universitário,
facilitando o acesso a materiais para quem está ingressando na faculdade.

Projeto desenvolvido para o **Desafio Técnico do Processo Seletivo de Estágio
Full-Stack — Laboratório Vortex (UNIFOR)**.

## Tecnologias utilizadas

- **Backend:** Node.js, Express, PostgreSQL (via `pg`)
- **Frontend:** React + TypeScript (Vite), React Router
- **PWA:** Web App Manifest + Service Worker (cache de app shell e de dados da API)
- **Infra local:** Docker Compose (sobe um Postgres já configurado)

## Como rodar localmente

### Pré-requisitos
- Node.js 18+
- Docker e Docker Compose (para o banco de dados local)

### 1. Subir o banco de dados
Na raiz do projeto:
```bash
docker compose up -d
```
Isso sobe um Postgres em `localhost:5432` com usuário `vortex`, senha `vortex123`
e banco `vortex_marketplace` (veja `docker-compose.yml`).

> Não quer usar Docker? Pode usar qualquer Postgres (local ou um free tier como
> Neon/Supabase) — só ajustar a `DATABASE_URL` no passo 2.

### 2. Backend
```bash
cd backend
cp .env.example .env   # ajuste DATABASE_URL se não for usar o Docker Compose
npm install
npm run dev
```
A API sobe em `http://localhost:3333`. Na primeira execução, a tabela `anuncios`
é criada automaticamente (`schema.sql`) e populada com 3 anúncios de exemplo.

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
O app sobe em `http://localhost:5173`.

> Para testar o comportamento de PWA (instalação), rode `npm run build` e
> `npm run preview` no frontend — o service worker funciona melhor em build
> de produção do que no modo dev.

## Endpoints da API

| Método | Rota                  | Descrição                          |
|--------|------------------------|-------------------------------------|
| GET    | /api/anuncios           | Lista anúncios (filtros: categoria, tipo, autor) |
| GET    | /api/anuncios/:id       | Detalhe de um anúncio               |
| POST   | /api/anuncios           | Cria um novo anúncio                |
| DELETE | /api/anuncios/:id       | Remove um anúncio                   |

## Deploy

- Backend: _(link aqui, se fizer o deploy)_
- Frontend: _(link aqui, se fizer o deploy)_

---

## 🧠 Diário de Bordo da IA

> Seção obrigatória exigida pelo edital do desafio Vortex.

### Ferramentas utilizadas
_(preencha: ex. Claude, ChatGPT, GitHub Copilot...)_

### Estratégia de Engenharia de Prompts
Cole aqui 2-3 prompts reais que você usou para destravar o desenvolvimento
(ex: estruturar o service worker, debugar um erro específico, modelar as rotas).

1. **Prompt:** "..."
   **Por que usei / o que resolveu:** ...

2. **Prompt:** "..."
   **Por que usei / o que resolveu:** ...

### Compartilhamento de histórico (opcional)
_(link de uma conversa longa de desenvolvimento, se quiser incluir)_

### Reflexão crítica
Descreva um momento em que a IA errou, gerou algo incompleto ou "alucinou",
e como você identificou e corrigiu.

_(preencha aqui)_
