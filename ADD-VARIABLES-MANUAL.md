# 🔐 Adicionar Variáveis Manualmente - Passo a Passo

## ⚠️ A API do Render não permite adicionar variáveis via script

Use este guia para adicionar manualmente (leva 5 minutos):

---

## 🎯 BACKEND - Adicionar 6 Variáveis

### **Acesse**: https://dashboard.render.com/web/srv-d40k70vgi27c73fkv1ig/env

### Clique em "Add Environment Variable" e adicione UMA POR VEZ:

---

### ✅ Variável 1:
```
Key:   NODE_ENV
Value: production
```
*Clique em "Save Changes"*

---

### ✅ Variável 2:
```
Key:   PORT
Value: 10000
```
*Clique em "Save Changes"*

---

### ✅ Variável 3:
```
Key:   DATABASE_URL
Value: postgresql://neondb_owner:npg_pxLcEBae0WI3@ep-morning-fog-adjltjzj-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
```
*⚠️ COPIE E COLE EXATAMENTE! Clique em "Save Changes"*

---

### ✅ Variável 4:
```
Key:   JWT_SECRET
Value: shopping-macumba-super-secret-jwt-2024-CHANGE-THIS
```
*Clique em "Save Changes"*

---

### ✅ Variável 5:
```
Key:   JWT_EXPIRES_IN
Value: 7d
```
*Clique em "Save Changes"*

---

### ✅ Variável 6:
```
Key:   FRONTEND_URL
Value: https://shopping-macumba-frontend.onrender.com
```
*Clique em "Save Changes"*

---

## 🔧 Corrigir Configurações de Build

### **Vá em**: Settings → Build & Deploy

**Configure exatamente assim:**

```
Root Directory:  backend
Build Command:   npm install && npx prisma generate && npm run build
Start Command:   npm run start:prod
```

**Salve as alterações!**

---

## 🚀 Fazer Deploy

1. **Vá para**: https://dashboard.render.com/web/srv-d40k70vgi27c73fkv1ig
2. **Clique em**: "Manual Deploy" (botão azul no topo)
3. **Selecione**: "Deploy latest commit"
4. **Aguarde**: O build levará 5-10 minutos

---

## 📊 Verificar Logs

Durante o deploy, clique em **"Logs"** para ver o progresso:

### ✅ Logs de Sucesso:
```
==> Installing dependencies...
==> Generating Prisma Client...
==> Building NestJS application...
==> Starting server...
🚀 Application is running on: http://0.0.0.0:10000/api
```

### ❌ Se der erro:
- Verifique se todas as 6 variáveis foram adicionadas
- Verifique se `Root Directory` = `backend`
- Verifique se `DATABASE_URL` está completa (com `?sslmode=require`)

---

## 🧪 Testar Após Deploy

### 1. Health Check:
Abra no navegador:
```
https://macumba26.onrender.com/api/health
```

Deve retornar:
```json
{"status":"ok","timestamp":"2024-10-28T..."}
```

### 2. Ou teste via curl:
```bash
curl https://macumba26.onrender.com/api/health
```

---

## ✅ CHECKLIST FINAL:

- [ ] 6 variáveis adicionadas no Environment
- [ ] Root Directory = `backend`
- [ ] Build Command correto
- [ ] Start Command = `npm run start:prod`
- [ ] Deploy manual executado
- [ ] Logs mostram "Application is running"
- [ ] Health check retorna {"status":"ok"}

---

## 🎨 Próximo Passo: Criar Frontend

Depois que o backend estiver funcionando, crie o serviço do frontend:

1. Dashboard → "New +" → "Web Service"
2. Repo: `developeragencia/macumba26`
3. Root Directory: `frontend`
4. Adicione as variáveis do frontend

---

**Siga este guia e em 10 minutos estará tudo funcionando! 🚀**

