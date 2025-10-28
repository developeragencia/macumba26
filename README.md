# 🕯️ Shopping da Macumba

![Shopping da Macumba](https://img.shields.io/badge/Version-1.0.0-gold?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)

> O maior marketplace SaaS de produtos espirituais, místicos e esotéricos do Brasil 🔮

## 📖 Sobre o Projeto

**Shopping da Macumba** é uma plataforma completa de marketplace + SaaS inspirada no Mercado Livre, dedicada exclusivamente a produtos e serviços espirituais, místicos e esotéricos afro-brasileiros.

### ✨ Principais Funcionalidades

#### 🛒 **Área do Cliente**
- Cadastro e login (email + Google OAuth)
- Busca avançada com filtros
- Carrinho de compras
- Sistema de favoritos/wishlist
- Avaliações e comentários
- Histórico de pedidos
- Chat com vendedores
- Notificações em tempo real
- Recomendações personalizadas com IA

#### 🏪 **Área do Vendedor**
- Dashboard completo com métricas
- Gestão de produtos (CRUD completo)
- Controle de estoque
- Gestão de pedidos
- Relatórios de vendas
- Sistema de mensagens
- Configuração de promoções
- Sistema de assinatura SaaS (Free, Pro, Premium)

#### 👨‍💼 **Painel Administrativo**
- Dashboard com estatísticas globais
- Gestão de usuários
- Aprovação de vendedores
- Moderação de produtos
- Sistema de tickets/suporte
- Configuração de taxas e comissões
- Gerenciamento de categorias
- Logs de atividades

#### 💳 **Sistema de Pagamentos**
- **PIX** (QR Code)
- **Mercado Pago**
- **Stripe** (Cartão de Crédito/Débito)
- **PayPal**
- Webhooks para confirmação automática

#### 🎯 **SaaS para Vendedores**
- **Free**: até 5 produtos
- **Pro**: até 100 produtos + destaque
- **Premium**: produtos ilimitados + personalização completa

## 🚀 Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Shadcn UI**
- **Zustand** (State Management)
- **React Hook Form** + **Zod**
- **Axios**
- **Socket.io Client**

### Backend
- **NestJS**
- **TypeScript**
- **PostgreSQL**
- **Prisma ORM**
- **JWT Authentication**
- **Passport.js** (Google OAuth)
- **Socket.io** (Real-time)
- **Redis** (Cache & Sessions)

### Payments & Storage
- **Cloudinary** (Imagens)
- **Stripe SDK**
- **Mercado Pago SDK**
- **PayPal SDK**
- **Nodemailer** (Emails)

### DevOps
- **Docker** & **Docker Compose**
- **Vercel** (Frontend)
- **Railway/Render** (Backend)
- **GitHub Actions** (CI/CD)

## 📁 Estrutura do Projeto

```
shopping-da-macumba/
├── frontend/                 # Next.js 14 App
│   ├── app/                 # App Router
│   │   ├── (auth)/         # Auth pages
│   │   ├── (shop)/         # Shop pages
│   │   ├── vendedor/       # Vendor dashboard
│   │   ├── admin/          # Admin dashboard
│   │   └── api/            # API routes
│   ├── components/          # React components
│   │   ├── ui/             # Shadcn UI components
│   │   ├── layout/         # Layout components
│   │   ├── home/           # Home page components
│   │   ├── products/       # Product components
│   │   └── ...
│   ├── lib/                 # Utilities & API client
│   ├── public/              # Static assets
│   └── styles/              # Global styles
│
├── backend/                  # NestJS API
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── users/          # Users module
│   │   ├── vendors/        # Vendors module
│   │   ├── products/       # Products module
│   │   ├── categories/     # Categories module
│   │   ├── orders/         # Orders module
│   │   ├── cart/           # Shopping cart module
│   │   ├── payments/       # Payments integration
│   │   ├── subscriptions/  # SaaS subscriptions
│   │   ├── messages/       # Chat system
│   │   ├── notifications/  # Notifications
│   │   ├── reviews/        # Reviews & ratings
│   │   ├── wishlist/       # Wishlist
│   │   ├── blog/           # Blog posts
│   │   ├── admin/          # Admin operations
│   │   ├── recommendations/ # AI recommendations
│   │   ├── cloudinary/     # Image upload
│   │   ├── email/          # Email service
│   │   └── prisma/         # Database service
│   └── prisma/
│       └── schema.prisma   # Database schema
│
├── docker-compose.yml        # Docker orchestration
├── .env.example             # Environment variables template
└── README.md                # This file
```

## 🔧 Instalação e Configuração

### Pré-requisitos

- Node.js 20+
- PostgreSQL 15+
- Redis (opcional, para cache)
- Docker & Docker Compose (opcional)

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/shopping-da-macumba.git
cd shopping-da-macumba
```

### 2. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env` na raiz, backend e frontend:

```bash
cp .env.example .env
```

Edite os arquivos `.env` com suas credenciais:

```env
# Database
DATABASE_URL="postgresql://shopping_admin:macumba_secure_2024@localhost:5432/shopping_da_macumba"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Payments
MERCADO_PAGO_ACCESS_TOKEN="your-mp-token"
STRIPE_SECRET_KEY="your-stripe-key"
PAYPAL_CLIENT_ID="your-paypal-id"

# Email
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"

# URLs
NEXT_PUBLIC_API_URL="http://localhost:3001/api/v1"
NEXT_PUBLIC_FRONTEND_URL="http://localhost:3000"
```

### 3. Instalação com Docker (Recomendado)

```bash
# Iniciar todos os serviços
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar serviços
docker-compose down
```

### 4. Instalação Manual

#### Backend

```bash
cd backend
npm install

# Gerar Prisma Client
npx prisma generate

# Rodar migrations
npx prisma migrate dev

# Seed database (opcional)
npm run prisma:seed

# Iniciar servidor
npm run start:dev
```

#### Frontend

```bash
cd frontend
npm install

# Iniciar em desenvolvimento
npm run dev
```

## 🎨 Design System

### Paleta de Cores

```css
/* Cores Místicas */
--mystical-purple: #4a0e7a;
--mystical-purple-dark: #1a0033;
--mystical-gold: #ffd700;
--mystical-gold-dark: #ff8c00;
--mystical-black: #0a0a0a;
```

### Tema

O design segue uma estética **mística e espiritual** com:
- Gradientes roxo e dourado
- Animações de velas piscando
- Partículas de estrelas flutuantes
- Efeito de brilho místico em elementos hover
- Scrollbar customizada com gradiente dourado

## 🗄️ Schema do Banco de Dados

### Tabelas Principais

- `users` - Usuários do sistema
- `vendors` - Vendedores/Lojistas
- `subscriptions` - Assinaturas SaaS dos vendedores
- `products` - Produtos à venda
- `categories` - Categorias de produtos
- `orders` - Pedidos realizados
- `order_items` - Itens dos pedidos
- `cart_items` - Carrinho de compras
- `wishlist` - Lista de desejos
- `reviews` - Avaliações de produtos
- `addresses` - Endereços de entrega
- `messages` - Sistema de chat
- `notifications` - Notificações
- `blog_posts` - Posts do blog
- `site_settings` - Configurações globais

### Relacionamentos

- Um usuário pode ser um vendedor (1:1)
- Um vendedor tem uma assinatura (1:1)
- Produtos pertencem a vendedores e categorias
- Pedidos contêm múltiplos itens
- Reviews conectam usuários e produtos

## 🔐 Autenticação

### Fluxo de Login

1. Usuário faz login com email/senha ou Google
2. Backend valida credenciais
3. JWT token é gerado e retornado
4. Frontend armazena token no localStorage
5. Token é enviado em todas as requisições autenticadas

### Proteção de Rotas

```typescript
// Backend
@UseGuards(AuthGuard('jwt'))
@Controller('protected-route')

// Frontend
middleware.ts - redirects não autenticados
```

## 💰 Sistema de Pagamentos

### Fluxo de Checkout

1. **Carrinho** → Usuário adiciona produtos
2. **Checkout** → Seleciona endereço e método de pagamento
3. **Pedido** → Sistema cria pedido com status PENDING
4. **Pagamento** → Redireciona para gateway escolhido
5. **Webhook** → Gateway confirma pagamento
6. **Atualização** → Status muda para APPROVED
7. **Email** → Confirmação enviada ao cliente

### Integração PIX

```typescript
// Gera QR Code e chave PIX
const pixData = await paymentsAPI.createPix(orderId, amount);
// Retorna: { qrCode, pixKey, expiresAt }
```

## 📦 Deployment

### Frontend (Vercel)

1. Conecte seu repositório GitHub à Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

```bash
# Build command
npm run build

# Output directory
.next
```

### Backend (Railway/Render)

#### Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway up
```

#### Render

1. Conecte seu repositório
2. Configure como Web Service
3. Adicione variáveis de ambiente
4. Configure PostgreSQL Add-on

### Banco de Dados

**Opções:**
- Railway PostgreSQL
- Render PostgreSQL
- Supabase
- AWS RDS

## 🧪 Testes

```bash
# Backend
cd backend
npm run test
npm run test:e2e

# Frontend
cd frontend
npm run test
```

## 📝 API Documentation

### Base URL

```
Development: http://localhost:3001/api/v1
Production: https://api.shopping-da-macumba.com/api/v1
```

### Principais Endpoints

#### Auth
- `POST /auth/register` - Registrar usuário
- `POST /auth/login` - Login
- `GET /auth/me` - Perfil autenticado
- `POST /auth/forgot-password` - Recuperar senha

#### Products
- `GET /products` - Listar produtos (com filtros)
- `GET /products/:id` - Detalhes do produto
- `POST /products` - Criar produto (vendedor)
- `PUT /products/:id` - Atualizar produto
- `DELETE /products/:id` - Deletar produto

#### Cart
- `GET /cart` - Ver carrinho
- `POST /cart` - Adicionar item
- `PUT /cart/:itemId` - Atualizar quantidade
- `DELETE /cart/:itemId` - Remover item

#### Orders
- `POST /orders` - Criar pedido
- `GET /orders` - Meus pedidos
- `GET /orders/:id` - Detalhes do pedido

#### Vendors
- `POST /vendors` - Tornar-se vendedor
- `GET /vendors/my-store` - Minha loja
- `GET /vendors/my-store/dashboard` - Dashboard do vendedor

[Ver documentação completa](./docs/API.md)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Alex Moura**

- GitHub: [@alexmoura](https://github.com/alexmoura)
- Email: alex@shoppingdamacumba.com

## 🙏 Agradecimentos

- Comunidades espirituais afro-brasileiras
- Open source community
- Todos que contribuíram com feedback

---

<div align="center">

**Feito com 🕯️ e 💜 por Alex Moura**

⭐ Se este projeto te ajudou, considere dar uma estrela!

</div>

