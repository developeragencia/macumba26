# 🕯️ Shopping da Macumba - Deploy na Hostinger

## 🚀 INSTALAÇÃO RÁPIDA (3 Passos)

### 1️⃣ Criar Banco de Dados
1. Acesse cPanel > **PostgreSQL Databases**
2. Crie banco: `u123456789_macumba`
3. Crie usuário e adicione ao banco

### 2️⃣ Fazer Upload
1. Acesse cPanel > **File Manager**
2. Vá em `public_html/`
3. **DELETE** tudo que está lá
4. Faça **upload** de todos os arquivos do projeto

### 3️⃣ Instalar
1. Acesse: `https://seudominio.com/install.php`
2. Preencha formulário com dados do banco
3. Clique em **Instalar Agora**
4. **DELETE** o arquivo `install.php`

---

## ✅ Pronto!

Acesse: `https://seudominio.com`

---

## 📁 Estrutura de Upload

Todos os arquivos vão para `public_html/`:

```
public_html/
├── public/          ← Arquivos públicos
│   ├── index.php
│   └── .htaccess
├── src/             ← Código PHP
├── views/           ← Templates
├── database/        ← Migrations SQL
├── vendor/          ← Dependências
├── composer.json
├── .htaccess       ← Configuração Apache
└── install.php     ← Script de instalação
```

---

## 🗄️ Executar Migrations (Banco de Dados)

Se o install.php avisar que falta as tabelas:

1. Acesse cPanel > **phpPgAdmin**
2. Selecione seu banco
3. Clique em **SQL**
4. Cole **TODO** o conteúdo de `database/migrations.sql`
5. Clique em **Execute**

---

## ⚙️ Configuração Manual (.env)

Se preferir criar o `.env` manualmente:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=u123456789_macumba
DB_USERNAME=u123456789_admin
DB_PASSWORD=sua_senha

# Application
APP_ENV=production
APP_DEBUG=false
APP_URL=https://seudominio.com
```

Salve em: `public_html/.env`

---

## 🔒 SSL/HTTPS

1. cPanel > **SSL/TLS Status**
2. Clique em **Run AutoSSL**
3. Aguarde 1-5 minutos

---

## 🐛 Problemas Comuns

### Erro 500
- Verifique permissões: Pastas `755`, Arquivos `644`
- Verifique se `.htaccess` existe na raiz

### Página em Branco
- Ative PHP 8.0+ em: cPanel > **Select PHP Version**
- Ative extensões: `pdo`, `pdo_pgsql`, `json`, `mbstring`

### Erro de Banco
- Confirme credenciais no `.env`
- Teste conexão no phpPgAdmin

---

## 📧 Email (SMTP Hostinger)

1. Crie email no cPanel
2. Adicione no `.env`:
```env
MAIL_HOST=smtp.hostinger.com
MAIL_PORT=587
MAIL_USERNAME=contato@seudominio.com
MAIL_PASSWORD=senha_do_email
MAIL_ENCRYPTION=tls
```

---

## 📚 Documentação Completa

Para guia detalhado, consulte: `HOSTINGER_DEPLOY_GUIDE.md`

Para checklist completo: `HOSTINGER_CHECKLIST.md`

---

## 🆘 Suporte

- Hostinger: https://support.hostinger.com/pt-br/
- GitHub: https://github.com/developeragencia/macumba26

---

**✅ BOA SORTE COM SEU MARKETPLACE!** 🕯️✨

