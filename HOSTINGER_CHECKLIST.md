# ✅ Checklist de Deploy na Hostinger

Use esta lista para garantir que tudo está configurado corretamente.

---

## 📋 PRÉ-DEPLOY (Antes de fazer upload)

- [ ] Projeto testado localmente
- [ ] Todas as dependências do Composer instaladas (`vendor/`)
- [ ] Arquivo `.gitignore` configurado (não enviar `.env`)
- [ ] Migrations SQL testadas
- [ ] Credenciais de banco de dados da Hostinger em mãos

---

## 🗄️ CONFIGURAÇÃO DO BANCO DE DADOS

- [ ] Banco de dados PostgreSQL criado no cPanel
- [ ] Usuário do banco criado
- [ ] Usuário adicionado ao banco com ALL PRIVILEGES
- [ ] Credenciais anotadas (host, port, database, username, password)
- [ ] Migrations SQL executadas em phpPgAdmin
- [ ] Todas as 11 tabelas criadas:
  - [ ] users
  - [ ] vendors
  - [ ] products
  - [ ] categories
  - [ ] orders
  - [ ] order_items
  - [ ] reviews
  - [ ] subscriptions
  - [ ] messages
  - [ ] notifications
  - [ ] blog_posts

---

## 📁 UPLOAD DOS ARQUIVOS

- [ ] Conectado ao cPanel File Manager ou FTP
- [ ] Pasta `public_html` limpa (arquivos padrão removidos)
- [ ] Todos os arquivos do projeto enviados para `public_html/`
- [ ] Estrutura de pastas preservada:
  - [ ] `/public/`
  - [ ] `/src/`
  - [ ] `/views/`
  - [ ] `/database/`
  - [ ] `/vendor/`
  - [ ] `composer.json`
  - [ ] `.htaccess` (raiz)
  - [ ] `public/.htaccess`

---

## ⚙️ CONFIGURAÇÃO DE ARQUIVOS

