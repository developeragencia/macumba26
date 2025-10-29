# 🚀 DEPLOY MANUAL DO FRONTEND NO RENDER

## ⚠️ RENDER BLOQUEOU BUILDS!

Erro: **"Build spend limit reached"**

Você precisa aumentar o limite em: https://dashboard.render.com/settings/billing

---

## 📋 DELETAR O SERVIÇO STATIC SITE ERRADO:

1. **Acesse**: https://dashboard.render.com/static/srv-d40nnj15pdvs73d920d0

2. **Settings** → **Delete Service**

3. Digite o nome para confirmar: `shopping-macumba-frontend`

4. **Delete**

---

## 🆕 CRIAR NOVO WEB SERVICE (CORRETO):

### **1. Acesse**: https://dashboard.render.com/create?type=web

### **2. Connect Repository**: `developeragencia/macumba26`

### **3. Configurações**:

```
Name: macumba26-frontend
Runtime: Node
Region: Oregon
Branch: main

Root Directory: frontend     ← CRÍTICO!

Build Command:
npm install && npm run build

Start Command:
npm start

Instance Type: Starter (Free)
```

### **4. Environment Variables**:

Adicione estas 5 variáveis:

```env
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_API_URL=https://macumba26-2kl4.onrender.com
NEXTAUTH_URL=https://macumba26-frontend.onrender.com
NEXTAUTH_SECRET=macumba-nextauth-secret-2024-CHANGE
```

### **5. Create Web Service**

---

## ⚠️ SE DER ERRO "Build limit exceeded":

Você TEM QUE:

### **OPÇÃO 1: Upgrade Render (Pago)**
- https://dashboard.render.com/settings/billing
- Adicione cartão de crédito
- Aumenta limite de builds

### **OPÇÃO 2: Aguardar Reset**
- Limite reseta todo mês
- Não pode fazer mais builds até lá

### **OPÇÃO 3: Usar Vercel (Grátis)**
- Leia `DEPLOY-VERCEL-FRONTEND.md`
- Vercel = Builds ilimitados grátis

---

## 📊 STATUS ATUAL:

```
✅ Backend: https://macumba26-2kl4.onrender.com (ONLINE)
⚠️  Frontend: Bloqueado por limite de builds
✅ Banco: Neon PostgreSQL (CONECTADO)
```

---

## 💡 RENDER vs VERCEL:

| Feature | Render | Vercel |
|---------|--------|--------|
| Builds gratuitos | ⚠️ Limitado (~400 min/mês) | ✅ Ilimitado |
| Next.js | ✅ Funciona | ✅ Otimizado |
| Deploy automático | ✅ Sim | ✅ Sim |
| Performance | ✅ Boa | ✅ Excelente |
| **Custo** | ⚠️ Limite alcançado | ✅ 100% Grátis |

---

## 🎯 RECOMENDAÇÃO:

**Para desenvolvimento**: Use Vercel (grátis, ilimitado)
**Para produção**: Pague Render ou use Vercel

---

**🔴⚪⚫ O backend está ONLINE! Frontend aguarda limite de build! 🚀**

