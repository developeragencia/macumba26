# 🗄️ Como Executar as Migrations no Banco de Dados

## ⚠️ PROBLEMA: Tabelas não aparecem?

Siga este guia passo a passo para criar as tabelas corretamente.

---

## 📋 OPÇÃO 1: Via phpPgAdmin (Hostinger)

### Passo 1: Acessar phpPgAdmin
1. Entre no **cPanel**
2. Procure por **"PostgreSQL"** ou **"phpPgAdmin"**
3. Clique para abrir
4. Selecione seu banco de dados na lista à esquerda

### Passo 2: Abrir o Editor SQL
1. No menu superior, clique em **"SQL"**
2. Você verá uma caixa de texto grande

### Passo 3: Executar o Script
1. Abra o arquivo `database/migrations.sql` no seu computador
2. **Copie TODO o conteúdo** (Ctrl+A, Ctrl+C)
3. **Cole** na caixa de texto do phpPgAdmin
4. Clique no botão **"Execute"** ou **"Executar"**

### Passo 4: Verificar Erros
- Se aparecer erro vermelho, veja a seção "Solução de Problemas" abaixo
- Se aparecer mensagem verde, continue para o passo 5

### Passo 5: Verificar Tabelas Criadas
1. No menu à esquerda, clique em **"Tables"** ou **"Tabelas"**
2. Você deve ver 11 tabelas:
   - users
   - vendors
   - categories
   - products
   - orders
   - order_items
   - reviews
   - subscriptions
   - messages
   - notifications
   - blog_posts

✅ **SUCESSO!** Se vê as 11 tabelas, está tudo OK!

---

## 📋 OPÇÃO 2: Via Terminal SSH (se disponível)

```bash
# Conecte via SSH
ssh usuario@seudominio.com

# Navegue até o diretório
cd public_html/database

# Execute o script
psql -U usuario_banco -d nome_banco -f migrations.sql

# Verifique as tabelas
psql -U usuario_banco -d nome_banco -c "\dt"
```

---

## 🐛 SOLUÇÃO DE PROBLEMAS

### Erro: "Permission denied" ou "Access denied"
**Causa:** Usuário não tem privilégios suficientes

**Solução:**
1. Vá em cPanel > PostgreSQL Databases
2. Procure a seção **"Add User To Database"**
3. Selecione seu usuário e banco
4. Marque **ALL PRIVILEGES**
5. Clique em **"Add"** ou **"Adicionar"**
6. Tente executar o script novamente

---

### Erro: "Relation already exists" ou "Tabela já existe"
**Causa:** Tabelas já foram criadas antes

**Solução 1 - Usar o script com DROP:**
1. Use o arquivo `database/migrations.sql` (ele já tem DROP TABLE)
2. Execute normalmente

**Solução 2 - Deletar manualmente:**
1. No phpPgAdmin, vá em "Tables"
2. Para cada tabela, clique com botão direito > "Drop"
3. Execute o script novamente

---

### Erro: "Syntax error near..."
**Causa:** PostgreSQL pode ter versão diferente

**Solução - Use o script simplificado:**
1. Abra o arquivo `database/simple_migrations.sql`
2. Copie TODO o conteúdo
3. Execute no phpPgAdmin
4. Este arquivo tem sintaxe mais compatível

---

### Erro: "Cannot add foreign key constraint"
**Causa:** Ordem de criação das tabelas

**Solução:**
Execute as tabelas **UMA POR VEZ** nesta ordem:

```sql
-- 1. Users (primeiro)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Vendors (depois de users)
CREATE TABLE vendors (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    business_name VARCHAR(255) NOT NULL,
    description TEXT,
    subscription_tier VARCHAR(50) DEFAULT 'free',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Categories (independente)
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    parent_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Products (depois de vendors e categories)
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    vendor_id INTEGER NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    images TEXT,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Orders (depois de users e vendors)
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    vendor_id INTEGER NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    payment_method VARCHAR(50) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'pending',
    subtotal DECIMAL(10,2) NOT NULL,
    shipping DECIMAL(10,2) DEFAULT 0,
    total DECIMAL(10,2) NOT NULL,
    shipping_address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Order Items (depois de orders e products)
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Reviews (depois de users e products)
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Subscriptions (depois de vendors)
CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY,
    vendor_id INTEGER UNIQUE NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
    plan VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. Messages (depois de users)
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    receiver_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. Notifications (depois de users)
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    link VARCHAR(255),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 11. Blog Posts (depois de users)
CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    author_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image VARCHAR(255),
    status VARCHAR(50) DEFAULT 'draft',
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Execute cada `CREATE TABLE` separadamente, aguardando o sucesso antes de executar a próxima.

---

### Erro: Nenhuma tabela aparece
**Causa:** Script não foi executado ou deu erro silencioso

**Verificação:**
Execute este comando para listar tabelas:
```sql
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
```

Se retornar vazio, as tabelas realmente não foram criadas.

**Solução:**
1. Verifique se está no banco correto (menu à esquerda)
2. Use o script `simple_migrations.sql`
3. Execute UMA tabela por vez (código acima)

---

## ✅ VERIFICAÇÃO FINAL

Execute este SQL para confirmar:

```sql
-- Contar tabelas
SELECT COUNT(*) as total_tabelas 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Listar todas as tabelas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Verificar usuário admin
SELECT * FROM users WHERE role = 'admin';

-- Verificar categorias
SELECT COUNT(*) as total_categorias FROM categories;
```

**Resultado esperado:**
- `total_tabelas` = 11
- Lista com as 11 tabelas
- 1 usuário admin
- 8 categorias

---

## 📞 AINDA COM PROBLEMAS?

### Método Alternativo: SQL separado

Se NADA funcionar, execute cada arquivo separadamente:

1. `database/01_users.sql`
2. `database/02_vendors.sql`
3. `database/03_categories.sql`
... (vou criar estes arquivos)

---

## 🎯 DICA PRO

Após criar as tabelas com sucesso, execute:

```sql
-- Ver estrutura de uma tabela
\d users

-- Ver todas as foreign keys
SELECT
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY';
```

Isso mostra todas as relações entre tabelas.

---

**✅ BOA SORTE!** Se seguir este guia, as tabelas serão criadas com sucesso! 🚀

