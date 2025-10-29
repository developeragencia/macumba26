# 🕯️ Shopping da Macumba

Marketplace SaaS para produtos espirituais, religiosos e esotéricos - **100% PHP**

## 🚀 Stack Tecnológica

- **PHP 8.2** - Backend e Frontend integrados
- **PostgreSQL** - Database (Neon)
- **Composer** - Gerenciamento de dependências
- **Tailwind CSS** - Framework CSS (via CDN)
- **Apache** - Web server
- **Docker** - Containerização

## 🏗️ Arquitetura

Aplicação PHP MVC moderna com:
- ✅ Roteamento personalizado
- ✅ Controllers
- ✅ Models com PDO
- ✅ Views em PHP puro
- ✅ Autenticação com Sessions
- ✅ API REST
- ✅ Frontend integrado

```
shopping-macumba/
├── public/              # Entry point (index.php)
├── src/
│   ├── Core/           # Router, Database
│   ├── Controllers/    # Todos os controllers
│   └── Models/         # Models (User, Product)
├── views/              # Templates PHP
├── database/           # SQL migrations
└── Dockerfile          # Deploy
```

## 📦 Instalação Local

### Pré-requisitos
- PHP 8.2+
- Composer
- PostgreSQL

### Setup

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/macumba26.git
cd macumba26

# Instalar dependências
composer install

# Configurar ambiente
cp .env.example .env
# Edite .env com suas credenciais

# Criar tabelas no banco
psql $DATABASE_URL < database/migrations.sql

# Iniciar servidor
composer start
# ou
php -S localhost:3000 -t public
```

Acesse: **http://localhost:3000**

## 🐳 Docker

```bash
# Build
docker build -t shopping-macumba .

# Run
docker run -p 3000:80 -e DATABASE_URL=postgresql://... shopping-macumba
```

## 🌐 Deploy no Render

### Variáveis de Ambiente

```bash
DATABASE_URL=postgresql://...
JWT_SECRET=seu-secret-aqui
```

### Dockerfile Deploy

O Render detecta automaticamente o Dockerfile e faz o deploy.

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` - Cadastro
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Perfil
- `POST /api/auth/logout` - Logout

### Products
- `GET /api/products` - Listar todos
- `GET /api/products/{id}` - Ver detalhes
- `POST /api/products` - Criar (auth)
- `PUT /api/products/{id}` - Atualizar (auth)
- `DELETE /api/products/{id}` - Deletar (auth)

### Orders
- `GET /api/orders` - Meus pedidos (auth)
- `POST /api/orders` - Criar pedido (auth)
- `GET /api/orders/{id}` - Ver pedido (auth)

### Payments
- `POST /api/payments/stripe` - Pagamento Stripe
- `POST /api/payments/pix` - Pagamento PIX

### Health
- `GET /api/health` - Status da API

## 🎨 Frontend (Páginas Web)

- `/` - Home
- `/login` - Login
- `/register` - Cadastro
- `/produtos` - Lista de produtos
- `/produto/{id}` - Detalhes do produto
- `/carrinho` - Carrinho
- `/checkout` - Finalizar compra
- `/dashboard` - Dashboard do usuário
- `/vendedor/dashboard` - Dashboard do vendedor

## 💾 Database Schema

Ver `database/migrations.sql` para o schema completo.

Tabelas principais:
- `users` - Usuários
- `vendors` - Vendedores
- `products` - Produtos
- `categories` - Categorias
- `orders` - Pedidos
- `order_items` - Itens do pedido
- `reviews` - Avaliações

## 🔐 Segurança

- ✅ Senhas com `password_hash()`
- ✅ Prepared statements (PDO)
- ✅ Session-based auth
- ✅ SQL Injection protection
- ✅ XSS protection com `htmlspecialchars()`

## 🎯 Features

### Implementado
- ✅ Autenticação completa
- ✅ Cadastro e login
- ✅ API REST funcional
- ✅ CRUD de produtos
- ✅ Frontend responsivo
- ✅ Dashboard de usuário
- ✅ Dashboard de vendedor

### Em Desenvolvimento
- 🔄 Sistema de carrinho
- 🔄 Checkout e pagamentos
- 🔄 Upload de imagens
- 🔄 Sistema de avaliações
- 🔄 Busca de produtos

## 🚀 Deploy

```bash
git add .
git commit -m "Deploy"
git push
```

O Render fará deploy automaticamente!

## 📝 Licença

MIT

## 👥 Suporte

Para suporte, abra uma issue no GitHub.

---

**Desenvolvido com ❤️ em PHP puro - Shopping da Macumba**

