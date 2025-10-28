# 🚀 CRIAR SERVIÇO RENDER DO ZERO - Shopping da Macumba

## ⚠️ SITUAÇÃO ATUAL:

O serviço `srv-d40l4rumcj7s73fgk9s0` **NÃO EXISTE** no workspace atual.

**Serviços disponíveis**:
- `srv-d3vsptq4d50c73e5h7b0` - dashtools
- `srv-d3u43eeuk2gs73dirqc0` - mix01

**Solução**: Criar um NOVO serviço corretamente configurado desde o início.

---

## 📝 PASSO A PASSO PARA CRIAR O SERVIÇO:

### **PASSO 1: Acessar o Dashboard**

**Acesse**: https://dashboard.render.com/

---

### **PASSO 2: Criar Novo Web Service**

1. Clique em **"New +"** (botão azul no topo direito)
2. Selecione **"Web Service"**

---

### **PASSO 3: Conectar o Repositório**

1. Se já estiver conectado ao GitHub, você verá seus repositórios
2. Procure por: **`developeragencia/macumba26`**
3. Clique em **"Connect"**

**Se não aparecer**:
- Clique em "Connect GitHub"
- Autorize o Render
- Selecione o repositório `macumba26`

---

### **PASSO 4: Configurar o Serviço**

Na página de configuração, preencha:

#### **Basic Info:**
```
Name:              shopping-macumba-backend
Region:            Oregon (US West)
Branch:            main
```

#### **Build & Deploy Settings:**
```
Root Directory:    backend          ← CRÍTICO!
Runtime:           Node
Build Command:     npm install && npx prisma generate && npm run build
Start Command:     npm run start:prod
```

#### **Instance Type:**
```
Plan:              Starter ($7/month)
                   ou
                   Free (750 hours/month)
```

---

### **PASSO 5: Adicionar Variáveis de Ambiente**

**ANTES de clicar em "Create Web Service"**, role até a seção **"Environment Variables"**

Clique em **"Add Environment Variable"** e adicione estas 6 variáveis:

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
**⚠️ Copie EXATAMENTE como está!**

