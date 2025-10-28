# 🔧 Scripts de Automação - Render

## 📝 update-render-env.js

Script para adicionar/atualizar variáveis de ambiente no Render via API.

### 🚀 Como Usar:

#### 1. Obter API Key do Render:

1. Acesse: https://dashboard.render.com/u/settings#api-keys
2. Clique em **"Create API Key"**
3. Dê um nome: `Shopping da Macumba`
4. Copie a chave gerada (começa com `rnd_...`)

#### 2. Instalar Dependências:

```bash
npm install axios
```

Ou se preferir global:
```bash
npm install -g axios
```

#### 3. Configurar API Key:

**Windows (PowerShell):**
```powershell
$env:RENDER_API_KEY="rnd_sua_chave_aqui"
```

**Mac/Linux:**
```bash
export RENDER_API_KEY=rnd_sua_chave_aqui
```

#### 4. Executar o Script:

```bash
node scripts/update-render-env.js
```

---

## 📊 O que o script faz:

1. ✅ Conecta na API do Render
2. ✅ Obtém variáveis existentes
3. ✅ Adiciona/atualiza as seguintes variáveis:
   - `NODE_ENV`
   - `PORT`
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `JWT_EXPIRES_IN`
   - `FRONTEND_URL`
4. ✅ Mostra o resultado de cada operação

---

## 🎯 Output Esperado:

```
🔧 Atualizando variáveis de ambiente no Render...

📋 Obtendo variáveis existentes...
✅ Encontradas 2 variáveis existentes

📝 Processando: NODE_ENV
   ✅ Criada: NODE_ENV
📝 Processando: PORT
   ✅ Criada: PORT
📝 Processando: DATABASE_URL
   ✅ Criada: DATABASE_URL
📝 Processando: JWT_SECRET
   ✅ Criada: JWT_SECRET
📝 Processando: JWT_EXPIRES_IN
   ✅ Criada: JWT_EXPIRES_IN
📝 Processando: FRONTEND_URL
   ✅ Criada: FRONTEND_URL

🎉 Variáveis de ambiente atualizadas com sucesso!

🚀 Próximos passos:
1. Verifique no Dashboard: https://dashboard.render.com/web/srv-d40k70vgi27c73fkv1ig/env
2. Faça um deploy manual do serviço
3. Verifique os logs para confirmar que tudo está funcionando
```

---

## ⚠️ Erros Comuns:

### Erro: "RENDER_API_KEY não configurada"
**Solução**: Configure a variável de ambiente antes de executar

### Erro: "Cannot find module 'axios'"
**Solução**: Execute `npm install axios`

### Erro: "Unauthorized"
**Solução**: Verifique se a API Key está correta e ativa

### Erro: "Service not found"
**Solução**: Verifique o SERVICE_ID no script (srv-d40k70vgi27c73fkv1ig)

---

## 🔐 Segurança:

- ⚠️ **NUNCA** commite a API Key no Git
- ✅ Use variáveis de ambiente
- ✅ A API Key é pessoal e dá acesso total à sua conta Render
- ✅ Revogue a chave se suspeitar de comprometimento

---

## 🎨 Personalizar:

Para adicionar mais variáveis, edite o array `envVars` no script:

```javascript
const envVars = [
  // ... variáveis existentes ...
  {
    key: 'NOVA_VARIAVEL',
    value: 'seu_valor'
  }
];
```

---

## 📚 Referências:

- API Render: https://api-docs.render.com/
- API Keys: https://dashboard.render.com/u/settings#api-keys
- Variáveis de Ambiente: https://render.com/docs/environment-variables

---

**Desenvolvido por: Alex Moura**
**Data: 28/10/2024**

