# 📁 Estrutura Correta para Hostinger

## ❌ PROBLEMA: Site não aparece após instalação

Isso acontece quando os arquivos não estão na estrutura correta.

---

## ✅ ESTRUTURA CORRETA

Na Hostinger, **TODOS** os arquivos devem estar em `public_html/`:

```
public_html/                    ← Raiz do seu site
├── index.php                   ← Entry point (NOVO - criado automaticamente)
├── install.php                 ← Instalador
├── .htaccess                   ← Configuração Apache (raiz)
├── .env                        ← Credenciais (criar manualmente)
├── composer.json
├── vendor/                     ← Dependências
├── src/                        ← Código PHP
├── views/                      ← Templates
├── database/                   ← Migrations
└── public/                     ← Arquivos públicos (CSS, JS, etc)
    ├── index.php               ← Router principal
    └── .htaccess               ← Configuração Apache (public)
```

---

## 🔧 COMO CORRIGIR

### Opção 1: Upload correto desde o início

1. **Extraia o ZIP localmente**
2. **Acesse cPanel > File Manager**
3. Vá para `public_html/`
4. **DELETE tudo** que está lá
5. **Faça upload de TODOS os arquivos** para `public_html/`
6. Não crie subpastas, coloque tudo direto na raiz

### Opção 2: Se já fez upload errado

**Problema comum:** Você criou uma pasta `shopping-macumba/` dentro de `public_html/`

```
❌ ERRADO:
public_html/
└── shopping-macumba/        ← Pasta extra (remover!)
    ├── index.php
    ├── src/
    └── ...
```

**Correção:**

1. Entre em `public_html/shopping-macumba/`
2. **Selecione TODOS os arquivos** (Ctrl+A)
3. Clique em **Move** ou **Mover**
4. Destino: `public_html/`
5. **DELETE a pasta `shopping-macumba/` vazia**

---

## 🌐 TESTAR SE ESTÁ CORRETO

### 1. Verificar arquivos na raiz

Em `public_html/` você deve ver:
- ✅ `index.php` (na raiz)
- ✅ `.htaccess` (na raiz)
- ✅ `install.php`
- ✅ Pasta `src/`
- ✅ Pasta `views/`
- ✅ Pasta `public/`

### 2. Acessar o site

```
https://seudominio.com
```

**Deve aparecer:**
- Homepage com logo "Shopping da Macumba"
- Header vermelho
- Produtos (ou mensagem "Nenhum produto")

**Se aparecer erro 404 ou página em branco:**
- Verifique se `index.php` está na raiz de `public_html/`
- Verifique se `.htaccess` existe
- Veja os logs: cPanel > Metrics > Errors

---

## 🔍 VERIFICAÇÃO PASSO A PASSO

### 1. Verificar index.php

```bash
# Via SSH (se disponível)
cd public_html
ls -la index.php

# Deve retornar:
# -rw-r--r-- 1 user user 1234 Oct 29 index.php
```

Ou via File Manager:
- Vá em `public_html/`
- Procure `index.php`
- Deve estar na **raiz**, não dentro de nenhuma pasta

### 2. Verificar .htaccess

```bash
# Via SSH
cd public_html
cat .htaccess

# Deve conter:
# RewriteEngine On
# RewriteRule ^(.*)$ index.php [L,QSA]
```

### 3. Verificar permissões

```bash
# Via SSH
cd public_html
chmod 644 index.php
chmod 644 .htaccess
chmod 755 src
chmod 755 views
chmod 755 public
```

Ou via File Manager:
- Clique direito em `index.php` > Permissions > `644`
- Clique direito em `.htaccess` > Permissions > `644`
- Pastas: `755`

---

## 📋 FLUXO DE REQUISIÇÃO

Quando alguém acessa `https://seudominio.com`:

1. Apache lê `public_html/.htaccess`
2. `.htaccess` redireciona para `public_html/index.php`
3. `index.php` (raiz) carrega `public/index.php`
4. `public/index.php` carrega o Router
5. Router carrega Controllers
6. Controllers carregam Views
7. Página é exibida

**Se qualquer arquivo estiver no lugar errado, o fluxo quebra!**

---

## 🐛 PROBLEMAS COMUNS

### Erro: "404 Not Found"

**Causa:** `.htaccess` não está funcionando

**Solução:**
1. Verifique se o arquivo existe: `public_html/.htaccess`
2. Verifique permissões: `644`
3. Verifique se mod_rewrite está ativo (geralmente está)

### Erro: "500 Internal Server Error"

**Causa:** Erro no PHP ou `.htaccess` mal configurado

**Solução:**
1. Veja os logs: cPanel > Metrics > Errors
2. Verifique se PHP 8.0+ está ativo
3. Verifique se `.htaccess` não tem sintaxe errada

### Erro: Página em branco

**Causa:** Erro fatal no PHP

**Solução:**
1. Ative display de erros temporariamente
2. Adicione no topo de `index.php`:
```php
<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
// ... resto do código
```
3. Acesse o site e veja o erro
4. **IMPORTANTE:** Remova após corrigir!

### Site mostra listagem de arquivos

**Causa:** `index.php` não existe ou não é reconhecido

**Solução:**
1. Verifique se `index.php` existe na raiz
2. Verifique se está com o nome correto (minúsculas)
3. Verifique permissões: `644`

---

## ✅ CHECKLIST FINAL

Antes de abrir um ticket de suporte:

- [ ] Todos os arquivos em `public_html/` (não em subpasta)
- [ ] `index.php` na raiz de `public_html/`
- [ ] `.htaccess` na raiz de `public_html/`
- [ ] `.env` criado e configurado
- [ ] PHP 8.0+ ativo (cPanel > Select PHP Version)
- [ ] Extensões ativadas (pdo, pdo_mysql)
- [ ] Banco de dados criado
- [ ] Migrations executadas
- [ ] Permissões corretas (644 arquivos, 755 pastas)

---

## 📞 COMANDOS ÚTEIS (SSH)

```bash
# Ir para a raiz do site
cd public_html

# Listar arquivos (incluindo ocultos)
ls -la

# Verificar se index.php existe
test -f index.php && echo "OK" || echo "NÃO EXISTE"

# Verificar se .htaccess existe
test -f .htaccess && echo "OK" || echo "NÃO EXISTE"

# Ver conteúdo do .htaccess
cat .htaccess

# Corrigir permissões de tudo
find . -type f -exec chmod 644 {} \;
find . -type d -exec chmod 755 {} \;
chmod 600 .env

# Ver logs de erro em tempo real
tail -f error_log
```

---

## 🎯 RESUMO

**3 arquivos críticos na raiz de public_html/:**
1. ✅ `index.php` - Entry point
2. ✅ `.htaccess` - Rewrite rules
3. ✅ `.env` - Credenciais

**Se estes 3 estão corretos e no lugar certo, o site funciona!**

---

## 🆘 ÚLTIMO RECURSO

Se NADA funcionar:

1. **Delete tudo** de `public_html/`
2. Faça **upload novamente** do ZIP
3. **Extraia direto** na raiz de `public_html/`
4. Execute `install.php`
5. Configure `.env`
6. Teste: `https://seudominio.com`

---

**✅ ESTRUTURA CORRETA = SITE FUNCIONANDO!** 🚀

