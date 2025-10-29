# 🚀 Guia Completo de Deploy na Hostinger

## 📋 Pré-requisitos

1. Conta na Hostinger com plano Business ou superior (suporta PostgreSQL/MySQL)
2. Acesso ao cPanel
3. Domínio configurado (ex: shoppingdamacumba.com)
4. Banco de dados PostgreSQL ou MySQL criado

---

## 🗄️ PASSO 1: Configurar Banco de Dados

### Opção A: PostgreSQL (Recomendado)

1. Acesse **cPanel > Databases > PostgreSQL Databases**
2. Crie um novo banco:
   - Nome: `u123456789_macumba` (substitua pelo seu)
3. Crie um usuário:
   - Username: `u123456789_admin`
   - Password: Use uma senha forte
4. Adicione o usuário ao banco com **ALL PRIVILEGES**
5. Anote as credenciais

### Opção B: MySQL (Alternativa)

1. Acesse **cPanel > Databases > MySQL Databases**
2. Siga o mesmo processo acima
3. **IMPORTANTE**: Se usar MySQL, você precisa converter as migrations de PostgreSQL para MySQL

---

## 📁 PASSO 2: Upload dos Arquivos

### Via File Manager (cPanel)

1. Acesse **cPanel > File Manager**
2. Navegue até `public_html`
3. **DELETE** todos os arquivos padrão (index.html, cgi-bin, etc.)
4. Faça upload de **TODOS** os arquivos do projeto:
   ```
   ├── public/          → Vai para public_html/
   ├── src/             → Vai para public_html/src/
   ├── views/           → Vai para public_html/views/
   ├── database/        → Vai para public_html/database/
   ├── vendor/          → Vai para public_html/vendor/
   ├── composer.json    → Vai para public_html/
   ├── .htaccess        → Vai para public_html/
   └── .env             → Crie manualmente (não faça upload)
   ```

### Via FTP (FileZilla)

1. Configure FileZilla:
   - Host: `ftp.seudominio.com`
   - Username: Seu usuário cPanel
   - Password: Sua senha cPanel
   - Port: 21
2. Conecte e faça upload de todos os arquivos para `public_html/`

---

## ⚙️ PASSO 3: Configurar .htaccess

### 3.1 - Criar .htaccess na RAIZ (public_html/)

A Hostinger já deve ter um `.htaccess`, mas você precisa **SUBSTITUIR** com este conteúdo:

```apache
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Redirect all requests to public directory
RewriteCond %{REQUEST_URI} !^/public/
RewriteRule ^(.*)$ public/$1 [L]
```

### 3.2 - Verificar .htaccess em public/

O arquivo `public/.htaccess` já está criado. Verifique se contém:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)$ index.php/$1 [L]
</IfModule>
```

---

## 🔐 PASSO 4: Criar arquivo .env

1. No File Manager, vá até `public_html/`
2. Clique em **+ File** e crie `.env`
3. Clique com botão direito > **Edit**
4. Cole o conteúdo do `env.example` e **MODIFIQUE** com seus dados reais:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=u123456789_macumba
DB_USERNAME=u123456789_admin
DB_PASSWORD=SUA_SENHA_REAL_AQUI

# Application
APP_ENV=production
APP_DEBUG=false
APP_URL=https://shoppingdamacumba.com

# Session
SESSION_LIFETIME=120
SESSION_SECURE=true

# Security
JWT_SECRET=GERE_UMA_CHAVE_ALEATORIA_AQUI_32_CARACTERES

# Payment Gateways (configure depois)
STRIPE_SECRET_KEY=
MERCADOPAGO_ACCESS_TOKEN=
PAYPAL_CLIENT_ID=

# Email (SMTP Hostinger)
MAIL_HOST=smtp.hostinger.com
MAIL_PORT=587
MAIL_USERNAME=contato@shoppingdamacumba.com
MAIL_PASSWORD=sua_senha_email
MAIL_ENCRYPTION=tls
```

**IMPORTANTE**: 
- Gere uma chave JWT segura em: https://randomkeygen.com/
- Configure o email usando um email criado no cPanel

---

## 🗃️ PASSO 5: Executar Migrations no Banco

### Via phpPgAdmin (PostgreSQL) ou phpMyAdmin (MySQL)

1. Acesse **cPanel > Databases > phpPgAdmin** (ou phpMyAdmin)
2. Selecione seu banco de dados
3. Vá em **SQL** (aba superior)
4. Cole **TODO** o conteúdo do arquivo `database/migrations.sql`
5. Clique em **Execute** ou **Go**
6. Verifique se todas as tabelas foram criadas:
   - users
   - vendors
   - products
   - categories
   - orders
   - order_items
   - reviews
   - subscriptions
   - messages
   - notifications
   - blog_posts

---

## 🎯 PASSO 6: Instalar Dependências via Terminal SSH

### Se você tem acesso SSH na Hostinger:

1. Conecte via SSH:
   ```bash
   ssh u123456789@yourdomain.com
   ```

2. Navegue até o diretório:
   ```bash
   cd public_html
   ```

3. Instale as dependências do Composer:
   ```bash
   composer install --no-dev --optimize-autoloader
   ```

### Se NÃO tem acesso SSH:

**Opção A**: Faça upload da pasta `vendor/` completa que já foi gerada localmente

**Opção B**: Use o **Terminal** do cPanel (se disponível):
- cPanel > Advanced > Terminal
- Execute os comandos acima

---

## 🔒 PASSO 7: Configurar Permissões

No File Manager (ou via FTP):

1. Clique com botão direito na pasta `public_html`
2. **Change Permissions**
3. Defina:
   - Pastas: `755` (rwxr-xr-x)
   - Arquivos: `644` (rw-r--r--)

