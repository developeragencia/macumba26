# 📖 Guia de Instalação - Shopping da Macumba

## 🎯 Índice

1. [Requisitos](#requisitos)
2. [Instalação Rápida com Docker](#instalação-rápida-com-docker)
3. [Instalação Manual](#instalação-manual)
4. [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
5. [Configuração de Serviços Externos](#configuração-de-serviços-externos)
6. [Troubleshooting](#troubleshooting)

## 📋 Requisitos

### Software Necessário

- **Node.js**: v20.x ou superior
- **npm**: v9.x ou superior (vem com Node.js)
- **PostgreSQL**: v15 ou superior
- **Git**: para clonar o repositório
- **Docker** (opcional): para instalação com containers

### Contas de Serviços Externos (Opcionais)

- **Google Cloud Console** (para OAuth)
- **Cloudinary** (para upload de imagens)
- **Stripe** (pagamentos com cartão)
- **Mercado Pago** (pagamentos no Brasil)
- **PayPal** (pagamentos internacionais)

## 🐳 Instalação Rápida com Docker

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/shopping-da-macumba.git
cd shopping-da-macumba
```

### Passo 2: Configurar Variáveis de Ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações.

### Passo 3: Iniciar com Docker Compose

```bash
# Iniciar todos os serviços
docker-compose up -d

# Ver logs em tempo real
docker-compose logs -f

# Acessar o banco de dados
docker-compose exec postgres psql -U shopping_admin -d shopping_da_macumba
```

### Passo 4: Acessar a Aplicação

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Banco de Dados**: localhost:5432
- **Redis**: localhost:6379

### Comandos Úteis do Docker

```bash
# Parar todos os serviços
docker-compose down

# Resetar banco de dados (CUIDADO!)
docker-compose down -v
docker-compose up -d

# Rebuild após mudanças
docker-compose up -d --build

# Ver status dos containers
docker-compose ps
```

## 🛠️ Instalação Manual

### Passo 1: Clonar e Instalar Dependências

```bash
# Clonar repositório
git clone https://github.com/seu-usuario/shopping-da-macumba.git
cd shopping-da-macumba

# Instalar dependências do backend
cd backend
npm install
cd ..

# Instalar dependências do frontend
cd frontend
npm install
cd ..
```

### Passo 2: Configurar PostgreSQL

```bash
# Entrar no PostgreSQL
psql postgres

# Criar banco de dados e usuário
CREATE USER shopping_admin WITH PASSWORD 'macumba_secure_2024';
CREATE DATABASE shopping_da_macumba;
GRANT ALL PRIVILEGES ON DATABASE shopping_da_macumba TO shopping_admin;
\q
```

### Passo 3: Configurar Variáveis de Ambiente

#### Backend (.env no diretório backend/)

```env
# Database
DATABASE_URL="postgresql://shopping_admin:macumba_secure_2024@localhost:5432/shopping_da_macumba"

# JWT
JWT_SECRET="gere-uma-chave-secreta-forte-aqui"
JWT_EXPIRES_IN="7d"

# Server
PORT=3001
NODE_ENV=development
FRONTEND_URL="http://localhost:3000"

# Google OAuth (opcional)
GOOGLE_CLIENT_ID="seu-client-id"
GOOGLE_CLIENT_SECRET="seu-client-secret"

# Cloudinary (opcional)
CLOUDINARY_CLOUD_NAME="seu-cloud-name"
CLOUDINARY_API_KEY="sua-api-key"
CLOUDINARY_API_SECRET="seu-api-secret"

# Payment Gateways (opcional)
MERCADO_PAGO_ACCESS_TOKEN="seu-token"
STRIPE_SECRET_KEY="sua-chave"
PAYPAL_CLIENT_ID="seu-client-id"

# Email (opcional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="seu-email@gmail.com"
SMTP_PASSWORD="sua-senha-app"
```

#### Frontend (.env.local no diretório frontend/)

```env
NEXT_PUBLIC_API_URL="http://localhost:3001/api/v1"
NEXT_PUBLIC_FRONTEND_URL="http://localhost:3000"

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="gere-outra-chave-secreta-forte"

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="sua-chave-publica-stripe"
```

### Passo 4: Configurar o Banco de Dados

```bash
cd backend

# Gerar Prisma Client
npx prisma generate

# Executar migrations
npx prisma migrate dev --name init

# (Opcional) Seed com dados de exemplo
npx prisma db seed
```

### Passo 5: Iniciar os Servidores

#### Terminal 1 - Backend

```bash
cd backend
npm run start:dev
```

#### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

### Passo 6: Acessar a Aplicação

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api/v1
- **Prisma Studio** (GUI do banco): `npx prisma studio` no diretório backend

## 🗄️ Configuração do Banco de Dados

### Opção 1: PostgreSQL Local

Já coberto na instalação manual acima.

### Opção 2: PostgreSQL com Docker

```bash
docker run --name shopping-postgres \
  -e POSTGRES_USER=shopping_admin \
  -e POSTGRES_PASSWORD=macumba_secure_2024 \
  -e POSTGRES_DB=shopping_da_macumba \
  -p 5432:5432 \
  -d postgres:15-alpine
```

### Opção 3: Banco de Dados em Nuvem

#### Railway

1. Crie uma conta em [railway.app](https://railway.app)
2. Crie um novo PostgreSQL database
3. Copie a DATABASE_URL fornecida
4. Cole no seu arquivo .env

#### Supabase

1. Crie uma conta em [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Vá em Settings > Database
4. Copie a Connection String (modo "Session")
5. Cole no seu arquivo .env

## 🔧 Configuração de Serviços Externos

### Google OAuth (Login com Google)

1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Crie um novo projeto
3. Ative a Google+ API
4. Crie credenciais OAuth 2.0
5. Adicione URLs autorizadas:
   - `http://localhost:3000` (dev)
   - `http://localhost:3001/api/v1/auth/google/callback` (callback)
6. Copie Client ID e Client Secret para o .env

### Cloudinary (Upload de Imagens)

1. Crie conta em [cloudinary.com](https://cloudinary.com)
2. No dashboard, copie:
   - Cloud Name
   - API Key
   - API Secret
3. Cole no arquivo .env

### Stripe (Pagamentos)

1. Crie conta em [stripe.com](https://stripe.com)
2. Ative modo de teste
3. Copie as chaves de teste:
   - Secret Key (backend)
   - Publishable Key (frontend)
4. Configure webhook:
   - URL: `https://sua-api.com/api/v1/payments/webhooks/stripe`
   - Eventos: `payment_intent.succeeded`

### Mercado Pago

1. Crie conta em [mercadopago.com.br](https://www.mercadopago.com.br)
2. Vá em "Suas integrações"
3. Crie nova aplicação
4. Copie o Access Token de teste
5. Cole no .env

### SMTP (Emails)

#### Gmail

1. Ative verificação em 2 etapas
2. Gere uma senha de app em: https://myaccount.google.com/apppasswords
3. Use a senha gerada no SMTP_PASSWORD

#### SendGrid (alternativa)

1. Crie conta em [sendgrid.com](https://sendgrid.com)
2. Crie uma API Key
3. Configure:
   ```env
   SMTP_HOST="smtp.sendgrid.net"
   SMTP_PORT="587"
   SMTP_USER="apikey"
   SMTP_PASSWORD="sua-api-key"
   ```

## 🐛 Troubleshooting

### Erro: "Cannot connect to database"

**Solução:**
```bash
# Verifique se o PostgreSQL está rodando
sudo systemctl status postgresql

# Ou no Docker
docker ps | grep postgres

# Teste a conexão
psql -U shopping_admin -d shopping_da_macumba -h localhost
```

### Erro: "Module not found"

**Solução:**
```bash
# Reinstale as dependências
rm -rf node_modules package-lock.json
npm install
```

### Erro: Prisma migrations

**Solução:**
```bash
# Resete o banco (CUIDADO - apaga todos os dados!)
npx prisma migrate reset

# Ou crie uma nova migration
npx prisma migrate dev --name fix
```

### Porta já em uso

**Solução:**
```bash
# Encontre o processo usando a porta
lsof -i :3000
lsof -i :3001

# Mate o processo
kill -9 <PID>

# Ou use outra porta
PORT=3002 npm run dev
```

### Erro de CORS no frontend

**Solução:**
Verifique se o FRONTEND_URL no backend .env está correto e inclui http://localhost:3000

### Erro: "JWT malformed"

**Solução:**
Limpe o localStorage no navegador:
```javascript
// No console do navegador
localStorage.clear()
```

## 📚 Próximos Passos

Após a instalação:

1. **Crie um usuário admin**
   ```bash
   cd backend
   npm run create:admin
   ```

2. **Adicione categorias**
   - Acesse http://localhost:3000/admin
   - Vá em "Categorias" e adicione as principais

3. **Cadastre um vendedor de teste**
   - Registre-se no frontend
   - Vá em "Seja um Vendedor"
   - Preencha os dados

4. **Adicione produtos de teste**
   - Entre no dashboard do vendedor
   - Adicione alguns produtos com imagens

5. **Teste o fluxo de compra**
   - Navegue pelos produtos
   - Adicione ao carrinho
   - Faça checkout

## 💡 Dicas

- Use `npm run prisma:studio` para visualizar o banco de dados graficamente
- Ative o hot reload no backend editando `nest-cli.json`
- Use React DevTools para debug do frontend
- Configure o VS Code com ESLint e Prettier para melhor DX

## 🆘 Precisa de Ajuda?

- **Issues**: https://github.com/seu-usuario/shopping-da-macumba/issues
- **Discussões**: https://github.com/seu-usuario/shopping-da-macumba/discussions
- **Email**: suporte@shoppingdamacumba.com

---

**Boa sorte com o seu Shopping da Macumba! 🕯️✨**

