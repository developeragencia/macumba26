# 🔐 Configuração de Variáveis de Ambiente - Render

## 📋 Variáveis Essenciais para o Backend

### Serviço: `macumba26` (srv-d40k70vgi27c73fkv1ig)
### URL: https://dashboard.render.com/web/srv-d40k70vgi27c73fkv1ig/env

---

## ✅ VARIÁVEIS OBRIGATÓRIAS (Backend):

Acesse o Dashboard e adicione uma por uma:

### 1. Configurações Básicas:
```env
NODE_ENV=production
PORT=10000
```

### 2. Banco de Dados (Neon):
```env
DATABASE_URL=postgresql://neondb_owner:npg_pxLcEBae0WI3@ep-morning-fog-adjltjzj-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### 3. Autenticação JWT:
```env
JWT_SECRET=shopping-macumba-super-secret-jwt-2024-MUDE-ISSO
JWT_EXPIRES_IN=7d
```

### 4. CORS (Frontend URL):
```env
FRONTEND_URL=https://shopping-macumba-frontend.onrender.com
```

---

## 🎨 VARIÁVEIS OBRIGATÓRIAS (Frontend):

### Para criar o serviço frontend, use estas variáveis:

### 1. Configurações Básicas:
```env
NODE_ENV=production
PORT=10000
```

### 2. API Backend:
```env
NEXT_PUBLIC_API_URL=https://macumba26.onrender.com
```

### 3. NextAuth:
```env
NEXTAUTH_URL=https://shopping-macumba-frontend.onrender.com
NEXTAUTH_SECRET=nextauth-super-secret-MUDE-ISSO-TAMBEM
```

---

## 🔧 VARIÁVEIS OPCIONAIS (Configurar depois):

### Google OAuth (Backend + Frontend):
```env
GOOGLE_CLIENT_ID=seu-google-client-id
GOOGLE_CLIENT_SECRET=seu-google-client-secret
```

### Cloudinary (Upload de Imagens):
```env
CLOUDINARY_CLOUD_NAME=seu-cloud-name
CLOUDINARY_API_KEY=sua-api-key
CLOUDINARY_API_SECRET=seu-api-secret
```

### Mercado Pago:
```env
MERCADO_PAGO_ACCESS_TOKEN=seu-access-token
```

### Stripe:
```env
STRIPE_SECRET_KEY=sk_test_...
```

### PayPal:
```env
PAYPAL_CLIENT_ID=seu-client-id
PAYPAL_CLIENT_SECRET=seu-client-secret
```

### Email (SMTP):
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASSWORD=sua-senha-app
```

---

## 📝 PASSO A PASSO NO DASHBOARD:

### Backend (Corrigir serviço existente):

1. **Acesse**: https://dashboard.render.com/web/srv-d40k70vgi27c73fkv1ig

2. **Vá em**: "Environment" (menu lateral)

3. **Clique em**: "Add Environment Variable"

4. **Adicione uma por uma** (copie e cole):

   ```
   Key: NODE_ENV
   Value: production
   ```
   
   ```
   Key: PORT
   Value: 10000
   ```
   
   ```
   Key: DATABASE_URL
   Value: postgresql://neondb_owner:npg_pxLcEBae0WI3@ep-morning-fog-adjltjzj-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```
   
   ```
   Key: JWT_SECRET
   Value: shopping-macumba-super-secret-jwt-2024-MUDE
   ```
   
   ```
   Key: JWT_EXPIRES_IN
   Value: 7d
   ```
   
   ```
   Key: FRONTEND_URL
   Value: https://shopping-macumba-frontend.onrender.com
   ```

5. **Clique em "Save Changes"**

6. **Vá em "Settings"** e corrija:
   - Root Directory: `backend`
   - Build Command: `npm install && npx prisma generate && npm run build`
   - Start Command: `npm run start:prod`

7. **Salve e faça "Manual Deploy"**

---

### Frontend (Criar novo serviço):

1. **Dashboard**: https://dashboard.render.com → "New" → "Web Service"

2. **Selecione o repo**: `developeragencia/macumba26`

3. **Configure**:
   ```
   Name: shopping-macumba-frontend
   Branch: main
   Root Directory: frontend
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

4. **Adicione as variáveis** antes de criar:
   ```
   NODE_ENV=production
   PORT=10000
   NEXT_PUBLIC_API_URL=https://macumba26.onrender.com
   NEXTAUTH_URL=https://shopping-macumba-frontend.onrender.com
   NEXTAUTH_SECRET=nextauth-secret-aqui
   ```

5. **Create Web Service**

---

## 🔒 SEGURANÇA: Gerar Secrets Aleatórios

### Para gerar secrets seguros, use Node.js:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Ou online: https://randomkeygen.com/

**Use valores diferentes para**:
- `JWT_SECRET`
- `NEXTAUTH_SECRET`

---

## ✅ CHECKLIST:

### Backend:
- [ ] NODE_ENV = production
- [ ] PORT = 10000
- [ ] DATABASE_URL configurado
- [ ] JWT_SECRET configurado
- [ ] JWT_EXPIRES_IN = 7d
- [ ] FRONTEND_URL configurado
- [ ] Root Directory = backend
- [ ] Build Command correto
- [ ] Start Command correto
- [ ] Manual Deploy executado

### Frontend:
- [ ] NODE_ENV = production
- [ ] PORT = 10000
- [ ] NEXT_PUBLIC_API_URL configurado
- [ ] NEXTAUTH_URL configurado
- [ ] NEXTAUTH_SECRET configurado
- [ ] Root Directory = frontend
- [ ] Build Command correto
- [ ] Start Command correto
- [ ] Serviço criado e deployado

---

## 🧪 TESTAR APÓS CONFIGURAR:

### 1. Backend Health Check:
```bash
curl https://macumba26.onrender.com/api/health
```

### 2. Frontend:
```
https://shopping-macumba-frontend.onrender.com
```

### 3. Logs do Backend:
```
https://dashboard.render.com/web/srv-d40k70vgi27c73fkv1ig/logs
```

---

## 📊 ARQUIVO DE REFERÊNCIA:

Veja `render-env-vars.json` para a lista completa de todas as variáveis em formato JSON.

---

**Configure no Dashboard agora! 🚀**

