# 🚀 SETUP COMPLETO DO FRONTEND - MANUAL

## ⚠️ IMPORTANTE: O MCP/API ESTÁ BLOQUEADO!

O Render bloqueou operações via API devido ao limite de builds.  
**VOCÊ PRECISA CONFIGURAR MANUALMENTE NO PAINEL.**

---

## 📋 SERVIÇOS DISPONÍVEIS

Você tem 3 serviços frontend criados. Escolha UM para usar:

### 1️⃣ **shopping-macumba-front** (RECOMENDADO)
- **ID:** `srv-d40ocsgdl3ps73d6k5eg`
- **URL:** https://shopping-macumba-front.onrender.com
- **Dashboard:** https://dashboard.render.com/web/srv-d40ocsgdl3ps73d6k5eg

### 2️⃣ **macumba26-front**
- **ID:** `srv-d40ob16r433s73a45ge0`
- **URL:** https://macumba26-front.onrender.com
- **Dashboard:** https://dashboard.render.com/web/srv-d40ob16r433s73a45ge0

### 3️⃣ **macumba26-frontend**
- **ID:** `srv-d40o6bp5pdvs73d9db6g`
- **URL:** https://macumba26-frontend.onrender.com
- **Dashboard:** https://dashboard.render.com/web/srv-d40o6bp5pdvs73d9db6g

---

## 🔧 PASSO 1: CONFIGURAR VARIÁVEIS DE AMBIENTE

### Acesse o Dashboard do serviço escolhido

Clique em: **Environment** (menu lateral)

### Adicione TODAS estas variáveis:

```bash
# Ambiente
NODE_ENV=production
PORT=3000

# Backend API
NEXT_PUBLIC_API_URL=https://macumba26-2kl4.onrender.com

# NextAuth - IMPORTANTE: Use a URL do SEU serviço!
NEXTAUTH_URL=https://shopping-macumba-front.onrender.com
NEXTAUTH_SECRET=d8f7a9b2c5e6f1a3d4b7c8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1

# Google OAuth (OPCIONAL - deixe vazio se não tiver)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Cloudinary (OPCIONAL - para upload de imagens)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_API_KEY=
```

**⚠️ ATENÇÃO:**
- Se escolheu `macumba26-front`, use: `NEXTAUTH_URL=https://macumba26-front.onrender.com`
- Se escolheu `macumba26-frontend`, use: `NEXTAUTH_URL=https://macumba26-frontend.onrender.com`

### Como adicionar:
1. Clique em **"Add Environment Variable"**
2. Digite o **Key** (exemplo: `NODE_ENV`)
3. Digite o **Value** (exemplo: `production`)
4. Clique em **"Add"**
5. Repita para TODAS as variáveis acima
6. Clique em **"Save Changes"**

---

## 🐳 PASSO 2: VERIFICAR BUILD & DEPLOY SETTINGS

### Acesse: Settings → Build & Deploy

**Verifique se está assim:**

```
Root Directory: (vazio ou deixe em branco)
Build Command: (deixe vazio - usa Dockerfile)
Start Command: (deixe vazio - usa Dockerfile)
Docker Command: (deixe vazio - usa Dockerfile)
```

**O Dockerfile na raiz do projeto já está configurado!**

Se quiser, pode configurar:
```
Build Command: docker build -t frontend .
```

Mas NÃO é necessário se deixar vazio.

---

## 🚀 PASSO 3: FAZER DEPLOY MANUAL

1. Volte para a página principal do serviço
2. Clique em **"Manual Deploy"** (botão no canto superior direito)
3. Selecione **"Deploy latest commit"**
4. Aguarde o build (pode demorar 5-10 minutos)

---

## 📊 PASSO 4: MONITORAR O BUILD

### Acesse: Logs (menu lateral)

**O que você deve ver:**