#### 4. JWT_SECRET
```
Key:   JWT_SECRET
Value: shopping-macumba-super-secret-jwt-2024-CHANGE-THIS
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

---

### **PASSO 6: Criar o Serviço**

1. **Revise** todas as configurações
2. Confirme que **Root Directory = backend**
3. Confirme que as **6 variáveis** foram adicionadas
4. Clique em **"Create Web Service"**

O Render iniciará o primeiro deploy automaticamente! 🚀

---

## 📊 ACOMPANHAR O DEPLOY:

### O que acontecerá:

1. **Cloning repository** (30s)
2. **Installing dependencies** (2-3 min)
3. **Generating Prisma Client** (30s)
4. **Building NestJS** (1-2 min)
5. **Starting server** (30s)

**Tempo total**: 5-8 minutos

---

### **Logs Esperados (SUCESSO):**

```
Jan 1 00:00:00 ==> Cloning from https://github.com/developeragencia/macumba26...
Jan 1 00:00:05 ==> Checking out commit f11beab in branch main
Jan 1 00:00:06 ==> Using root directory: backend
Jan 1 00:00:10 ==> Running build command 'npm install && npx prisma generate && npm run build'...
Jan 1 00:00:15 npm WARN deprecated inflight@1.0.6...
Jan 1 00:00:20 added 500 packages in 45s
Jan 1 00:01:00 ==> Generating Prisma Client...
Jan 1 00:01:10 Environment variables loaded from .env
Jan 1 00:01:11 Prisma schema loaded from prisma/schema.prisma
Jan 1 00:01:30 ✔ Generated Prisma Client (v5.8.0)
Jan 1 00:01:35 ==> Building NestJS application...
Jan 1 00:02:00 ✔ Successfully compiled: 85 modules
Jan 1 00:02:30 ==> Build successful! Starting deployment...
Jan 1 00:03:00 ==> Starting service with 'npm run start:prod'
Jan 1 00:03:05 > shopping-da-macumba-backend@1.0.0 start:prod
Jan 1 00:03:05 > node dist/main
Jan 1 00:03:10 🚀 Application is running on: http://0.0.0.0:10000/api
Jan 1 00:03:10 🔗 Frontend URL: https://shopping-macumba-frontend.onrender.com
Jan 1 00:03:15 ==> Your service is live 🎉
```

---

### **Logs de ERRO (comuns):**

#### ❌ Erro 1: "Cannot find module '@prisma/client'"
```
Error: Cannot find module '@prisma/client'
```
**Causa**: Falta `npx prisma generate` no Build Command
**Solução**: Build Command deve ser: `npm install && npx prisma generate && npm run build`

---

#### ❌ Erro 2: "package.json not found"
```
Error: ENOENT: no such file or directory, open '/opt/render/project/src/package.json'
```
**Causa**: Root Directory incorreto ou vazio
**Solução**: Root Directory = `backend`

---

#### ❌ Erro 3: "Database connection failed"
```
Error: Can't reach database server at ep-morning-fog...
```
**Causa**: DATABASE_URL incorreta ou sem SSL
**Solução**: Adicione `?sslmode=require` no final da DATABASE_URL

---

#### ❌ Erro 4: "Port already in use"
```
Error: listen EADDRINUSE: address already in use :::3001
```
**Causa**: Variável PORT incorreta
**Solução**: PORT = `10000` (não 3001)

---

## ✅ VERIFICAR SE FUNCIONOU:

### 1. Status "Live" no Dashboard
Quando o deploy terminar, o status mudará para **"Live"** (verde)

### 2. Copiar a URL do Serviço
No dashboard, copie a URL do serviço (algo como):
```
https://shopping-macumba-backend.onrender.com
```

### 3. Testar o Health Check
Abra no navegador ou use curl:
```bash
curl https://shopping-macumba-backend.onrender.com/api/health
```

**Resposta esperada**:
```json
{
  "status": "ok",
  "timestamp": "2024-10-28T23:45:00.000Z"
}
```

Se retornar isso, **SUCESSO!** 🎉

---

## 🎨 PRÓXIMO PASSO: CRIAR FRONTEND

Após o backend funcionar, crie o frontend:

### **Dashboard → New + → Web Service**

```
Name:              shopping-macumba-frontend
Repository:        developeragencia/macumba26
Branch:            main
Root Directory:    frontend       ← IMPORTANTE!
Build Command:     npm install && npm run build
Start Command:     npm start
Plan:              Starter
```

**Variáveis do Frontend**:
```
NODE_ENV              = production
PORT                  = 10000
NEXT_PUBLIC_API_URL   = [URL-DO-BACKEND]/api
NEXTAUTH_URL          = [URL-DO-FRONTEND]
NEXTAUTH_SECRET       = gere-um-secret-aleatorio
```

---

## 📋 CHECKLIST FINAL:

Antes de criar o serviço:
- [ ] Nome: shopping-macumba-backend ✓
- [ ] Repositório: macumba26 conectado ✓
- [ ] Branch: main ✓
- [ ] Root Directory: `backend` ✓
- [ ] Build Command correto ✓
- [ ] Start Command: `npm run start:prod` ✓
- [ ] 6 variáveis adicionadas ✓

Após criar:
- [ ] Deploy iniciado automaticamente ✓
- [ ] Logs mostram progresso ✓
- [ ] Status mudou para "Live" ✓
- [ ] Health check retorna {"status":"ok"} ✓

---

## 🆘 SE ALGO DER ERRADO:

1. **Verifique os logs** no Dashboard → Logs
2. **Identifique o erro** (veja seção "Logs de ERRO" acima)
3. **Corrija no Settings** → Build & Deploy
4. **Faça um novo deploy** → Manual Deploy

---

## 💡 DICAS:

### Gerar JWT_SECRET aleatório:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Verificar banco de dados:
Se suspeitar que o problema é o banco:
```bash
psql postgresql://neondb_owner:npg_pxLcEBae0WI3@ep-morning-fog-adjltjzj-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
```

---

## 🔗 LINKS ÚTEIS:

- **Dashboard**: https://dashboard.render.com/
- **GitHub**: https://github.com/developeragencia/macumba26
- **Neon**: https://console.neon.tech/
- **Docs Render**: https://render.com/docs/deploy-node-express-app

---

**Siga este guia e em 10 minutos terá um serviço funcionando! 🚀**

**Após criar, me informe o novo Service ID para eu atualizar os scripts!**

