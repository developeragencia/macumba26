# 🔧 Configurar Serviço Correto no Render

## ⚠️ Service ID: srv-d40l4rumcj7s73fgk9s0

O serviço `srv-d40l4rumcj7s73fgk9s0` não foi encontrado via API. 

Isso pode significar:
1. É um serviço em outro workspace
2. Foi recém-criado e ainda não sincronizou
3. Precisa ser criado

---

## 🚀 SOLUÇÃO: Configure Manualmente no Dashboard

### **PASSO 1: Acesse o Serviço**

Abra: https://dashboard.render.com/web/srv-d40l4rumcj7s73fgk9s0

Se der erro "Not Found", você precisa:
- Criar um novo serviço
- Ou verificar o ID correto no dashboard

---

## 📝 CONFIGURAÇÕES NECESSÁRIAS:

### **Settings → Build & Deploy:**

```
Root Directory:  backend
Build Command:   npm install && npx prisma generate && npm run build
Start Command:   npm run start:prod
Auto-Deploy:     Yes
Branch:          main
```

---

### **Settings → Environment Variables:**

Adicione estas 6 variáveis (clique em "Add Environment Variable"):

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

## 🆕 SE PRECISA CRIAR UM NOVO SERVIÇO:

### **1. Dashboard → New + → Web Service**

### **2. Conecte o Repositório:**
```
Repository: developeragencia/macumba26
Branch: main
```

### **3. Configure:**
```
Name:            shopping-macumba-backend
Region:          Oregon (US West)
Root Directory:  backend
Build Command:   npm install && npx prisma generate && npm run build
Start Command:   npm run start:prod
Plan:            Starter (ou Free)
```

### **4. Adicione as Variáveis** (antes de criar):

Cole as 6 variáveis listadas acima.

### **5. Create Web Service**

O Render iniciará o primeiro deploy automaticamente.

---

## 🔍 VERIFICAR ID CORRETO DO SERVIÇO:

1. Vá para: https://dashboard.render.com/
2. Clique no serviço "macumba26" ou "shopping-macumba-backend"
3. Na URL do navegador, veja o ID:
   ```
   https://dashboard.render.com/web/srv-XXXXXXXXXXXXXXX
                                    ^^^^^^^^^^^^^^^^^^^^
                                    Este é o Service ID
   ```
4. Copie o ID correto
5. Me informe para atualizar os scripts

---

## 📋 LISTA DE SERVIÇOS DISPONÍVEIS:

Para ver todos os seus serviços:
https://dashboard.render.com/

---

## 🆘 SE O SERVIÇO JÁ EXISTE:

1. Encontre o serviço correto no dashboard
2. Copie o Service ID da URL
3. Abra: https://dashboard.render.com/web/[SEU-SERVICE-ID]/env
4. Adicione as variáveis manualmente
5. Vá em Settings e corrija Root Directory e Commands
6. Faça Manual Deploy

---

## ✅ APÓS CONFIGURAR:

### Teste o Health Check:
```
https://[SEU-SERVICO].onrender.com/api/health
```

Deve retornar:
```json
{"status":"ok","timestamp":"..."}
```

---

## 💡 DICA:

Se você acabou de criar o serviço, pode levar alguns minutos para aparecer na API. Nesse caso, configure manualmente via Dashboard.

---

**Configure via Dashboard e me informe quando estiver pronto! 🚀**

