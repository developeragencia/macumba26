# 🚀 INSTRUÇÕES DE DEPLOY - SHOPPING DA MACUMBA

## 📦 O QUE VOCÊ TEM AGORA

✅ **Projeto PHP completo** pronto para Hostinger
✅ **Design idêntico ao Mercado Livre** (cores vermelho, branco e preto)
✅ **Instalação automatizada** via script web
✅ **Documentação completa** em português

---

## 🎯 3 FORMAS DE FAZER DEPLOY

### 🥇 OPÇÃO 1: INSTALAÇÃO AUTOMÁTICA (Mais Fácil)

1. **Baixe o arquivo**: `shopping-macumba-hostinger.zip`
2. **Faça upload** para Hostinger:
   - Acesse cPanel > File Manager
   - Vá para `public_html/`
   - Delete tudo
   - Clique em Upload
   - Envie o ZIP
   - Clique com botão direito no ZIP > Extract
3. **Crie o banco de dados**:
   - cPanel > PostgreSQL Databases
   - Crie: `u123456789_macumba` (use seu ID)
   - Crie usuário e adicione ao banco
4. **Execute o instalador**:
   - Acesse: `https://seudominio.com/install.php`
   - Preencha o formulário
   - Clique em "Instalar Agora"
5. **Limpe arquivos de instalação**:
   - Delete `install.php`
   - Delete `clear_cache.php`

✅ **PRONTO!** Acesse `https://seudominio.com`

---

### 🥈 OPÇÃO 2: VIA FTP (FileZilla)

1. **Configure FileZilla**:
   - Host: `ftp.seudominio.com`
   - Username: seu usuário cPanel
   - Password: sua senha cPanel
   - Port: 21

2. **Faça upload dos arquivos**:
   - Conecte no FTP
   - Vá para `/public_html/`
   - Delete tudo
   - Arraste TODOS os arquivos do projeto

3. **Siga os passos 3-5 da Opção 1**

---

### 🥉 OPÇÃO 3: VIA GIT (SSH - Planos Premium)

Se você tem acesso SSH na Hostinger:

```bash
# Conecte via SSH
ssh u123456789@seudominio.com

# Navegue até public_html
cd public_html

# Clone o repositório
git clone https://github.com/developeragencia/macumba26.git .

# Instale dependências
composer install --no-dev --optimize-autoloader

# Configure permissões
find . -type d -exec chmod 755 {} \;
find . -type f -exec chmod 644 {} \;

# Crie o .env
cp env.example .env
nano .env  # Configure suas credenciais
```

---

## 📚 DOCUMENTAÇÃO DISPONÍVEL

1. **README_HOSTINGER.md** - Guia rápido (LEIA PRIMEIRO)
2. **HOSTINGER_DEPLOY_GUIDE.md** - Guia completo passo a passo
3. **HOSTINGER_CHECKLIST.md** - Checklist de verificação
4. **README.md** - Documentação técnica do projeto

---

## 🗄️ CONFIGURAÇÃO DO BANCO DE DADOS

### Criar Banco (cPanel)

1. cPanel > **PostgreSQL Databases**
2. Criar banco de dados:
   - Nome: `u123456789_macumba`
3. Criar usuário:
   - Username: `u123456789_admin`
   - Password: (gere uma senha forte)
4. Adicionar usuário ao banco:
   - Selecione usuário e banco
   - Marque **ALL PRIVILEGES**

### Executar Migrations

**Opção A: Via Instalador Automático**
- O script `install.php` já faz isso

**Opção B: Manual**
1. cPanel > **phpPgAdmin**
2. Selecione seu banco
3. Clique em **SQL**
4. Cole TODO o conteúdo de `database/migrations.sql`
5. Clique em **Execute**

---

## ⚙️ CONFIGURAÇÃO DO .ENV

Se criar manualmente (ou via instalador):

```env
# Database (obtenha no cPanel)
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=u123456789_macumba
DB_USERNAME=u123456789_admin
DB_PASSWORD=sua_senha_super_segura

# Application
APP_ENV=production
APP_DEBUG=false
APP_URL=https://seudominio.com

# Session
SESSION_LIFETIME=120
SESSION_SECURE=true

# Security (gere uma chave aleatória)
JWT_SECRET=SuaChaveSecretaAleatoria32Chars
```

**IMPORTANTE**: 
- Arquivo `.env` deve ter permissão `600`
- NUNCA compartilhe seu `.env` publicamente

---

## 🔒 SSL/HTTPS (Certificado Grátis)

1. cPanel > **SSL/TLS Status**
2. Clique em **Run AutoSSL**
3. Aguarde 1-5 minutos
4. Verifique: https://seudominio.com

O `.htaccess` já força redirecionamento HTTP → HTTPS

---

## ✅ TESTAR APÓS DEPLOY

### Testes Básicos

- [ ] Homepage carrega: `https://seudominio.com`
- [ ] API Health: `https://seudominio.com/api/health`
- [ ] Página de login: `https://seudominio.com/login`
- [ ] Página de produtos: `https://seudominio.com/produtos`
- [ ] Criar usuário funciona
- [ ] Login funciona

### Verificar Logs

cPanel > **Metrics > Errors**
- Deve estar vazio ou sem erros críticos

---

## 🐛 PROBLEMAS COMUNS E SOLUÇÕES

### ❌ Erro 500 - Internal Server Error

**Causas Possíveis:**
1. `.htaccess` mal configurado
2. Permissões incorretas
3. PHP < 8.0

