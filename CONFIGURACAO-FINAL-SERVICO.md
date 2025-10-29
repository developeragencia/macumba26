# ⚡ CONFIGURAÇÃO FINAL - Service ID: srv-d40lj2jipnbc73ctbtc0

## 🎯 SERVIÇO IDENTIFICADO:

**Service ID**: `srv-d40lj2jipnbc73ctbtc0`

**Dashboard**: https://dashboard.render.com/web/srv-d40lj2jipnbc73ctbtc0

---

## ⚠️ API NÃO TEM ACESSO

A API Key retorna erro 404 para este serviço. Isso significa:
- O serviço pode estar em um workspace diferente
- A API Key não tem permissões para este serviço
- **Você precisa configurar MANUALMENTE no Dashboard**

---

## ✅ CONFIGURAÇÃO MANUAL (5 MINUTOS):

### **PASSO 1: Acessar o Serviço**

**Link Direto**: https://dashboard.render.com/web/srv-d40lj2jipnbc73ctbtc0

---

### **PASSO 2: Corrigir Build & Deploy**

**Vá em**: Settings → Build & Deploy

**Configure EXATAMENTE assim**:

```
Root Directory:    backend
```
**⚠️ Se estiver vazio, adicione `backend`!**

```
Build Command:     npm install && npx prisma generate && npm run build
```
**Use `&&` não `;`**

```
Start Command:     npm run start:prod
```
**Não use `npm start`!**

**Salve as alterações!**

---

### **PASSO 3: Adicionar/Verificar Variáveis**

**Vá em**: Environment (menu lateral)

**Verifique se estas 6 variáveis existem**:

#### 1. NODE_ENV
```
Key:   NODE_ENV
Value: production
```

#### 2. PORT
```
Key:   PORT
Value: 10000
```

#### 3. DATABASE_URL
```
Key:   DATABASE_URL
Value: postgresql://neondb_owner:npg_pxLcEBae0WI3@ep-morning-fog-adjltjzj-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
```

#### 4. JWT_SECRET
```
Key:   JWT_SECRET
Value: shopping-macumba-super-secret-jwt-2024-CHANGE-IN-PRODUCTION
```

#### 5. JWT_EXPIRES_IN
```
Key:   JWT_EXPIRES_IN
Value: 7d
```

#### 6. FRONTEND_URL
```
Key:   FRONTEND_URL
Value: https://shopping-macumba-frontend.onrender.com
```

**Se alguma estiver faltando**: Clique em "Add Environment Variable" e adicione!

---

### **PASSO 4: Deploy com Build Cache Limpo**

1. Volte para a página principal do serviço
2. Clique em **"Manual Deploy"** (botão azul)
3. Selecione **"Clear build cache & deploy"**
4. Confirme

**Aguarde 5-10 minutos** para o build completar.

---

## 📊 ACOMPANHAR O PROGRESSO:

### **Clique em "Logs"** para ver em tempo real:

#### ✅ Logs de SUCESSO:
```
==> Cloning from https://github.com/developeragencia/macumba26...
==> Using root directory: backend
==> Running build command...
==> Installing dependencies...
==> Generating Prisma Client...
✔ Generated Prisma Client
==> Building NestJS...
✔ Successfully compiled
==> Build successful
==> Starting server...
🚀 Application is running on: http://0.0.0.0:10000/api
```

#### ❌ Se der erro:

**Erro: "package.json not found"**
- Root Directory está vazio ou errado
- Corrija para `backend`

**Erro: "Cannot find module '@prisma/client'"**
- Build Command falta `npx prisma generate`
- Corrija: `npm install && npx prisma generate && npm run build`

**Erro: "DATABASE_URL not found"**
- Variável DATABASE_URL não foi adicionada
- Adicione nas Environment Variables

---

## ✅ VERIFICAR SE FUNCIONOU:

### 1. Status "Live" no Dashboard
Quando terminar, o status mudará para verde: **"Live"**

### 2. Copiar URL do Serviço
No dashboard, copie a URL (algo como):
```
https://macumba26-xxxx.onrender.com
```

### 3. Testar Health Check
```bash
curl https://[SUA-URL].onrender.com/api/health
```

**OU** abra no navegador:
```
https://[SUA-URL].onrender.com/api/health
```

**Resposta esperada**:
```json
{
  "status": "ok",
  "timestamp": "2024-10-28T..."
}
```

---

## 📋 CHECKLIST COMPLETO:

### Antes do Deploy:
- [ ] Root Directory = `backend` (não vazio!)
- [ ] Build Command = `npm install && npx prisma generate && npm run build`
- [ ] Start Command = `npm run start:prod`
- [ ] NODE_ENV adicionada
- [ ] PORT = 10000
- [ ] DATABASE_URL adicionada (completa com ?sslmode=require)
- [ ] JWT_SECRET adicionada
- [ ] JWT_EXPIRES_IN = 7d
- [ ] FRONTEND_URL adicionada

### Após Deploy:
- [ ] Status mudou para "Live" (verde)
- [ ] Logs mostram "Application is running"
- [ ] Health check retorna {"status":"ok"}
- [ ] Nenhum erro vermelho nos logs

---

## 🔗 LINKS RÁPIDOS:

- **Dashboard**: https://dashboard.render.com/web/srv-d40lj2jipnbc73ctbtc0
- **Settings**: https://dashboard.render.com/web/srv-d40lj2jipnbc73ctbtc0/settings
- **Environment**: https://dashboard.render.com/web/srv-d40lj2jipnbc73ctbtc0/env
- **Logs**: https://dashboard.render.com/web/srv-d40lj2jipnbc73ctbtc0/logs

---

## 💡 DICA IMPORTANTE:

Se o deploy continuar falhando:

1. **Veja os Logs** para identificar o erro exato
2. **Copie a mensagem de erro** (última linha vermelha)
3. **Me envie** para eu te ajudar a corrigir

---

## 🎨 PRÓXIMO PASSO (DEPOIS DO BACKEND FUNCIONAR):

Criar o serviço do frontend:

**Dashboard → New + → Web Service**

```
Name:           shopping-macumba-frontend
Repo:           developeragencia/macumba26
Root Directory: frontend
Build:          npm install && npm run build
Start:          npm start
```

---

**Configure manualmente no Dashboard agora! 🚀**

**Depois me avise se funcionou ou se precisa de ajuda com algum erro! 💪**