**IMPORTANTE**: O arquivo `.env` deve ter permissão `600` (rw-------) para segurança:
```bash
chmod 600 .env
```

---

## ✅ PASSO 8: Testar a Aplicação

1. Acesse: `https://seudominio.com`
2. Teste o endpoint de saúde: `https://seudominio.com/api/health`
   - Deve retornar: `{"status":"ok","timestamp":"..."}`
3. Teste o login: `https://seudominio.com/login`
4. Teste o registro: `https://seudominio.com/register`
5. Teste a listagem de produtos: `https://seudominio.com/produtos`

---

## 🐛 Solução de Problemas Comuns

### Erro 500 - Internal Server Error

**Causa 1**: Arquivo `.htaccess` mal configurado
- Verifique se ambos `.htaccess` (raiz e public/) estão corretos

**Causa 2**: Permissões incorretas
- Verifique as permissões das pastas e arquivos

**Causa 3**: Erro no PHP
- Ative o display de erros temporariamente em `src/Core/Database.php`:
  ```php
  ini_set('display_errors', 1);
  error_reporting(E_ALL);
  ```
- Ou verifique os logs em: cPanel > Metrics > Errors

### Erro de Conexão com Banco de Dados

**Verificações**:
1. Confirme que o `.env` tem as credenciais corretas
2. Teste a conexão no phpPgAdmin/phpMyAdmin
3. Verifique se o usuário tem permissões no banco
4. Confirme que o host é `localhost` (geralmente é na Hostinger)

### Página em Branco

**Causa**: Erro fatal no PHP sem display
- Verifique os logs de erro do Apache
- Ative o display de erros no `public/index.php`:
  ```php
  ini_set('display_errors', 1);
  error_reporting(E_ALL);
  ```

### CSS/JS Não Carrega (404)

**Causa**: Caminho incorreto ou mod_rewrite
- Verifique se o `.htaccess` em `public/` permite arquivos estáticos
- Adicione ao `.htaccess` em `public/`:
  ```apache
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  ```

### Erro "Class not found"

**Causa**: Autoloader do Composer não foi executado
- Execute `composer dump-autoload --optimize` via SSH
- Ou faça upload da pasta `vendor/` completa

---

## 📧 PASSO 9: Configurar Email (Hostinger SMTP)

1. Crie um email no cPanel:
   - cPanel > Email > Email Accounts
   - Crie: `contato@shoppingdamacumba.com`

2. Configure no `.env`:
   ```env
   MAIL_HOST=smtp.hostinger.com
   MAIL_PORT=587
   MAIL_USERNAME=contato@shoppingdamacumba.com
   MAIL_PASSWORD=senha_do_email
   MAIL_ENCRYPTION=tls
   ```

3. Para enviar emails, você precisará adicionar PHPMailer:
   ```bash
   composer require phpmailer/phpmailer
   ```

---

## 🔐 PASSO 10: Configurar SSL/HTTPS

A Hostinger oferece SSL grátis (Let's Encrypt):

1. Acesse **cPanel > Security > SSL/TLS Status**
2. Clique em **Run AutoSSL**
3. Aguarde a instalação (1-5 minutos)
4. Verifique se o certificado está ativo
5. Force HTTPS no `.htaccess` (já configurado no guia)

---

## 🚀 PASSO 11: Otimizações de Produção

### 11.1 - Habilitar OPCache (PHP)

1. cPanel > Select PHP Version
2. Ative as extensões:
   - ✅ opcache
   - ✅ pdo_pgsql (ou pdo_mysql)
   - ✅ mbstring
   - ✅ json

### 11.2 - Configurar Caching

No `.htaccess` raiz, adicione:

```apache
# Browser Caching
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### 11.3 - Habilitar Gzip Compression

```apache
# Gzip Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript
</IfModule>
```

---

## 📊 PASSO 12: Monitoramento

### Logs de Erro

Verifique regularmente:
- cPanel > Metrics > Errors
- cPanel > Metrics > Raw Access

### Backup Automático

Configure backups no cPanel:
- cPanel > Files > Backup
- Configure backups diários/semanais

---

## 🎉 CHECKLIST FINAL

Antes de considerar o deploy completo:

- [ ] Banco de dados criado e migrations executadas
- [ ] Todos os arquivos enviados via FTP/File Manager
- [ ] `.htaccess` configurado (raiz e public/)
- [ ] `.env` criado com credenciais corretas
- [ ] Dependências do Composer instaladas (`vendor/`)
- [ ] Permissões de arquivos corretas (755/644)
- [ ] SSL instalado e HTTPS forçado
- [ ] Email SMTP configurado
- [ ] Homepage carrega: `https://seudominio.com`
- [ ] API de saúde funciona: `/api/health`
- [ ] Login/Registro funcionando
- [ ] Produtos listando corretamente
- [ ] Sem erros nos logs

---

## 📞 Suporte

Se encontrar problemas:

1. Verifique os **logs de erro** no cPanel
2. Consulte a documentação da Hostinger: https://support.hostinger.com
3. Ative o modo debug temporariamente no `.env`:
   ```env
   APP_DEBUG=true
   ```
4. Verifique o status do PHP: cPanel > Select PHP Version

---

## 🔄 Atualizações Futuras

Para atualizar o site após mudanças:

1. Faça as alterações localmente
2. Commit e push para o GitHub
3. Faça download do ZIP do repositório
4. Extraia e faça upload apenas dos arquivos modificados via FTP
5. Se houver mudanças no banco, execute as migrations manualmente

---

**BOA SORTE COM SEU DEPLOY! 🚀🕯️**

Para qualquer dúvida sobre a Hostinger, consulte: https://support.hostinger.com/pt-br/

