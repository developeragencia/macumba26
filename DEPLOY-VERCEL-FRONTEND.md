# 🚀 DEPLOY DO FRONTEND NO VERCEL

## ⚠️ POR QUE VERCEL?

O Render atingiu o **limite de builds gratuitos**. Vercel é:
- ✅ **100% GRÁTIS** para Next.js
- ✅ **Builds ilimitados**
- ✅ **Melhor performance** (especializado em Next.js)
- ✅ **Deploy automático** do GitHub
- ✅ **SSL grátis**

---

## 📋 PASSO A PASSO:

### **1. ACESSE O VERCEL**

https://vercel.com

**Faça login com GitHub** (mesma conta do repositório)

---

### **2. CRIAR NOVO PROJETO**

1. Clique em **"Add New"** → **"Project"**

2. **Selecione o repositório**: `developeragencia/macumba26`

3. **Configure o projeto**:

```
Framework Preset: Next.js
Root Directory: frontend     ← IMPORTANTE!
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

---

### **3. ADICIONAR VARIÁVEIS DE AMBIENTE**

Na seção "Environment Variables", adicione:

```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://macumba26-2kl4.onrender.com
NEXTAUTH_URL=https://macumba26-frontend.vercel.app
NEXTAUTH_SECRET=macumba-nextauth-secret-2024-CHANGE-IN-PRODUCTION
```

**⚠️ IMPORTANTE**: O `NEXTAUTH_URL` será atualizado após o deploy!

---

### **4. FAZER DEPLOY**

1. Clique em **"Deploy"**

2. **Aguarde 2-3 minutos**

3. Vercel vai:
   - ✅ Clonar o repositório
   - ✅ Instalar dependências
   - ✅ Buildar o Next.js
   - ✅ Fazer deploy

---

### **5. APÓS DEPLOY BEM-SUCEDIDO**

Você receberá uma URL tipo:
```
https://macumba26-frontend.vercel.app
```

**Atualize a variável `NEXTAUTH_URL`**:

1. Vá em **Settings** → **Environment Variables**
2. Edite `NEXTAUTH_URL` com a URL real
3. **Redeploy** (Settings → Deployments → Redeploy)

---

## 🔧 CONFIGURAR AUTO-DEPLOY

Vercel já configura automaticamente:
- ✅ Todo push na branch `main` = deploy automático
- ✅ Pull Requests = preview deploy
- ✅ Rollback fácil

---

## 🌐 URLS FINAIS:

```
Backend (Render):  https://macumba26-2kl4.onrender.com
Frontend (Vercel): https://macumba26-frontend.vercel.app
Banco (Neon):      PostgreSQL conectado
```

---

## 🎯 VANTAGENS DO VERCEL:

### **Performance**:
- ✅ Edge Network global
- ✅ CDN automático
- ✅ Image Optimization
- ✅ Caching inteligente

### **Developer Experience**:
- ✅ Preview deploys para PRs
- ✅ Logs em tempo real
- ✅ Analytics grátis
- ✅ Zero configuração

### **Custo**:
- ✅ **100% GRÁTIS** para projetos pessoais
- ✅ Builds ilimitados
- ✅ Bandwidth generoso

---

## 📱 ALTERNATIVA: NETLIFY

Se preferir Netlify ao invés de Vercel:

1. **Acesse**: https://netlify.com
2. **Mesma config** que Vercel
3. **Root Directory**: `frontend`
4. **Build**: `npm run build`
5. **Publish**: `.next`

---

## ⚠️ PROBLEMAS COMUNS:

### **Erro: "Root Directory inválido"**
- ✅ **Solução**: Root Directory = `frontend` (sem barra)

### **Erro: "Build failed"**
- ✅ **Solução**: Verificar se `frontend/package.json` existe
- ✅ Verificar se todas as dependências estão no `package.json`

### **Erro: "NEXTAUTH_URL undefined"**
- ✅ **Solução**: Adicionar variável no Vercel Settings
- ✅ Fazer redeploy após adicionar

---

## 🎉 RESULTADO FINAL:

```
✅ Backend: https://macumba26-2kl4.onrender.com (ONLINE)
✅ Frontend: https://macumba26-frontend.vercel.app (SERÁ ONLINE)
✅ Banco: Neon PostgreSQL (CONECTADO)
✅ GitHub: Auto-deploy configurado
```

---

## 📞 PRÓXIMOS PASSOS:

1. ✅ Deploy no Vercel (5 minutos)
2. ✅ Testar frontend conectado ao backend
3. ✅ Configurar domínio customizado (opcional)
4. ✅ Adicionar Google OAuth (opcional)

---

**🔴⚪⚫ Frontend no Vercel = Deploy rápido e grátis! 🚀**

---

## 🆘 SE PRECISAR DE AJUDA:

**Vercel Docs**: https://vercel.com/docs/frameworks/nextjs
**Vercel Support**: https://vercel.com/support

