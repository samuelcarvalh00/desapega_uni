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

> Seção obrigatória exigida pelo edital do desafio Vortex (Seção 3).

### Ferramentas utilizadas
Utilizei apenas o **Claude (Anthropic)** ao longo de todo o desenvolvimento —
desde a estruturação inicial do projeto (backend, frontend, PWA) até a
revisão de arquitetura, geração de material de estudo e ajustes de design.

### Estratégia de Engenharia de Prompts

1. **Prompt:** "vamo começar agora ja" (após alinhar a stack Node.js/Express +
   React em resposta a uma pergunta anterior da IA sobre qual stack eu já
   dominava)
   **Por que usei / o que resolveu:** pedi pra já sair estruturando o projeto
   inteiro (backend com API REST, frontend com PWA) em vez de eu escrever
   arquivo por arquivo do zero, economizando o tempo que eu tinha (o prazo
   era apertado — 6 dias restantes).

2. **Prompt:** "po te falar da pra melhorar o design dessa pagina, colocar uns
   hover pra ficar mais estilizando e umas transições mais suaves, e alem disso
   c nao aplicou o diferencial que seria o ts no front, e eu n to vendo nem um
   banco de dadosm queria começar a mexer com postgress esse podia ser um
   começo"
   **Por que usei / o que resolveu:** usei esse prompt pra pedir 3 melhorias
   de uma vez — hover/transições no CSS, migração do frontend pra TypeScript
   e troca da persistência em arquivo JSON por PostgreSQL real (ambos
   diferenciais bônus do edital).

3. **Prompt:** "consegue criar um pdf com as explicações e tmb como iniciar o
   projeto como é o fluxo dele e etc" (pedindo explicitamente conceitos
   básicos como o que é Docker, como o banco se conecta ao backend, e
   explicação pasta por pasta)
   **Por que usei / o que resolveu:** como meu papel virou entender o código
   em vez de escrever mais, usei esse prompt pra gerar material de estudo
   estruturado, que usei pra me preparar pro trecho de explicação técnica do
   vídeo.

### Compartilhamento de histórico (opcional)
Optei por não compartilhar o link da conversa.

### Reflexão crítica
Ao gerar as categorias de filtro da landing page, a IA criou "Livros",
"Engenharia", "Computação" e "Jalecos" misturando dois critérios diferentes
sem perceber: alguns filtros eram por **tipo de item** (Livros, Jalecos) e
outros por **curso/área** (Engenharia, Computação). Isso não fazia sentido,
já que um jaleco ou uma calculadora científica servem pra vários cursos, não
só um — e "Computação" como categoria também era ambíguo (periférico? peça de
PC? livro de computação?). Percebi o problema ao revisar os prints do sistema
rodando: os filtros pareciam específicos demais e inconsistentes entre si.
Ao questionar isso com a IA, ela reconheceu a inconsistência e propôs
categorias baseadas só em tipo de item (ex: "Eletrônicos", "Roupas e
Uniformes", "Livros e Apostilas"), evitando misturar critérios diferentes na
mesma lista de filtros. Esse caso mostra que a IA gera algo funcional de
primeira, mas nem sempre pensa em consistência de UX até ser questionada.