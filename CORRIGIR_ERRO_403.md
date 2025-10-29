# 🔧 Corrigir Erro 403 Proibido

## ❌ ERRO MOSTRADO:
```
403 Proibido
O acesso a este recurso no servidor foi negado!
```

---

## 🎯 CAUSA DO PROBLEMA:

O erro 403 acontece por **uma destas razões**:

1. ❌ **Sem arquivo index.php** na pasta pública
2. ❌ **Permissões incorretas** nos arquivos
3. ❌ **.htaccess bloqueando** o acesso
4. ❌ **DocumentRoot** apontando para lugar errado
5. ❌ **Propriedade dos arquivos** incorreta

---

## ✅ SOLUÇÃO COMPLETA (Passo a Passo):

### **PASSO 1: Verificar Estrutura de Arquivos**

No cPanel > File Manager, verifique se a estrutura está assim:

```
public_html/
├── public/              ← DEVE EXISTIR
│   ├── index.php       ← ARQUIVO PRINCIPAL
│   └── .htaccess
├── src/
├── views/
├── database/
├── vendor/
├── .htaccess           ← IMPORTANTE
└── install.php
```

**❌ PROBLEMA COMUM:**
Se você colocou todos os arquivos **dentro de public_html/** ao invés de **public_html/public/**, o Apache não encontra o index.php.

---

### **PASSO 2: Corrigir .htaccess na RAIZ**

No File Manager, edite o arquivo `public_html/.htaccess`:

```apache
# Shopping da Macumba - Configuração Hostinger
RewriteEngine On
RewriteBase /

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Redirect tudo para public/
RewriteCond %{REQUEST_URI} !^/public/
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ public/$1 [L]
```

**💡 IMPORTANTE:** Este arquivo redireciona tudo para a pasta `public/`

---

### **PASSO 3: Corrigir public/.htaccess**

Edite o arquivo `public_html/public/.htaccess`:

```apache
# Rotas limpas para PHP
RewriteEngine On
RewriteBase /public/

# Permitir arquivos reais (CSS, JS, imagens)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d

# Redirecionar para index.php
RewriteRule ^(.*)$ index.php/$1 [L,QSA]
```

---

### **PASSO 4: Configurar Permissões**

Execute estes comandos via SSH ou configure manualmente:

**Via SSH:**
```bash
cd public_html

# Pastas: 755
find . -type d -exec chmod 755 {} \;

# Arquivos: 644
find . -type f -exec chmod 644 {} \;

# .htaccess: 644
chmod 644 .htaccess
chmod 644 public/.htaccess

# .env: 600 (somente proprietário)
chmod 600 .env

# index.php: 644
chmod 644 public/index.php
```

**Via File Manager (cPanel):**
1. Selecione cada pasta
2. Clique em **"Change Permissions"**
3. Defina: **755** (rwxr-xr-x)
4. Marque: **"Recursively"** se for pasta
5. Apply

Para arquivos:
1. Selecione o arquivo
2. **"Change Permissions"** → **644** (rw-r--r--)

---

### **PASSO 5: Verificar Propriedade dos Arquivos**

Os arquivos devem pertencer ao **seu usuário** (não root).

**Via SSH:**
```bash
# Verificar quem é o dono
ls -la

# Se aparecer "root" ou outro usuário, corrija:
chown -R seu_usuario:seu_usuario /home/seu_usuario/public_html
```

**Via cPanel:**
Geralmente não é necessário, pois o File Manager já coloca o dono correto.

---

### **PASSO 6: Testar index.php Diretamente**

Acesse diretamente:
```
https://seudominio.com/public/index.php
```

**✅ Se funcionar:** O problema é o .htaccess na raiz
**❌ Se der 403:** O problema é no arquivo ou permissões

---

### **PASSO 7: Criar index.php de Teste**

Se o index.php não funciona, crie um teste simples:

1. File Manager > `public_html/public/`
2. Crie arquivo: `test.php`
3. Conteúdo:
```php
<?php
echo "Funcionou! PHP está OK!";
phpinfo();
```

4. Acesse: `https://seudominio.com/public/test.php`

**✅ Se mostrar "Funcionou":** PHP está OK, problema é no index.php
**❌ Se der 403:** Problema de permissões

---

### **PASSO 8: Verificar php.ini ou .user.ini**

Alguns servidores têm restrições extras.

Crie arquivo `public_html/.user.ini`:
```ini
open_basedir=/home/seu_usuario/public_html:/tmp
allow_url_fopen=On
```

---

### **PASSO 9: Desabilitar ModSecurity (Temporário)**

Se nada funcionar, o ModSecurity pode estar bloqueando.

**Via cPanel:**
1. Procure: **ModSecurity**
2. Desabilite temporariamente
3. Teste o site
4. Reative depois

---

### **PASSO 10: Verificar Logs de Erro**

```
cPanel > Metrics > Errors
```

Procure por:
- "Permission denied"
- "403 Forbidden"
- "No such file"

Copie a mensagem exata e me envie!

---

## 🚨 SOLUÇÃO RÁPIDA (SE NADA FUNCIONAR):

### **Opção A: Mover Tudo para Raiz**

Se o redirecionamento não funciona, **mova o conteúdo de public/ para a raiz**:

```bash
# Via SSH
cd public_html
mv public/* .
mv public/.htaccess .htaccess_public
rmdir public
```

Depois, no arquivo `.htaccess` raiz, **remova** as linhas de redirect para public:
```apache
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Redirecionar tudo para index.php
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.php/$1 [L,QSA]
```

---

### **Opção B: Criar .htaccess Simplificado**

Na raiz (`public_html/.htaccess`):
```apache
DirectoryIndex public/index.php
```

Teste acessando: `https://seudominio.com`

---

## 📋 CHECKLIST DE VERIFICAÇÃO:

- [ ] Arquivo `public/index.php` existe
- [ ] Permissões: pastas 755, arquivos 644
- [ ] `.htaccess` na raiz existe e está correto
- [ ] `public/.htaccess` existe e está correto
- [ ] ModRewrite ativado no Apache
- [ ] PHP 8.0+ selecionado no cPanel
- [ ] Sem erros nos logs (cPanel > Errors)
- [ ] Teste direto funciona: `/public/index.php`

---

## 🆘 AINDA COM ERRO 403?

### Execute este diagnóstico:

1. **Acesse:** `https://seudominio.com/public/index.php`
   - ✅ Funciona? → Problema é .htaccess raiz
   - ❌ Erro 403? → Continue

2. **Crie test.php** em `public/` com `<?php echo "OK"; ?>`
   - ✅ Funciona? → Problema é no index.php original
   - ❌ Erro 403? → Continue

3. **Verifique permissões:**
   ```bash
   ls -la public/index.php
   ```
   Deve mostrar: `-rw-r--r--` (644)

4. **Verifique logs:**
   ```
   cPanel > Metrics > Errors
   ```
   Copie o erro exato

5. **Contate suporte Hostinger:**
   Diga: "Erro 403 mesmo com permissões 644 no index.php"

---

## ✅ APÓS CORRIGIR:

1. Limpe o cache do navegador (Ctrl+Shift+Delete)
2. Acesse: `https://seudominio.com`
3. Deve aparecer a homepage do Shopping da Macumba
4. Se aparecer erro de banco, execute: `install.php`

---

## 📞 COMANDOS ÚTEIS (SSH):

```bash
# Ver permissões
ls -la public/

# Ver conteúdo .htaccess
cat .htaccess
cat public/.htaccess

# Testar se mod_rewrite está ativo
apachectl -M | grep rewrite

# Ver erro do Apache
tail -f /usr/local/apache/logs/error_log

# Forçar permissões corretas
chmod -R 755 public_html/
chmod 644 public_html/public/index.php
```

---

**✅ SIGA ESTE GUIA E O ERRO 403 SERÁ RESOLVIDO!** 🚀

Se precisar de ajuda específica, me envie:
1. Screenshot do erro
2. Conteúdo do `.htaccess`
3. Resultado de `ls -la public/index.php`
4. Logs de erro do cPanel