- [ ] `.htaccess` na raiz configurado com redirect para `/public/`
- [ ] `public/.htaccess` configurado com rewrite rules
- [ ] Arquivo `.env` criado manualmente (NÃO fazer upload do local)
- [ ] `.env` configurado com:
  - [ ] DB_HOST (geralmente `localhost`)
  - [ ] DB_PORT (geralmente `5432` para PostgreSQL)
  - [ ] DB_DATABASE
  - [ ] DB_USERNAME
  - [ ] DB_PASSWORD
  - [ ] APP_URL (seu domínio completo com https://)
  - [ ] APP_ENV=production
  - [ ] APP_DEBUG=false

---

## 🔐 PERMISSÕES DE ARQUIVOS

- [ ] Permissões de pastas: `755` (rwxr-xr-x)
- [ ] Permissões de arquivos: `644` (rw-r--r--)
- [ ] Arquivo `.env`: `600` (rw-------)
- [ ] Pasta `vendor/`: `755`

Como configurar:
```bash
# Via SSH (se disponível)
find . -type d -exec chmod 755 {} \;
find . -type f -exec chmod 644 {} \;
chmod 600 .env
```

Ou via File Manager:
- Clique com botão direito > Change Permissions
- Defina os valores numéricos

---

## 🎯 EXTENSÕES PHP

Verifique se estão ativadas (cPanel > Select PHP Version):

- [ ] ✅ pdo
- [ ] ✅ pdo_pgsql (ou pdo_mysql se usar MySQL)
- [ ] ✅ mbstring
- [ ] ✅ json
- [ ] ✅ opcache (opcional, mas recomendado)
- [ ] ✅ openssl

---

## 🚀 INSTALAÇÃO AUTOMÁTICA

- [ ] Acesse: `https://seudominio.com/install.php`
- [ ] Preencha o formulário com as credenciais do banco
- [ ] Verifique se todos os checks passaram (✅)
- [ ] **DELETE** o arquivo `install.php` após instalação bem-sucedida

---

## 🔒 SSL/HTTPS

- [ ] SSL Let's Encrypt instalado (cPanel > SSL/TLS Status)
- [ ] Certificado ativo e válido
- [ ] HTTPS forçado no `.htaccess`
- [ ] Site acessível via `https://`
- [ ] Redirecionamento HTTP → HTTPS funcionando

---

## ✅ TESTES FUNCIONAIS

### Acesso ao Site
- [ ] Homepage carrega: `https://seudominio.com`
- [ ] Sem erro 500 ou página em branco
- [ ] CSS/JS carregando corretamente
- [ ] Header e footer exibindo

### API de Saúde
- [ ] `/api/health` retorna JSON: `{"status":"ok","timestamp":"..."}`

### Autenticação
- [ ] Página de registro: `/register`
- [ ] Criar novo usuário funciona
- [ ] Página de login: `/login`
- [ ] Login com credenciais válidas funciona
- [ ] Logout funciona

### Produtos
- [ ] Listagem de produtos: `/produtos`
- [ ] Produtos exibindo (ou mensagem "Nenhum produto" se vazio)
- [ ] Detalhes do produto: `/produto/{id}` (teste com um ID válido)

### Carrinho
- [ ] Página do carrinho: `/carrinho`
- [ ] Adicionar produto ao carrinho (via API ou botão)

### Dashboard
- [ ] Dashboard do usuário: `/dashboard` (requer login)
- [ ] Dashboard do vendedor: `/vendedor/dashboard` (se usuário for vendor)

---

## 🐛 VERIFICAÇÃO DE ERROS

- [ ] Logs de erro vazios (cPanel > Metrics > Errors)
- [ ] Sem warnings ou notices no PHP
- [ ] Sem erros 404 em assets (CSS/JS/imagens)
- [ ] Sem erros de conexão com banco

---

## 📧 CONFIGURAÇÃO DE EMAIL (Opcional)

Se for enviar emails:

- [ ] Email criado no cPanel (ex: contato@seudominio.com)
- [ ] SMTP configurado no `.env`:
  - [ ] MAIL_HOST=smtp.hostinger.com
  - [ ] MAIL_PORT=587
  - [ ] MAIL_USERNAME
  - [ ] MAIL_PASSWORD
  - [ ] MAIL_ENCRYPTION=tls
- [ ] PHPMailer instalado (`composer require phpmailer/phpmailer`)

---

## 🚀 OTIMIZAÇÕES

- [ ] OPCache ativado (cPanel > Select PHP Version)
- [ ] Gzip compression ativado (`.htaccess`)
- [ ] Browser caching configurado (`.htaccess`)
- [ ] PHP memory_limit adequado (recomendado: 256M)

---

## 🔄 BACKUP

- [ ] Backup do banco de dados criado (phpPgAdmin > Export)
- [ ] Backup dos arquivos criado (cPanel > Backup)
- [ ] Backups automáticos configurados (se disponível no plano)

---

## 📊 MONITORAMENTO

- [ ] Google Analytics instalado (opcional)
- [ ] Logs de acesso monitorados (cPanel > Raw Access)
- [ ] Logs de erro monitorados (cPanel > Errors)

---

## 🎉 DEPLOY COMPLETO

- [ ] Site acessível publicamente
- [ ] Todas as páginas funcionando
- [ ] Sem erros nos logs
- [ ] SSL ativo e válido
- [ ] Banco de dados populado (ou pronto para receber dados)
- [ ] Email de teste enviado (se configurado)
- [ ] Performance satisfatória

---

## 📞 EM CASO DE PROBLEMAS

1. ✅ Verifique os logs de erro (cPanel > Metrics > Errors)
2. ✅ Ative temporariamente o debug no `.env`: `APP_DEBUG=true`
3. ✅ Verifique se as extensões PHP estão ativas
4. ✅ Teste a conexão com o banco em phpPgAdmin
5. ✅ Verifique permissões de arquivos e pastas
6. ✅ Consulte o `HOSTINGER_DEPLOY_GUIDE.md`
7. ✅ Contate o suporte da Hostinger se necessário

---

## 🎯 COMANDOS ÚTEIS (Se tiver SSH)

```bash
# Navegar até o diretório
cd public_html

# Verificar PHP version
php -v

# Instalar dependências
composer install --no-dev --optimize-autoloader

# Verificar permissões
ls -la

# Ver logs de erro em tempo real
tail -f logs/error.log

# Limpar cache do OPCache (criar arquivo clear_cache.php)
# Acesse: https://seudominio.com/clear_cache.php
```

---

**✅ PARABÉNS! SEU SITE ESTÁ NO AR!** 🚀🕯️

Próximos passos:
1. Adicionar produtos via dashboard
2. Configurar gateways de pagamento
3. Testar fluxo completo de compra
4. Divulgar seu marketplace!

