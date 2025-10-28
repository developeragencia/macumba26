# Script PowerShell para corrigir configuração do Render via API

$API_KEY = "rnd_IZEmZlABhzFJKUMPusvBVW0XcepG"
$SERVICE_ID = "srv-d40l4rumcj7s73fgk9s0"  # Serviço correto atualizado

Write-Host "Corrigindo configuracao do servico Render..." -ForegroundColor Yellow
Write-Host "Service ID: $SERVICE_ID" -ForegroundColor Cyan
Write-Host ""

# Configurações corretas
$body = @{
    rootDir = "backend"
    buildCommand = "npm install; npx prisma generate; npm run build"
    startCommand = "npm run start:prod"
} | ConvertTo-Json

# Atualizar serviço
try {
    $headers = @{
        "Authorization" = "Bearer $API_KEY"
        "Content-Type" = "application/json"
    }
    
    Write-Host "Atualizando configuracoes do servico..." -ForegroundColor Yellow
    $response = Invoke-RestMethod -Uri "https://api.render.com/v1/services/$SERVICE_ID" `
        -Method Patch `
        -Headers $headers `
        -Body $body
    
    Write-Host "Configuracao atualizada com sucesso!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Configuracoes aplicadas:" -ForegroundColor Cyan
    Write-Host "   Root Directory: backend"
    Write-Host "   Build Command: npm install; npx prisma generate; npm run build"
    Write-Host "   Start Command: npm run start:prod"
    Write-Host ""
} catch {
    Write-Host "Erro ao atualizar configuracoes: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Detalhes: $($_.ErrorDetails.Message)" -ForegroundColor Red
    Write-Host ""
}

# Adicionar variáveis de ambiente
Write-Host "Adicionando variaveis de ambiente..." -ForegroundColor Yellow
Write-Host ""

$envVars = @(
    @{ key = "NODE_ENV"; value = "production" },
    @{ key = "PORT"; value = "10000" },
    @{ key = "DATABASE_URL"; value = "postgresql://neondb_owner:npg_pxLcEBae0WI3@ep-morning-fog-adjltjzj-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require" },
    @{ key = "JWT_SECRET"; value = "shopping-macumba-super-secret-jwt-2024-CHANGE" },
    @{ key = "JWT_EXPIRES_IN"; value = "7d" },
    @{ key = "FRONTEND_URL"; value = "https://shopping-macumba-frontend.onrender.com" }
)

foreach ($env in $envVars) {
    try {
        $envBody = $env | ConvertTo-Json
        
        Invoke-RestMethod -Uri "https://api.render.com/v1/services/$SERVICE_ID/env-vars" `
            -Method Post `
            -Headers $headers `
            -Body $envBody `
            -ErrorAction Stop
        
        Write-Host "   OK: $($env.key)" -ForegroundColor Green
    } catch {
        # Tentar atualizar se já existe
        try {
            Invoke-RestMethod -Uri "https://api.render.com/v1/services/$SERVICE_ID/env-vars/$($env.key)" `
                -Method Put `
                -Headers $headers `
                -Body (@{ value = $env.value } | ConvertTo-Json) `
                -ErrorAction Stop
            Write-Host "   ATUALIZADO: $($env.key)" -ForegroundColor Cyan
        } catch {
            Write-Host "   Aviso: $($env.key) (erro: $($_.Exception.Message))" -ForegroundColor Yellow
        }
    }
}

Write-Host ""
Write-Host "Processo concluido!" -ForegroundColor Green
Write-Host ""
Write-Host "Proximos passos:" -ForegroundColor Cyan
Write-Host "1. Acesse: https://dashboard.render.com/web/$SERVICE_ID"
Write-Host "2. Verifique as configuracoes em Settings"
Write-Host "3. Verifique as variaveis em Environment"
Write-Host "4. Faca um Manual Deploy"
Write-Host "5. Aguarde o build (5-10 minutos)"
Write-Host "6. Teste o health check"
Write-Host ""
Write-Host "URL do servico: Verifique no dashboard" -ForegroundColor Cyan
