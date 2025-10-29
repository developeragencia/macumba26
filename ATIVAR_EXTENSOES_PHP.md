# 🔧 Como Ativar Extensões PHP na Hostinger

## ❌ ERRO: "Extensão PHP necessária não encontrada: pdo_pgsql"

Este erro significa que o PHP não tem o driver PostgreSQL ativado.

---

## 📋 SOLUÇÃO RÁPIDA (3 Passos)

### 1️⃣ Acessar o Seletor de PHP
1. Entre no **cPanel**
2. Procure por **"Select PHP Version"** ou **"Selecionar versão PHP"**
3. Clique para abrir

### 2️⃣ Selecionar PHP 8.0 ou superior
1. No topo da página, selecione **PHP 8.0** ou **PHP 8.1** ou **PHP 8.2**
2. Clique em **"Set as current"** ou **"Definir como atual"**

### 3️⃣ Ativar Extensões Necessárias
Role para baixo até a seção **"Extensions"** e marque:

✅ **OBRIGATÓRIAS:**
- [x] **pdo** (PHP Data Objects)
- [x] **json** (JSON functions)
- [x] **mbstring** (Multibyte String)

✅ **BANCO DE DADOS (marque UMA ou AMBAS):**
- [x] **pdo_pgsql** (PostgreSQL - RECOMENDADO)
- [x] **pdo_mysql** (MySQL - alternativa)

✅ **RECOMENDADAS (para melhor performance):**
- [x] **opcache** (Cache de bytecode)
- [x] **zip** (Compressão de arquivos)
- [x] **curl** (Requisições HTTP)
- [x] **openssl** (Criptografia)

4. Clique em **"Save"** ou **"Salvar"**

---

## 🗄️ ESCOLHER BANCO DE DADOS

### Opção A: PostgreSQL (Recomendado)
- ✅ Ative a extensão **`pdo_pgsql`**
- ✅ Use os scripts em `database/migrations.sql`
- ✅ Mais recursos e melhor performance

### Opção B: MySQL (Alternativa)
- ✅ Ative a extensão **`pdo_mysql`**
- ✅ Vou criar scripts MySQL para você
- ✅ Mais comum na Hostinger

---

## 🔍 VERIFICAR SE FUNCIONOU

### Via cPanel:
1. Volte para **Select PHP Version**
2. Verifique se as extensões marcadas estão com ✅ verde

### Via PHP:
Crie um arquivo `test.php` com:

```php
<?php
phpinfo();
```

Acesse: `https://seudominio.com/test.php`

Procure por:
- ✅ **PDO** (deve estar presente)
- ✅ **pdo_pgsql** ou **pdo_mysql** (na seção PDO drivers)

**⚠️ DELETE o arquivo test.php após verificar!**

---

## 🐛 PROBLEMA: "Extensão não disponível"

Se a extensão **pdo_pgsql** não aparecer na lista:

### Solução 1: Use MySQL ao invés de PostgreSQL
A Hostinger geralmente tem MySQL pré-instalado:

1. Ative **pdo_mysql** no Select PHP Version
2. Crie banco MySQL (não PostgreSQL):
   - cPanel > **MySQL Databases**
   - Crie banco e usuário
3. No `.env`, altere:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_DATABASE=seu_banco_mysql
   ```
4. Execute as migrations MySQL (vou criar para você)

### Solução 2: Contate o Suporte Hostinger
Alguns planos não incluem PostgreSQL:
- Abra ticket pedindo para ativar PostgreSQL
- Ou faça upgrade para plano com suporte PostgreSQL

---

## 📝 PERMISSÕES DE PASTA

### Erro: "Pasta vendor/ não tem permissão de escrita"

**Via cPanel File Manager:**
1. Vá em **File Manager**
2. Navegue até `public_html/vendor`
3. Clique com botão direito > **Permissions** ou **Change Permissions**
4. Defina: **755** (rwxr-xr-x)
5. Marque: **Recursively** ou **Recursivamente**
6. Clique em **Change Permissions**

**Via SSH (se disponível):**
```bash
cd public_html
chmod -R 755 vendor
chmod 644 .env
```

---

## ✅ CHECKLIST COMPLETO

Antes de executar o instalador novamente:

- [ ] PHP 8.0+ selecionado no cPanel
- [ ] Extensão **pdo** ativada
- [ ] Extensão **json** ativada
- [ ] Extensão **mbstring** ativada
- [ ] Extensão **pdo_pgsql** OU **pdo_mysql** ativada
- [ ] Extensão **opcache** ativada (opcional)
- [ ] Permissões da pasta raiz: 755
- [ ] Permissões da pasta vendor: 755
- [ ] Arquivo .env: 644 ou 600

---

## 🚀 APÓS ATIVAR AS EXTENSÕES

1. **Acesse o instalador novamente:**
   ```
   https://seudominio.com/install.php
   ```

2. **Preencha o formulário:**
   - URL do site
   - Host do banco (localhost)
   - Porta (5432 para PostgreSQL, 3306 para MySQL)
   - Nome do banco
   - Usuário
   - Senha

3. **Clique em "Instalar Agora"**

4. **Se tudo OK:**
   - Você verá: "🎉 INSTALAÇÃO CONCLUÍDA!"
   - DELETE o arquivo `install.php`
   - Acesse: `https://seudominio.com`

---

## 📞 AINDA COM PROBLEMAS?

### Erro específico: pdo_pgsql não encontrado

**Causa:** Seu plano Hostinger pode não ter PostgreSQL.

**Solução Definitiva:** Use MySQL

Vou criar os scripts de migration para MySQL agora. Aguarde...

---

## 🎯 COMANDOS ÚTEIS (SSH)

Se você tem acesso SSH:

```bash
# Ver extensões PHP ativas
php -m

# Verificar versão PHP
php -v

# Verificar configuração PHP
php -i | grep -i pdo

# Ajustar permissões em massa
find . -type d -exec chmod 755 {} \;
find . -type f -exec chmod 644 {} \;
```

---

**✅ SIGA ESTE GUIA E AS EXTENSÕES SERÃO ATIVADAS!** 🚀

Se optar por MySQL ao invés de PostgreSQL, me avise que crio os scripts de migration MySQL para você! 💪

