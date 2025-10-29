# ⚙️ CONFIGURAÇÃO COMPLETA DO FRONTEND NO RENDER

## 🎯 SERVIÇO A USAR: `shopping-macumba-front`

**ID:** `srv-d40ocsgdl3ps73d6k5eg`  
**URL:** https://shopping-macumba-front.onrender.com  
**Dashboard:** https://dashboard.render.com/web/srv-d40ocsgdl3ps73d6k5eg

---

## 🔧 PASSO 1: CONFIGURAR ROOT DIRECTORY

### Acesse: Settings → Build & Deploy

**⚠️ IMPORTANTE: O Dockerfile está em `frontend/`, então precisa configurar:**

```
Root Directory: frontend
```

**OU alterar os comandos para:**

```
Build Command: cd frontend && docker build -t frontend .
Start Command: cd frontend && docker run -p 3000:3000 frontend
```

**MELHOR OPÇÃO:** Configure `Root Directory = frontend`

---

## 🔐 PASSO 2: ADICIONAR VARIÁVEIS DE AMBIENTE

### Acesse: Environment

Adicione TODAS estas variáveis:

```bash
NODE_ENV=production
PORT=3000

# API Backend
NEXT_PUBLIC_API_URL=https://macumba26-2kl4.onrender.com

# NextAuth
NEXTAUTH_URL=https://shopping-macumba-front.onrender.com
NEXTAUTH_SECRET=macumba-nextauth-secret-production-2024-CHANGE-THIS

# Google OAuth (OPCIONAL - se não tiver, deixe vazio)
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# Cloudinary (se usar upload de imagens no frontend)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your-api-key
```

---

## 🐳 PASSO 3: CONFIGURAR DOCKER BUILD

### Como o Dockerfile está em `frontend/`:

**OPÇÃO A - Melhor (Configure Root Directory):**
1. Settings → Build & Deploy
2. Root Directory: `frontend`
3. Build Command: (deixe vazio ou use o padrão do Dockerfile)
4. Start Command: (deixe vazio ou use o padrão do Dockerfile)

**OPÇÃO B - Alternativa (Sem Root Directory):**
1. Settings → Build & Deploy
2. Root Directory: (vazio)
3. Build Command: `docker build -t frontend ./frontend`
4. Start Command: `docker run -p 10000:3000 frontend`

---

## 🚀 PASSO 4: FAZER DEPLOY

1. Salve todas as configurações
2. Clique em **"Manual Deploy"**
3. Selecione **"Deploy latest commit"** (commit `e85c34a`)
4. Aguarde o build com Docker

---

## ✅ CHECKLIST DE VERIFICAÇÃO

- [ ] Root Directory configurado como `frontend`
- [ ] Variáveis de ambiente adicionadas
- [ ] `NEXTAUTH_SECRET` alterado (use valor único!)
- [ ] Build Command correto (ou vazio se usar Root Directory)
- [ ] Deploy manual iniciado
- [ ] Logs verificados (sem erros de Dockerfile)

---

## 🔗 CONEXÃO BACKEND ↔ FRONTEND

**Backend URL:** https://macumba26-2kl4.onrender.com  
**Frontend URL:** https://shopping-macumba-front.onrender.com

**Teste o backend:**
```bash
curl https://macumba26-2kl4.onrender.com/api/health
```

**Deve retornar:**
```json
{"status": "ok"}
```

---

## 🆘 SE O DOCKER FALHAR

**Erro:** `failed to read dockerfile`

**Solução:** Verifique se:
1. Root Directory = `frontend` OU
2. Build Command aponta para `./frontend/Dockerfile`

**Render procura Dockerfile em:**
- Se Root Directory = `frontend` → `frontend/Dockerfile` ✅
- Se Root Directory = vazio → `./Dockerfile` ❌ (não existe!)

---

## 📝 COMANDOS DE BUILD CORRETOS

### Se Root Directory = `frontend`:
```bash
Build Command: (vazio - usa Dockerfile)
Start Command: (vazio - usa CMD do Dockerfile)
```

### Se Root Directory = vazio:
```bash
Build Command: docker build -f frontend/Dockerfile -t frontend ./frontend
Start Command: docker run -p $PORT:3000 frontend
```

---

## 🎯 RESUMO

1. ✅ Dockerfile criado em `frontend/Dockerfile`
2. ✅ next.config.js configurado com `output: 'standalone'`
3. ✅ Commit e push feitos (e85c34a)
4. ⏳ Configure Root Directory = `frontend`
5. ⏳ Adicione variáveis de ambiente
6. ⏳ Faça deploy manual

**ACESSE AGORA:** https://dashboard.render.com/web/srv-d40ocsgdl3ps73d6k5eg

---

## 🔑 GERAR NEXTAUTH_SECRET

Execute localmente:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Ou online: https://generate-secret.vercel.app/32

**Copie o valor gerado e cole em `NEXTAUTH_SECRET`!**