**Soluções:**
```bash
# Via File Manager, defina:
# Pastas: 755
# Arquivos: 644
# .env: 600

# Via SSH:
find . -type d -exec chmod 755 {} \;
find . -type f -exec chmod 644 {} \;
chmod 600 .env
```

### ❌ Página em Branco

**Causa:** Erro fatal no PHP sem display

**Solução:**
1. cPanel > **Select PHP Version**
2. Ative PHP 8.0 ou superior
3. Ative extensões:
   - ✅ pdo
   - ✅ pdo_pgsql
   - ✅ json
   - ✅ mbstring
   - ✅ opcache

### ❌ Erro de Conexão com Banco

**Verificações:**
1. Confirme credenciais no `.env`
2. Teste no phpPgAdmin
3. Verifique se usuário tem privilégios
4. Confirme que `DB_HOST=localhost`

### ❌ CSS/JS Não Carrega (404)

**Solução:**
Verifique se `public/.htaccess` contém:
```apache
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
```

---

## 📧 CONFIGURAR EMAIL (Opcional)

### Criar Email no cPanel

1. cPanel > **Email Accounts**
2. Criar: `contato@seudominio.com`
3. Anote a senha

### Configurar no .env

```env
MAIL_HOST=smtp.hostinger.com
MAIL_PORT=587
MAIL_USERNAME=contato@seudominio.com
MAIL_PASSWORD=senha_do_email
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=contato@seudominio.com
MAIL_FROM_NAME="Shopping da Macumba"
```

---

## 🚀 OTIMIZAÇÕES PÓS-DEPLOY

### 1. Ativar OPCache

cPanel > **Select PHP Version** > Extensions
- ✅ Marque `opcache`

### 2. Configurar Backups

cPanel > **Backup**
- Configure backups automáticos (diários/semanais)

### 3. Monitorar Logs

Verifique regularmente:
- cPanel > Metrics > **Errors**
- cPanel > Metrics > **Raw Access**

---

## 📊 ESTRUTURA FINAL NO SERVIDOR

```
public_html/
├── public/              ← Document root (público)
│   ├── index.php       ← Entry point
│   └── .htaccess       ← Rewrite rules
├── src/                 ← Código PHP (privado)
│   ├── Core/
│   ├── Controllers/
│   └── Models/
├── views/               ← Templates (privado)
├── database/            ← Migrations (privado)
├── vendor/              ← Dependências (privado)
├── .env                 ← Credenciais (PRIVADO - permissão 600)
├── .htaccess            ← Config Apache raiz
└── composer.json        ← Dependências
```

---

## 🎯 ARQUIVOS QUE VOCÊ PODE DELETAR APÓS DEPLOY

Após instalação bem-sucedida, delete por segurança:

- ❌ `install.php`
- ❌ `clear_cache.php`
- ❌ `README.md` (opcional)
- ❌ `HOSTINGER_*.md` (opcional)
- ❌ `.git/` (se fez upload via Git)

**NUNCA DELETE:**
- ✅ `.env`
- ✅ `.htaccess`
- ✅ `public/.htaccess`
- ✅ `vendor/`
- ✅ `src/`, `views/`, `database/`

---

## 📞 SUPORTE

### Documentação
- **GitHub**: https://github.com/developeragencia/macumba26
- **Issues**: Reporte bugs na página de Issues

### Hostinger
- **Suporte**: https://support.hostinger.com/pt-br/
- **Base de Conhecimento**: https://support.hostinger.com/pt-br/collections

### Comunidade
- Fóruns da Hostinger
- Stack Overflow (tag: php, postgresql)

---

## 🎉 CHECKLIST FINAL

Antes de considerar o deploy completo:

- [ ] Arquivos enviados para `public_html/`
- [ ] Banco de dados criado e configurado
- [ ] Migrations executadas (11 tabelas criadas)
- [ ] Arquivo `.env` criado e configurado
- [ ] Permissões corretas (755/644/600)
- [ ] SSL/HTTPS ativo e funcionando
- [ ] Homepage carrega sem erros
- [ ] API de saúde retorna OK
- [ ] Login/Registro funcionando
- [ ] Sem erros nos logs do cPanel
- [ ] Arquivos de instalação deletados

---

## 🏆 PRÓXIMOS PASSOS

Após deploy bem-sucedido:

1. **Adicionar Produtos**:
   - Faça login como admin
   - Acesse dashboard do vendedor
   - Cadastre produtos

2. **Configurar Pagamentos**:
   - Stripe: Obtenha API keys
   - Mercado Pago: Crie conta vendedor
   - PIX: Configure chave

3. **Personalizar**:
   - Logo do site
   - Cores (se necessário)
   - Textos e descrições

4. **Marketing**:
   - Google Analytics
   - SEO (meta tags)
   - Redes sociais

---

## 📈 MÉTRICAS DE SUCESSO

Seu deploy está OK quando:

✅ Site acessível 24/7
✅ Tempo de resposta < 2s
✅ SSL válido (cadeado verde)
✅ Sem erros 500 ou 404
✅ Banco de dados respondendo
✅ Formulários funcionando
✅ Emails sendo enviados (se configurado)

---

# 🎊 PARABÉNS!

Você completou o deploy do **Shopping da Macumba** na Hostinger!

Seu marketplace de produtos espirituais está ONLINE! 🕯️✨

**Boas vendas!** 🚀

---

*Desenvolvido por Developer Agencia*
*GitHub: https://github.com/developeragencia/macumba26*

