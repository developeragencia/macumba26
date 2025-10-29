# 🛍️ Shopping da Macumba

Marketplace e SaaS para produtos religiosos, espirituais e esotéricos, inspirado no Mercado Livre.

## 🏗️ Arquitetura

**Aplicação Integrada:** Frontend Next.js + Backend NestJS rodando em um único serviço.

```
┌─────────────────────────────────────┐
│   Render Web Service (Port 3000)   │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────────────────────────┐  │
│  │   NestJS Backend (API)       │  │
│  │   /api/*                     │  │
│  └──────────────────────────────┘  │
│              ↓                      │
│  ┌──────────────────────────────┐  │
│  │   Next.js Frontend           │  │
│  │   /*                         │  │
│  └──────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│   Neon PostgreSQL Database          │
└─────────────────────────────────────┘
```

## 🚀 Stack Tecnológica

### Backend
- **NestJS** - Framework Node.js
- **Prisma ORM** - Database ORM
- **PostgreSQL (Neon)** - Database
- **JWT** - Autenticação
- **Bcrypt** - Hash de senhas
- **Cloudinary** - Upload de imagens
- **Stripe/Mercado Pago/Pix** - Pagamentos

### Frontend
- **Next.js 14** - React Framework (App Router)
- **Tailwind CSS** - Styling
- **Shadcn UI** - Componentes
- **NextAuth.js** - Autenticação
- **Axios** - HTTP Client

## 📦 Estrutura do Projeto

```
shopping-da-macumba/
├── backend/               # Backend NestJS
│   ├── src/
│   │   ├── auth/         # Autenticação
│   │   ├── users/        # Usuários
│   │   ├── vendors/      # Vendedores
│   │   ├── products/     # Produtos
│   │   ├── orders/       # Pedidos
│   │   ├── payments/     # Pagamentos
│   │   ├── cloudinary/   # Upload de imagens
│   │   └── main.ts       # Entry point (serve Next.js)
│   ├── prisma/
│   │   └── schema.prisma # Database schema
│   └── package.json
│
├── frontend/              # Frontend Next.js
│   ├── app/              # App Router
│   ├── components/       # Componentes React
│   ├── lib/              # Utilities
│   └── package.json
│
├── Dockerfile             # Build integrado
└── render.yaml            # Configuração Render
```

## 🔧 Desenvolvimento Local

### Pré-requisitos
- Node.js 18+
- PostgreSQL (ou usar Neon)

### Backend
```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run start:dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🐳 Docker

Build e execução local:
```bash
docker build -t shopping-macumba .
docker run -p 3000:3000 shopping-macumba
```

## 🌐 Deploy no Render

### Configuração Automática

O projeto está configurado com `render.yaml`. Basta conectar o repositório no Render.

### Variáveis de Ambiente

```bash
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://...  # Neon PostgreSQL
JWT_SECRET=...                  # Gerado automaticamente
JWT_EXPIRES_IN=7d
NEXTAUTH_SECRET=...             # Gerado automaticamente
NEXTAUTH_URL=https://seu-app.onrender.com
NEXT_PUBLIC_API_URL=https://seu-app.onrender.com/api
```

### Health Check

- Endpoint: `/api/health`
- Resposta: `{"status":"ok","timestamp":"..."}`

## 📡 API Endpoints

### Autenticação
- `POST /api/auth/register` - Registro
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Perfil

### Produtos
- `GET /api/products` - Listar produtos
- `POST /api/products` - Criar produto
- `GET /api/products/:id` - Detalhes
- `PUT /api/products/:id` - Atualizar
- `DELETE /api/products/:id` - Deletar

### Pedidos
- `GET /api/orders` - Listar pedidos
- `POST /api/orders` - Criar pedido
- `GET /api/orders/:id` - Detalhes

### Pagamentos
- `POST /api/payments/stripe` - Stripe
- `POST /api/payments/mercadopago` - Mercado Pago
- `POST /api/payments/pix` - Pix

## 🎨 Features

### Usuários
- ✅ Registro e Login
- ✅ Autenticação JWT
- ✅ Google OAuth (configurável)
- ✅ Perfil de usuário
- ✅ Histórico de pedidos

### Vendedores
- ✅ Cadastro de vendedor
- ✅ Dashboard de vendas
- ✅ Gerenciamento de produtos
- ✅ Analytics de vendas
- ✅ Sistema de assinaturas (SaaS)

### Produtos
- ✅ Catálogo de produtos
- ✅ Busca e filtros
- ✅ Categorias
- ✅ Upload de imagens
- ✅ Reviews e avaliações

### Pagamentos
- ✅ Stripe
- ✅ Mercado Pago
- ✅ Pix
- ✅ PayPal (configurável)

### Admin
- ✅ Dashboard administrativo
- ✅ Gerenciamento de vendedores
- ✅ Gerenciamento de produtos
- ✅ Métricas e analytics

## 🔐 Segurança

- ✅ Senhas com bcrypt
- ✅ JWT tokens
- ✅ CORS configurado
- ✅ Validação de inputs
- ✅ SQL Injection protection (Prisma)
- ✅ XSS protection
- ✅ Rate limiting
- ✅ Helmet.js

## 📊 Database Schema

Ver `backend/prisma/schema.prisma` para o schema completo.

Principais entidades:
- `User` - Usuários
- `Vendor` - Vendedores
- `Product` - Produtos
- `Category` - Categorias
- `Order` - Pedidos
- `OrderItem` - Itens do pedido
- `Review` - Avaliações
- `Subscription` - Assinaturas SaaS

## 🚀 Deploy

### Atualizado
```bash
git add .
git commit -m "Update"
git push
```

O Render fará deploy automaticamente.

### URLs

- **Backend API:** https://seu-app.onrender.com/api
- **Frontend:** https://seu-app.onrender.com
- **Health Check:** https://seu-app.onrender.com/api/health

## 📝 Licença

MIT

## 👥 Suporte

Para suporte, abra uma issue no GitHub.

---

**Desenvolvido com ❤️ para a comunidade espiritual**
