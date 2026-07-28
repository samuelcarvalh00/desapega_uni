# Desapega UNI — Marketplace de Economia Circular do Campus

Plataforma para estudantes cadastrarem itens (livros, calculadoras, roupas,
componentes eletrônicos, móveis etc.) para **doação ou venda** dentro do
ambiente universitário, facilitando o acesso a materiais para quem está
ingressando na faculdade.

Projeto desenvolvido para o **Desafio Técnico do Processo Seletivo de Estágio
Full-Stack — Laboratório Vortex (UNIFOR)**, com base no edital do projeto
"Marketplace de Economia Circular (Desapego Universitário)".

🔗 **Aplicação em produção:** https://desapega-uni.vercel.app

## Funcionalidades entregues

Conforme o escopo definido no edital (Seção 1.1):

- **Landing Page pública** — apresentação da proposta, estatísticas simuladas,
  vitrine com os últimos itens anunciados e filtros por categoria, com CTAs
  para anunciar ou buscar itens.
- **Aplicação Mobile (PWA)** — formulário para anunciar um item (título,
  descrição, categoria, preço ou doação, imagem) e listagem dos próprios
  anúncios, instalável na tela inicial de um dispositivo mobile.

## Tecnologias utilizadas

| Camada | Tecnologias |
|---|---|
| Backend | Node.js, Express, PostgreSQL (via `pg`) |
| Frontend | React + TypeScript (Vite), React Router |
| PWA | Web App Manifest + Service Worker (cache de app shell e de dados da API) |
| Infra local | Docker Compose (sobe um Postgres já configurado) |
| Deploy | Vercel (frontend), Render (backend), Neon (Postgres) |

## Requisitos do edital atendidos

### Backend (Seção 2.1)
- [x] API REST estruturada (Node.js/Express)
- [x] CRUD de anúncios (criar, listar, filtrar, deletar)
- [x] Persistência de dados funcional
- [x] Dados em formato JSON
- [x] **Bônus:** validação de campos obrigatórios e tratamento de erros
- [x] **Bônus:** banco de dados relacional real (PostgreSQL)

### Frontend & PWA (Seção 2.2)
- [x] Interface em tecnologia moderna (React)
- [x] Manifesto PWA (`manifest.json`) + Service Worker
- [x] Responsividade completa (desktop → mobile)
- [x] **Bônus:** cache no Service Worker para uso offline
- [x] **Bônus:** TypeScript no frontend
- [x] **Bônus:** deploy em produção (Vercel + Render + Neon)

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

- Backend: https://desapega-uni.onrender.com
- Frontend: https://desapega-uni.vercel.app
- Banco de dados: PostgreSQL hospedado no Neon

> O backend está no plano gratuito do Render, que "dorme" após um tempo sem
> uso — a primeira requisição depois de um tempo inativo pode levar de 30 a
> 50 segundos para responder. É esperado, não é bug.

---

## 🧠 Diário de Bordo da IA

> Seção obrigatória exigida pelo edital do desafio Vortex (Seção 3).

### Ferramentas utilizadas
Utilizei apenas o **Claude (Anthropic)** ao longo de todo o desenvolvimento —
desde a estruturação inicial do projeto (backend, frontend, PWA) até a
revisão de arquitetura, geração de material de estudo, ajustes de design e
debug do processo de deploy.

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
Durante o deploy em produção, apareceram dois erros reais que a IA não previu
de início. O primeiro: ao testar a API pelo navegador, a rota `/api/anuncios`
retornava "Not Found" mesmo com o backend funcionando — depois de investigar
juntos, identificamos que era o bloqueador de anúncios do navegador Brave
barrando qualquer URL com a palavra "anuncios". O segundo, mais sério: depois
do deploy do frontend na Vercel, acessar uma rota diretamente pela URL (como
`/anuncios`) retornava 404 da própria Vercel, porque o React Router só
funciona quando a navegação acontece dentro do app — faltava um arquivo
`vercel.json` configurando o redirecionamento de todas as rotas para o
`index.html`. Também identifiquei sozinho, testando com outra pessoa, que o
sistema tratava todo mundo como o mesmo "usuário atual" (uma constante fixa
no código, já que autenticação completa era apenas diferencial bônus) —
isso fazia com que "ver meus anúncios" mostrasse os anúncios de qualquer
pessoa que tivesse testado o site. Esses três casos mostram que a IA entrega
uma solução funcional de primeira, mas problemas de ambiente real (cache de
navegador, hospedagem, comportamento com múltiplos usuários) só aparecem
quando o sistema é testado de verdade, fora do ambiente local — e a reflexão
crítica sobre esses casos me obrigou a entender o motivo de cada erro, não só
aplicar a correção.
