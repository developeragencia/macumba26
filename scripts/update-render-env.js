#!/usr/bin/env node

/**
 * Script para adicionar variáveis de ambiente no Render via API
 * 
 * USO:
 * 1. Instale axios: npm install axios
 * 2. Configure sua API Key do Render: export RENDER_API_KEY=sua-api-key
 * 3. Execute: node scripts/update-render-env.js
 */

const axios = require('axios');

// Configurações
const RENDER_API_KEY = process.env.RENDER_API_KEY || 'rnd_YOUR_API_KEY_HERE';
const SERVICE_ID = 'srv-d40k70vgi27c73fkv1ig'; // Backend service

// Variáveis de ambiente para o BACKEND
const envVars = [
  {
    key: 'NODE_ENV',
    value: 'production'
  },
  {
    key: 'PORT',
    value: '10000'
  },
  {
    key: 'DATABASE_URL',
    value: 'postgresql://neondb_owner:npg_pxLcEBae0WI3@ep-morning-fog-adjltjzj-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require'
  },
  {
    key: 'JWT_SECRET',
    value: 'shopping-macumba-super-secret-jwt-2024-CHANGE-THIS'
  },
  {
    key: 'JWT_EXPIRES_IN',
    value: '7d'
  },
  {
    key: 'FRONTEND_URL',
    value: 'https://shopping-macumba-frontend.onrender.com'
  }
];

async function updateEnvironmentVariables() {
  try {
    console.log('🔧 Atualizando variáveis de ambiente no Render...\n');

    // Obter variáveis existentes
    console.log('📋 Obtendo variáveis existentes...');
    const getResponse = await axios.get(
      `https://api.render.com/v1/services/${SERVICE_ID}/env-vars`,
      {
        headers: {
          'Authorization': `Bearer ${RENDER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const existingVars = getResponse.data;
    console.log(`✅ Encontradas ${existingVars.length} variáveis existentes\n`);

    // Atualizar/adicionar cada variável
    for (const envVar of envVars) {
      try {
        console.log(`📝 Processando: ${envVar.key}`);
        
        // Verificar se já existe
        const existing = existingVars.find(v => v.key === envVar.key);
        
        if (existing) {
          // Atualizar
          await axios.put(
            `https://api.render.com/v1/services/${SERVICE_ID}/env-vars/${envVar.key}`,
            { value: envVar.value },
            {
              headers: {
                'Authorization': `Bearer ${RENDER_API_KEY}`,
                'Content-Type': 'application/json'
              }
            }
          );
          console.log(`   ✅ Atualizada: ${envVar.key}`);
        } else {
          // Criar nova
          await axios.post(
            `https://api.render.com/v1/services/${SERVICE_ID}/env-vars`,
            envVar,
            {
              headers: {
                'Authorization': `Bearer ${RENDER_API_KEY}`,
                'Content-Type': 'application/json'
              }
            }
          );
          console.log(`   ✅ Criada: ${envVar.key}`);
        }
      } catch (error) {
        console.error(`   ❌ Erro ao processar ${envVar.key}:`, error.response?.data || error.message);
      }
    }

    console.log('\n🎉 Variáveis de ambiente atualizadas com sucesso!');
    console.log('\n🚀 Próximos passos:');
    console.log('1. Verifique no Dashboard: https://dashboard.render.com/web/srv-d40k70vgi27c73fkv1ig/env');
    console.log('2. Faça um deploy manual do serviço');
    console.log('3. Verifique os logs para confirmar que tudo está funcionando');

  } catch (error) {
    console.error('\n❌ Erro ao atualizar variáveis:', error.response?.data || error.message);
    console.error('\n💡 Dicas:');
    console.error('1. Verifique se a RENDER_API_KEY está correta');
    console.error('2. Obtenha sua API key em: https://dashboard.render.com/u/settings#api-keys');
    console.error('3. Configure: export RENDER_API_KEY=sua-api-key');
    process.exit(1);
  }
}

// Executar
if (!RENDER_API_KEY || RENDER_API_KEY === 'rnd_YOUR_API_KEY_HERE') {
  console.error('❌ RENDER_API_KEY não configurada!');
  console.error('\n📝 Como configurar:');
  console.error('1. Acesse: https://dashboard.render.com/u/settings#api-keys');
  console.error('2. Clique em "Create API Key"');
  console.error('3. Copie a chave gerada');
  console.error('4. Execute: export RENDER_API_KEY=rnd_sua_chave_aqui');
  console.error('5. Execute novamente este script: node scripts/update-render-env.js');
  process.exit(1);
}

updateEnvironmentVariables();

