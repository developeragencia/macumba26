# ⚡ CORREÇÃO RÁPIDA - Render Deploy

## ❌ PROBLEMA: Arquivos Duplicados / Build Error

O Render está tentando buildar o projeto inteiro. Precisamos configurar para usar APENAS a pasta `backend`.

---

## ✅ SOLUÇÃO: Configure Diretamente no Dashboard

### 🔧 PASSO 1: Corrigir o Serviço Backend Existente

**Acesse**: https://dashboard.render.com/web/srv-d40k70vgi27c73fkv1ig/settings

#### A) Settings → Build & Deploy:

Mude para:
```
Root Directory:    backend
Build Command:     npm install && npx prisma generate && npm run build
Start Command:     npm run start:prod
Auto-Deploy:       Yes
```

**IMPORTANTE**: O campo `Root Directory` é CRÍTICO! Deve ser exatamente `backend`

#### B) Settings → Environment:

Clique em **"Add Environment Variable"** e adicione **UMA POR VEZ**:

```
NODE_ENV       = production
PORT           = 10000
JWT_SECRET     = shopping-macumba-jwt-secret-2024-change-me
JWT_EXPIRES_IN = 7d
FRONTEND_URL   = https://shopping-macumba-frontend.onrender.com
```

**IMPORTANTE**: NÃO adicione `DATABASE_URL` ainda! Vamos fazer isso no próximo passo.

#### C) Adicionar DATABASE_URL:

Clique em **"Add Environment Variable"**:

```
Key:   DATABASE_URL
Value: postgresql://neondb_owner:npg_pxLcEBae0WI3@ep-morning-fog-adjltjzj-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
```

**COPIE E COLE EXATAMENTE** como está acima!

#### D) Salvar e Deploy:

1. Clique em **"Save Changes"**
2. Role para cima e clique em **"Manual Deploy"**
3. Selecione **"Deploy latest commit"**
4. Aguarde o build (pode demorar 5-10 minutos na primeira vez)

---

## 🎨 PASSO 2: Criar Serviço Frontend (NOVO)

**Acesse**: https://dashboard.render.com/ 

1. Clique em **"New +"** → **"Web Service"**

2. **Connect Repository**:
   - Se já estiver conectado, selecione: `developeragencia/macumba26`
   - Se não, clique em "Connect GitHub" e autorize

3. **Configure o Serviço**:

```
Name:              shopping-macumba-frontend
Region:            Oregon (US West)
Branch:            main
Root Directory:    frontend        ← IMPORTANTE!
Runtime:           Node
Build Command:     npm install && npm run build
Start Command:     npm start
Instance Type:     Starter ($7/month) ou Free (750h/mês)
```

4. **Environment Variables** (Clique em "Add Environment Variable"):

```
NODE_ENV              = production
PORT                  = 10000
NEXT_PUBLIC_API_URL   = https://macumba26.onrender.com
NEXTAUTH_URL          = https://shopping-macumba-frontend.onrender.com
NEXTAUTH_SECRET       = nextauth-secret-change-me-random-string
```

5. Clique em **"Create Web Service"**

---

## 🐛 PROBLEMAS COMUNS E SOLUÇÕES:

### Erro: "Cannot find module"
**Causa**: Root Directory incorreto ou vazio
**Solução**: Certifique-se que `Root Directory` = `backend` (ou `frontend`)

### Erro: "Package.json not found"
**Causa**: Root Directory errado
**Solução**: Verifique se está apontando para `backend` ou `frontend`

### Erro: "Prisma Client not generated"
**Causa**: Build command sem `npx prisma generate`
**Solução**: Build Command deve ser: `npm install && npx prisma generate && npm run build`

### Erro: "Port already in use"
**Causa**: Variável PORT incorreta
**Solução**: Use `PORT=10000` (Render usa porta 10000)

### Erro: "Database connection failed"
**Causa**: DATABASE_URL incorreto ou sem SSL
**Solução**: Certifique-se que termina com `?sslmode=require`

### Build muito lento ou travando:
**Causa**: Tentando buildar o projeto inteiro
**Solução**: Configure `Root Directory` corretamente!

---

## ✅ CHECKLIST FINAL:

### Backend (srv-d40k70vgi27c73fkv1ig):
- [ ] Root Directory = `backend` ✓
- [ ] Build Command correto ✓
- [ ] Start Command = `npm run start:prod` ✓
- [ ] Todas as 6 variáveis adicionadas ✓
- [ ] Manual Deploy executado ✓
- [ ] Logs sem erros ✓

### Frontend (novo serviço):
- [ ] Nome = `shopping-macumba-frontend` ✓
- [ ] Root Directory = `frontend` ✓
- [ ] Build Command correto ✓
- [ ] Start Command = `npm start` ✓
- [ ] Todas as 5 variáveis adicionadas ✓
- [ ] Serviço criado com sucesso ✓

---

## 🧪 TESTAR:

### 1. Backend Health Check:
```bash
curl https://macumba26.onrender.com/api/health
```

Deve retornar:
```json
{"status":"ok","timestamp":"..."}
```

### 2. Frontend:
Abra no navegador:
```
https://shopping-macumba-frontend.onrender.com
```

Deve mostrar a página com design Mercado Livre (vermelho, branco, preto)

### 3. Ver Logs:
- Backend: https://dashboard.render.com/web/srv-d40k70vgi27c73fkv1ig/logs
- Frontend: Veja no dashboard do serviço criado

---

## 🚨 SE AINDA DER ERRO:

### Opção 1: Delete e recrie o serviço
1. Delete o serviço `macumba26`
2. Crie um novo seguindo os passos acima
3. Use o nome `shopping-macumba-backend`

### Opção 2: Use render.yaml (Blueprint)
1. No Render Dashboard: **"New +"** → **"Blueprint"**
2. Selecione o repositório `macumba26`
3. O Render detectará o `render.yaml` automaticamente
4. Adicione as variáveis manualmente
5. Clique em **"Apply"**

---

## 💡 DICA PRO:

Depois que tudo funcionar, **atualize a variável FRONTEND_URL no backend**:

1. Vá em: https://dashboard.render.com/web/srv-d40k70vgi27c73fkv1ig/env
2. Edite `FRONTEND_URL` para apontar para a URL real do frontend
3. Salve (o serviço reiniciará automaticamente)

---

**Siga este guia passo a passo e não terá mais erros! 🚀✅**

