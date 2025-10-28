# 🚀 Deploy Completo no Render - Backend + Frontend

## 📋 Configuração de 2 Serviços no Render

Vamos configurar **BACKEND e FRONTEND** no Render.

---

## 🔧 SERVIÇO 1: BACKEND (já existe - precisa corrigir)

### ID: `srv-d40k70vgi27c73fkv1ig`
### URL: https://macumba26.onrender.com

### Configuração no Dashboard:

**Acesse**: https://dashboard.render.com/web/srv-d40k70vgi27c73fkv1ig/settings

#### Settings → Build & Deploy:

```
Root Directory:    backend
Build Command:     npm install && npx prisma generate && npm run build
Start Command:     npm run start:prod
```

#### Settings → Environment Variables:

```env
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://neondb_owner:npg_pxLcEBae0WI3@ep-morning-fog-adjltjzj-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=shopping-macumba-super-secret-jwt-2024-mudeme
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://shopping-macumba-frontend.onrender.com
```

**Salvar e fazer Manual Deploy!**

---

## 🎨 SERVIÇO 2: FRONTEND (criar novo)

### Opção A: Criar via Dashboard

1. **Acesse**: https://dashboard.render.com/
2. **Clique em**: "New" → "Web Service"
3. **Selecione o repo**: `developeragencia/macumba26`
4. **Configure**:

```
Name:              shopping-macumba-frontend
Region:            Ohio (US East)
Branch:            main
Root Directory:    frontend
Runtime:           Node
Build Command:     npm install && npm run build
Start Command:     npm start
Instance Type:     Starter (Free)
```

5. **Environment Variables**:

```env
NODE_ENV=production
PORT=10000
NEXT_PUBLIC_API_URL=https://macumba26.onrender.com
NEXTAUTH_URL=https://shopping-macumba-frontend.onrender.com
NEXTAUTH_SECRET=gere-um-secret-aleatorio-aqui-mudeme
```

6. **Create Web Service**

### Opção B: Criar via Blueprint (render.yaml)

1. **Delete os serviços existentes** (se houver problemas)
2. No Dashboard: **"New" → "Blueprint"**
3. **Conecte**: `developeragencia/macumba26`
4. O Render detectará o `render.yaml` automaticamente
5. **Configure as variáveis manualmente**:
   - Backend: DATABASE_URL, JWT_SECRET, FRONTEND_URL
   - Frontend: NEXT_PUBLIC_API_URL, NEXTAUTH_URL, NEXTAUTH_SECRET
6. **Apply**

---

## 🔗 URLs Finais (após deploy):

```
Backend API:    https://macumba26.onrender.com/api
Frontend App:   https://shopping-macumba-frontend.onrender.com
Health Check:   https://macumba26.onrender.com/api/health
Database:       Neon PostgreSQL (já configurado)
```

---

## 📝 Arquivo de Configuração Atualizado

O `render.yaml` já está atualizado no repositório com:
- ✅ Backend configurado
- ✅ Frontend configurado
- ✅ Variáveis de ambiente

---

## 🧪 Testar Após Deploy

### 1. Backend Health Check:
```bash
curl https://macumba26.onrender.com/api/health
```

Resposta esperada:
```json
{
  "status": "ok",
  "timestamp": "2024-10-28T..."
}
```

### 2. Frontend:
Abra no navegador:
```
https://shopping-macumba-frontend.onrender.com
```

Você deve ver:
- ✅ Header vermelho estilo Mercado Livre
- ✅ Carrossel de banners
- ✅ Grid de categorias
- ✅ Cards de produtos

### 3. Testar API do Backend:
```bash
curl -X POST https://macumba26.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@exemplo.com",
    "password": "Senha123!",
    "name": "Usuário Teste"
  }'
```

---

## ⚠️ IMPORTANTE: Atualizar CORS

Após criar o frontend, **atualize a variável FRONTEND_URL** no backend:

1. Vá em: https://dashboard.render.com/web/srv-d40k70vgi27c73fkv1ig/env
2. Edite `FRONTEND_URL`:
   ```
   https://shopping-macumba-frontend.onrender.com
   ```
3. Salve e o serviço reiniciará automaticamente

---

## 💰 Custos (Plano Starter/Free)

```
Backend:     Starter Plan (ou Free 750h/mês)
Frontend:    Starter Plan (ou Free 750h/mês)
Database:    Neon Free (0.5GB)
TOTAL:       $0-14/mês
```

---

## 🐛 Troubleshooting

### Frontend não conecta ao Backend:
- ✅ Verificar `NEXT_PUBLIC_API_URL` no frontend
- ✅ Verificar `FRONTEND_URL` no backend (CORS)
- ✅ Ambos devem estar rodando

### Erro "Module not found" no Frontend:
```bash
# Build Command correto:
npm install && npm run build
```

### Serviço em "Build Failed":
- Verifique os logs: Dashboard → Logs
- Root Directory deve estar correto (`backend` ou `frontend`)
- Commands devem usar `npm` (não `yarn`)

---

## 📊 Status de Deployment

Após configurar tudo:

```
✅ GitHub:     https://github.com/developeragencia/macumba26
✅ Backend:    https://macumba26.onrender.com/api
✅ Frontend:   https://shopping-macumba-frontend.onrender.com
✅ Database:   Neon PostgreSQL (15 tabelas)
✅ Design:     Mercado Livre Style (Red/White/Black)
```

---

## 🎯 Próximos Passos (Opcional)

1. **Domínio Customizado**:
   - Backend: `api.shoppingdamacumba.com`
   - Frontend: `shoppingdamacumba.com`

2. **CDN/Cache**:
   - Habilitar cache no Render
   - Configurar headers de cache

3. **Monitoramento**:
   - Configurar alertas de uptime
   - Monitorar logs de erro

4. **Segurança**:
   - Rate limiting
   - Helmet.js
   - CSP headers

---

**Deploy preparado! Agora configure no Dashboard do Render! 🚀🔴⚪⚫**

