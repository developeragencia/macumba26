# 🔧 Correção do Deploy no Render

## ❌ Problema Identificado

O serviço `macumba26` (srv-d40k70vgi27c73fkv1ig) está configurado incorretamente:

```
❌ Root Directory: (vazio) → Deveria ser "backend"
❌ Build Command: yarn install; yarn build
❌ Start Command: npm run start
❌ Environment: Faltam variáveis críticas
```

---

## ✅ Configuração Correta

### 1. No Dashboard do Render (https://dashboard.render.com/web/srv-d40k70vgi27c73fkv1ig)

#### Settings → Build & Deploy:

1. **Root Directory**:
   ```
   backend
   ```

2. **Build Command**:
   ```bash
   npm install && npx prisma generate && npm run build
   ```

3. **Start Command**:
   ```bash
   npm run start:prod
   ```

4. **Node Version** (opcional):
   ```
   18.x
   ```

#### Settings → Environment:

Adicione estas variáveis:

```env
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://neondb_owner:npg_pxLcEBae0WI3@ep-morning-fog-adjltjzj-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=shopping-macumba-super-secret-2024-mudeme
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://shopping-macumba.vercel.app
```

5. **Clique em "Save Changes"**

6. **Clique em "Manual Deploy" → "Deploy latest commit"**

---

## 🚀 Deploy Automático via render.yaml

Alternativamente, você pode usar o `render.yaml` que já criamos:

1. No Dashboard do Render, **delete o serviço atual** (macumba26)
2. Clique em **"New" → "Blueprint"**
3. Conecte o repositório: `developeragencia/macumba26`
4. O Render detectará automaticamente o `render.yaml`
5. Configure as environment variables manualmente:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `FRONTEND_URL`
6. Clique em **"Apply"**

---

## 📋 Checklist Pós-Deploy

Após corrigir e fazer o deploy:

- [ ] Verificar logs: `https://dashboard.render.com/web/srv-d40k70vgi27c73fkv1ig/logs`
- [ ] Testar health check: `https://macumba26.onrender.com/api/health`
- [ ] Testar API: `https://macumba26.onrender.com/api/auth/register`
- [ ] Verificar conexão com banco Neon
- [ ] Atualizar FRONTEND_URL no Vercel para apontar para o Render

---

## 🐛 Logs Esperados (Sucesso)

```
✅ Installing dependencies...
✅ Generating Prisma Client...
✅ Building NestJS application...
✅ Starting server...
🚀 Application is running on: http://0.0.0.0:10000/api
```

---

## ⚠️ Erros Comuns

### Erro: "Cannot find module '@prisma/client'"
**Solução**: Adicionar `npx prisma generate` no Build Command

### Erro: "Port already in use"
**Solução**: Usar `PORT=10000` (Render usa porta 10000 internamente)

### Erro: "Database connection failed"
**Solução**: Verificar `DATABASE_URL` com `?sslmode=require`

---

**Status Atual do Serviço:**
- URL: https://macumba26.onrender.com
- ID: srv-d40k70vgi27c73fkv1ig
- Plano: Pro Max
- Região: Oregon

