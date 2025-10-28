#!/bin/bash

# Script para corrigir configuração do Render via API
# Execute: bash fix-render-config.sh

API_KEY="rnd_IZEmZlABhzFJKUMPusvBVW0XcepG"
SERVICE_ID="srv-d40k70vgi27c73fkv1ig"

echo "🔧 Corrigindo configuração do serviço Render..."
echo ""

# Atualizar configurações do serviço
curl -X PATCH "https://api.render.com/v1/services/${SERVICE_ID}" \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "rootDir": "backend",
    "buildCommand": "npm install && npx prisma generate && npm run build",
    "startCommand": "npm run start:prod"
  }'

echo ""
echo "✅ Configuração atualizada!"
echo ""
echo "🚀 Agora faça o deploy manual em:"
echo "https://dashboard.render.com/web/srv-d40k70vgi27c73fkv1ig"

