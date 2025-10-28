# 🚀 Guia de Deploy - Shopping da Macumba

## 📋 Pré-requisitos

- ✅ Conta no GitHub
- ✅ Conta no Render (ou Railway)
- ✅ Conta no Vercel (para frontend)
- ✅ Banco de dados Neon configurado

---

## 🔧 Configuração do Banco de Dados

### Neon PostgreSQL (Já Configurado)
```
✅ Projeto: shopping da macumba
✅ ID: polished-sunset-11171042
✅ Connection String: postgresql://neondb_owner:npg_pxLcEBae0WI3@ep-morning-fog-adjltjzj-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
```

---

## 🖥️ Deploy do Backend (Render)

### Opção 1: Via Dashboard Render

1. **Acesse**: https://render.com
2. **Clique em**: "New" → "Web Service"
3. **Conecte seu repositório**: `developeragencia/macumba26`
4. **Configure**:
   - Name: `shopping-macumba-backend`
   - Region: `Ohio (US East)`
   - Branch: `main`
   - Root Directory: `backend`
   - Runtime: `Node`
   - Build Command: `npm install && npx prisma generate && npm run build`
   - Start Command: `npm run start:prod`
   
5. **Environment Variables**:
   ```env
   NODE_ENV=production
   PORT=3001
   DATABASE_URL=postgresql://neondb_owner:npg_pxLcEBae0WI3@ep-morning-fog-adjltjzj-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
   JWT_SECRET=seu-jwt-secret-super-seguro-aqui-mudeme
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=https://shopping-macumba.vercel.app
   ```

6. **Deploy**: Clique em "Create Web Service"

### Opção 2: Via render.yaml (Blueprint)

1. **No Render Dashboard**: "New" → "Blueprint"
2. **Conecte o repo**: `developeragencia/macumba26`
3. O Render detectará automaticamente o `render.yaml`
4. Adicione as variáveis de ambiente manualmente
5. Deploy automático!

---

## 🌐 Deploy do Frontend (Vercel)

### Passo a Passo:

1. **Acesse**: https://vercel.com
2. **Clique em**: "Add New" → "Project"
3. **Import Git Repository**: `developeragencia/macumba26`
4. **Configure**:
   - Framework Preset: `Next.js`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   
5. **Environment Variables**:
   ```env
   NEXT_PUBLIC_API_URL=https://shopping-macumba-backend.onrender.com
   NEXTAUTH_URL=https://shopping-macumba.vercel.app
   NEXTAUTH_SECRET=seu-nextauth-secret-super-seguro
   ```

6. **Deploy**: Clique em "Deploy"

### Configurar Domínio Customizado (Opcional):
```
shopping-macumba.vercel.app → seu-dominio.com
```

---

## 🔗 URLs Finais

Após o deploy, você terá:

```
Backend API:  https://shopping-macumba-backend.onrender.com/api
Frontend:     https://shopping-macumba.vercel.app
Database:     Neon (já configurado)
```

---

## 🔐 Variáveis de Ambiente Necessárias

### Backend (.env):
```env
# Database
DATABASE_URL=postgresql://...

# JWT
JWT_SECRET=seu-jwt-secret-mudeme
JWT_EXPIRES_IN=7d

# App
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://shopping-macumba.vercel.app

# OAuth (Opcional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Cloudinary (Opcional)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Payments (Opcional)
MERCADO_PAGO_ACCESS_TOKEN=
STRIPE_SECRET_KEY=
PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=

# Email (Opcional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
```

### Frontend (.env.local):
```env
NEXT_PUBLIC_API_URL=https://shopping-macumba-backend.onrender.com
NEXTAUTH_URL=https://shopping-macumba.vercel.app
NEXTAUTH_SECRET=seu-nextauth-secret-mudeme

# OAuth (Opcional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

---

## 🧪 Testar Deployment

### 1. Backend Health Check:
```bash
curl https://shopping-macumba-backend.onrender.com/api/health
```

Resposta esperada:
```json
{
  "status": "ok",
  "timestamp": "2024-10-28T..."
}
```

### 2. Frontend:
Acesse: https://shopping-macumba.vercel.app

### 3. Teste API:
```bash
# Criar usuário
curl -X POST https://shopping-macumba-backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@exemplo.com",
    "password": "Senha123!",
    "name": "Usuário Teste"
  }'
```

---

## 🔄 CI/CD Automático

### Configurado automaticamente:
- ✅ Push para `main` → Deploy automático no Render
- ✅ Push para `main` → Deploy automático no Vercel
- ✅ Preview deployments para PRs no Vercel

---

## 📊 Monitoramento

### Render:
- Logs: Dashboard → seu-serviço → Logs
- Metrics: CPU, Memory, Response Time
- Alertas: Configure via email

### Vercel:
- Analytics: Dashboard → Analytics
- Logs: Dashboard → Deployments → Logs
- Performance: Insights automáticos

---

## 🆘 Troubleshooting

### Erro: "Module not found"
```bash
# No Render, adicione ao Build Command:
npm install && npx prisma generate && npm run build
```

### Erro: "Database connection failed"
```bash
# Verifique a DATABASE_URL no Render
# Certifique-se de que inclui ?sslmode=require
```

### Erro: "CORS blocked"
```bash
# No backend, verifique FRONTEND_URL
# Deve corresponder exatamente ao domínio do Vercel
```

### Frontend não conecta ao Backend:
```bash
# Verifique NEXT_PUBLIC_API_URL no Vercel
# Deve apontar para o URL do Render
```

---

## 📈 Otimizações Pós-Deploy

### 1. Habilitar CDN (Vercel):
✅ Automático para assets estáticos

### 2. Configurar Cache:
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
    formats: ['image/webp'],
  },
  swcMinify: true,
};
```

### 3. Database Connection Pool:
```javascript
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  pool_timeout = 60
  connection_limit = 10
}
```

---

## 🔒 Segurança Checklist

- [ ] Trocar todos os secrets (JWT_SECRET, NEXTAUTH_SECRET)
- [ ] Configurar CORS corretamente
- [ ] Habilitar HTTPS (automático no Render/Vercel)
- [ ] Configurar rate limiting
- [ ] Adicionar helmet.js no backend
- [ ] Configurar CSP no frontend
- [ ] Habilitar 2FA no GitHub/Render/Vercel

---

## 💰 Custos Estimados (Free Tier)

```
Render (Backend):     $0/mês (750h grátis)
Vercel (Frontend):    $0/mês (100GB bandwidth)
Neon (Database):      $0/mês (0.5GB storage)
TOTAL:                $0/mês ✅
```

### Upgrade futuro:
- Render Pro: $7/mês
- Vercel Pro: $20/mês
- Neon Scale: $19/mês

---

## 📞 Suporte

- Render: https://render.com/docs
- Vercel: https://vercel.com/docs
- Neon: https://neon.tech/docs

---

**Deploy preparado por: Alex Moura**
**Data: 28/10/2024**
**Versão: 1.0**