```
==> Cloning from https://github.com/developeragencia/macumba26
==> Checking out commit 7a81d41...
==> Building Docker image...
#1 [internal] load build definition from Dockerfile
#2 [internal] load .dockerignore
#3 [deps] RUN npm install --legacy-peer-deps
...
==> Build successful 🎉
==> Deploying...
==> Running Docker container on port 3000
==> Your service is live at https://[seu-serviço].onrender.com
```

---

## ✅ PASSO 5: VERIFICAR SE ESTÁ FUNCIONANDO

### Teste o backend primeiro:
```bash
curl https://macumba26-2kl4.onrender.com/api/health
```

**Deve retornar:**
```json
{"status":"ok"}
```

### Teste o frontend:
Acesse no navegador:
```
https://shopping-macumba-front.onrender.com
```

**Deve carregar a página inicial do Shopping da Macumba!**

---

## 🔗 CONECTAR BACKEND ↔ FRONTEND

O frontend já está configurado para se conectar ao backend via:
```
NEXT_PUBLIC_API_URL=https://macumba26-2kl4.onrender.com
```

**Teste a integração:**
1. Acesse o frontend
2. Tente fazer login ou registrar
3. Verifique se as requisições estão indo para o backend

---

## 🆘 TROUBLESHOOTING

### ❌ Erro: "Cannot find module 'next'"
**Solução:** O build falhou. Verifique os logs e force um novo deploy.

### ❌ Erro: "NEXTAUTH_SECRET must be provided"
**Solução:** Adicione a variável `NEXTAUTH_SECRET` no Environment.

### ❌ Erro: "Failed to fetch API"
**Solução:** Verifique se `NEXT_PUBLIC_API_URL` está correto e se o backend está rodando.

### ❌ Erro: "Docker build failed"
**Solução:** Verifique se o commit `7a81d41` foi feito corretamente no GitHub.

### ❌ Build muito lento
**Solução:** Normal na primeira vez. Builds subsequentes serão mais rápidos devido ao cache.

---

## 📋 CHECKLIST FINAL

- [ ] Variáveis de ambiente adicionadas
- [ ] `NEXTAUTH_URL` configurado com a URL correta
- [ ] `NEXTAUTH_SECRET` adicionado (mínimo 32 caracteres)
- [ ] Build & Deploy settings verificados
- [ ] Deploy manual iniciado
- [ ] Logs verificados (sem erros)
- [ ] Frontend acessível no navegador
- [ ] Backend respondendo (`/api/health`)
- [ ] Integração frontend ↔ backend funcionando

---

## 🎯 RESUMO RÁPIDO

1. **Acesse:** https://dashboard.render.com/web/srv-d40ocsgdl3ps73d6k5eg
2. **Environment:** Adicione todas as variáveis
3. **Manual Deploy:** Deploy latest commit
4. **Aguarde:** 5-10 minutos para o build
5. **Teste:** Acesse https://shopping-macumba-front.onrender.com

---

## 🔑 GERAR NEXTAUTH_SECRET SEGURO

**Opção 1 - Online:**
https://generate-secret.vercel.app/32

**Opção 2 - Terminal:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Opção 3 - Python:**
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

**Copie o resultado e cole em `NEXTAUTH_SECRET`!**

---

## 📞 SUPORTE

**Backend funcionando:** ✅ https://macumba26-2kl4.onrender.com  
**Commit atual:** `7a81d41`  
**Dockerfile:** Na raiz do projeto (configurado)  
**package-lock.json:** No frontend (gerado)

---

## 🎉 APÓS O DEPLOY

**Seu sistema estará completo:**

- **Backend:** https://macumba26-2kl4.onrender.com ✅
- **Frontend:** https://shopping-macumba-front.onrender.com ⏳
- **Database:** Neon PostgreSQL ✅

**Tudo pronto para produção!** 🚀

---

**SIGA ESTE GUIA PASSO A PASSO E SEU FRONTEND VAI FUNCIONAR!** 💪

