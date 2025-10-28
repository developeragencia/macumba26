# 🔧 CORRIGIR ERRO DE BUILD - macumba26

## 🔍 ERRO IDENTIFICADO NA TELA:

```
Deploy failed for 13bccf8
Exited with status 1 while building your code. Check your deploy logs for more information.
```

---

## ❌ PROBLEMAS COMUNS QUE CAUSAM ESSE ERRO:

### 1. **Root Directory Incorreto ou Vazio**
Se o Root Directory não estiver configurado como `backend`, o Render não encontra o `package.json`

### 2. **Build Command Errado**
Falta o comando `npx prisma generate`

### 3. **Variáveis de Ambiente Faltando**
Especialmente `DATABASE_URL`

---

## ✅ SOLUÇÃO PASSO A PASSO:

### **PASSO 1: Acessar Settings**

**No seu Dashboard**: https://dashboard.render.com/web/srv-d40l4rumcj7s73fgk9s0

1. Clique em **"Settings"** (menu lateral esquerdo)

---

### **PASSO 2: Corrigir Build & Deploy**

Vá em: **Settings → Build & Deploy**

**Configure EXATAMENTE assim**:

```
Root Directory:    backend
```
**⚠️ CRÍTICO**: Se esse campo estiver vazio, adicione `backend`!

```
Build Command:     npm install && npx prisma generate && npm run build
```
**Não use ponto e vírgula, use `&&`**

```
Start Command:     npm run start:prod
```
**Não use `npm run start`, tem que ser `start:prod`**

**Clique em "Save Changes"**

---

### **PASSO 3: Verificar Variáveis de Ambiente**

Vá em: **Environment** (menu lateral)

**Verifique se TODAS essas 6 variáveis existem**:

```
✓ NODE_ENV       = production
✓ PORT           = 10000
✓ DATABASE_URL   = postgresql://neondb_owner:npg_pxLcEBae0WI3@ep-morning-fog-adjltjzj-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
✓ JWT_SECRET     = shopping-macumba-super-secret-jwt-2024
✓ JWT_EXPIRES_IN = 7d
✓ FRONTEND_URL   = https://shopping-macumba-frontend.onrender.com
```

**Se alguma estiver faltando, adicione!**

Clique em "Add Environment Variable" para adicionar as que faltam.

---

### **PASSO 4: Ver os Logs do Erro**

Antes de fazer novo deploy, veja o erro exato:

1. Clique em **"Logs"** (menu lateral)
2. Role até encontrar o erro vermelho
3. **Copie o erro** e me envie para eu identificar o problema exato

**OU**

Clique no link "deploy logs" que aparece na mensagem de erro.

---

### **PASSO 5: Fazer Novo Deploy**

Depois de corrigir:

1. Vá para a página principal do serviço
2. Clique em **"Manual Deploy"** (botão no topo)
3. Selecione **"Clear build cache & deploy"**
4. Aguarde 5-10 minutos

---

## 🐛 ERROS MAIS COMUNS E SOLUÇÕES:

### ❌ Erro: "package.json not found"
```
Error: ENOENT: no such file or directory, open '/opt/render/project/src/package.json'
```
**Causa**: Root Directory vazio ou incorreto  
**Solução**: Root Directory = `backend`

---

### ❌ Erro: "Cannot find module '@prisma/client'"
```
Error: Cannot find module '@prisma/client'
```
**Causa**: Falta `npx prisma generate` no Build Command  
**Solução**: Build Command = `npm install && npx prisma generate && npm run build`

---

### ❌ Erro: "Prisma: environment variable not found: DATABASE_URL"
```
Invalid `prisma.user.findMany()` invocation:
Error: Environment variable not found: DATABASE_URL
```
**Causa**: Variável DATABASE_URL não foi adicionada  
**Solução**: Adicionar DATABASE_URL nas Environment Variables

---

### ❌ Erro: "Command not found: start:prod"
```
npm ERR! missing script: start:prod
```
**Causa**: O comando está tentando rodar no diretório errado  
**Solução**: Certifique-se que Root Directory = `backend`

---

### ❌ Erro: Build muito lento ou trava
```
Building... (takes forever)
```
**Causa**: Tentando buildar o projeto inteiro (frontend + backend)  
**Solução**: Root Directory = `backend`

---

## 📊 CONFIGURAÇÃO CORRETA (CHECKLIST):

### Settings → Build & Deploy:
- [ ] Root Directory = `backend` (NÃO vazio!)
- [ ] Build Command = `npm install && npx prisma generate && npm run build`
- [ ] Start Command = `npm run start:prod`
- [ ] Auto-Deploy = Yes

### Environment Variables:
- [ ] NODE_ENV existe
- [ ] PORT = 10000
- [ ] DATABASE_URL existe (completa com ?sslmode=require)
- [ ] JWT_SECRET existe
- [ ] JWT_EXPIRES_IN = 7d
- [ ] FRONTEND_URL existe

---

## 🔍 COMO VER O ERRO EXATO:

### Opção 1: Via Dashboard
1. Dashboard → macumba26
2. Clique em "Logs"
3. Procure por linhas vermelhas com "Error:"
4. Copie a mensagem de erro

### Opção 2: Via Deploy History
1. Dashboard → macumba26
2. Role até "Events"
3. Clique no deploy que falhou
4. Clique em "deploy logs"
5. Leia o erro no final dos logs

---

## 💡 DICA PRO:

Depois de corrigir Root Directory e Build Command, faça:

**"Clear build cache & deploy"**

Isso garante que o Render vai recompilar tudo do zero.

---

## 🚀 APÓS CORRIGIR:

Quando o deploy for bem-sucedido, você verá:

```
✓ Build complete
✓ Deploying...
✓ Your service is live 🎉
```

Então teste:
```
https://macumba26-gjh4.onrender.com/api/health
```

---

**Siga esses passos e me envie os logs de erro se ainda falhar! 🔧**

