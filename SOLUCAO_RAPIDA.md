# ⚡ SOLUÇÃO RÁPIDA - Erros Comuns no Instalador

## 🔴 ERRO: "invalid integer value for port"

**Problema:** O PostgreSQL não aceita o formato da porta no DSN.

**✅ SOLUÇÃO:** **USE MYSQL AO INVÉS DE POSTGRESQL**

MySQL é mais comum na Hostinger e evita esse tipo de erro.

---

## 📋 PASSO A PASSO DEFINITIVO:

### 1️⃣ ATIVAR MYSQL NO CPANEL
```
cPanel > Select PHP Version
PHP: 8.0 ou superior
Extensões (marque):
✅ pdo
✅ pdo_mysql
✅ json
✅ mbstring
✅ opcache
Salvar
```

---

### 2️⃣ CRIAR BANCO MYSQL
```
cPanel > MySQL Databases

Criar banco:
Nome: u123456789_macumba

Criar usuário:
Username: u123456789_user
Password: [gere senha forte]

Adicionar usuário ao banco:
Selecione usuário e banco
Marque: ALL PRIVILEGES
Adicionar
```

---

### 3️⃣ EXECUTAR MIGRATIONS MYSQL
```
cPanel > phpMyAdmin
Selecione o banco: u123456789_macumba
Clique em SQL
Cole TODO o conteúdo de: database/migrations_mysql.sql
Clique em: Go / Executar
```

**Verificar:** Deve aparecer 11 tabelas à esquerda.

---

### 4️⃣ EXECUTAR O INSTALADOR
```
Acesse: https://seudominio.com/install.php

Preencha:
URL do Site: https://seudominio.com
Tipo de Banco: MySQL ← IMPORTANTE!
Host: localhost
Porta: 3306
Nome do Banco: u123456789_macumba
Usuário: u123456789_user
Senha: [sua senha do passo 2]

Clique em: Instalar Agora
```

---

### 5️⃣ DELETAR ARQUIVOS DE INSTALAÇÃO
```
File Manager > public_html/
DELETE: install.php
DELETE: clear_cache.php
```

---

## ✅ RESULTADO ESPERADO:

```
✅ PHP 8.x OK
✅ Extensão pdo OK
✅ Extensão json OK
✅ Extensão mbstring OK
✅ Extensão pdo_mysql OK
✅ Pasta ./ com permissões OK
⚠️ Pasta vendor/ sem permissão de escrita (PODE IGNORAR)
✅ Arquivo .env criado
✅ Conexão com banco de dados OK (mysql)
✅ Tabelas já existem no banco

🎉 INSTALAÇÃO CONCLUÍDA!
```

---

## 🐛 SE AINDA DER ERRO:

### Erro: "Access denied for user"
**Causa:** Credenciais erradas

**Solução:**
1. Volte no cPanel > MySQL Databases
2. Verifique o nome exato do banco
3. Verifique o nome exato do usuário
4. Resete a senha do usuário
5. Tente novamente

---

### Erro: "Unknown database"
**Causa:** Banco não foi criado

**Solução:**
1. Vá em cPanel > MySQL Databases
2. Procure seu banco na lista "Current Databases"
3. Se não existir, crie novamente
4. Anote o nome EXATO (com o prefixo u123456789_)

---

### Erro: "Table 'users' doesn't exist"
**Causa:** Migrations não foram executadas

**Solução:**
1. phpMyAdmin > Selecione o banco
2. Clique em SQL
3. Cole o conteúdo de `database/migrations_mysql.sql`
4. Execute
5. Verifique se 11 tabelas aparecem à esquerda

---

### Aviso: "Pasta vendor/ sem permissão"
**Causa:** Permissões da pasta vendor

**Solução:** **PODE IGNORAR!** Este é apenas um aviso, não bloqueia a instalação.

Se quiser corrigir (opcional):
```
File Manager > vendor/
Clique direito > Permissions
Digite: 755
Marque: Recursively
Change Permissions
```

---

## 🎯 CONFIGURAÇÃO FINAL NO .ENV:

Após instalação bem-sucedida, seu `.env` deve ter:

```env
DB_DRIVER=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=u123456789_macumba
DB_USERNAME=u123456789_user
DB_PASSWORD=sua_senha_aqui

APP_ENV=production
APP_DEBUG=false
APP_URL=https://seudominio.com

SESSION_LIFETIME=120
SESSION_SECURE=true
```

---

## 🚀 TESTAR O SITE:

```
Homepage: https://seudominio.com
API Health: https://seudominio.com/api/health
Login: https://seudominio.com/login
Produtos: https://seudominio.com/produtos

Admin padrão:
Email: admin@shoppingdamacumba.com
Senha: admin123
```

**⚠️ MUDE A SENHA DO ADMIN IMEDIATAMENTE!**

---

## 📞 RESUMO DOS ARQUIVOS:

| Arquivo | Uso |
|---------|-----|
| `database/migrations_mysql.sql` | ✅ Use este para MySQL |
| `database/migrations.sql` | ❌ PostgreSQL (ignorar) |
| `ATIVAR_EXTENSOES_PHP.md` | Guia para ativar extensões |
| `install.php` | Instalador web (delete após uso) |

---

## ✅ CHECKLIST FINAL:

- [ ] MySQL ativado no cPanel (pdo_mysql)
- [ ] Banco MySQL criado
- [ ] Usuário MySQL criado e adicionado ao banco
- [ ] Migrations MySQL executadas (11 tabelas)
- [ ] Instalador executado com sucesso
- [ ] Arquivo .env criado
- [ ] Site acessível (homepage carrega)
- [ ] API health retorna OK
- [ ] install.php DELETADO
- [ ] Senha do admin alterada

---

**🎊 PRONTO! SEU SITE ESTÁ NO AR!** 🚀

Se seguir exatamente este guia, seu site vai funcionar 100%! 💪

