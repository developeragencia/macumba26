# Script PowerShell para corrigir configuração do Render via API

$API_KEY = "rnd_ttgfIUvmtvPME2Nnsl03jyFEabdb"  # API KEY ATUALIZADA
$SERVICE_ID = "srv-d40lj2jipnbc73ctbtc0"

Write-Host "Corrigindo configuracao do servico Render..." -ForegroundColor Yellow
Write-Host "Service ID: $SERVICE_ID" -ForegroundColor Cyan
Write-Host ""

# Configurações corretas
$body = @{
    rootDir = "backend"
    buildCommand = "npm install && npx prisma generate && npm run build"
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
    Write-Host "   Build Command: npm install && npx prisma generate && npm run build"
    Write-Host "   Start Command: npm run start:prod"
    Write-Host ""
} catch {
    Write-Host "Erro ao atualizar configuracoes: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

# Adicionar/Atualizar variáveis de ambiente
Write-Host "Adicionando/Atualizando variaveis de ambiente..." -ForegroundColor Yellow
Write-Host ""

$envVars = @(
    @{ key = "NODE_ENV"; value = "production" },
    @{ key = "PORT"; value = "10000" },
    @{ key = "DATABASE_URL"; value = "postgresql://neondb_owner:npg_pxLcEBae0WI3@ep-morning-fog-adjltjzj-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require" },
    @{ key = "JWT_SECRET"; value = "shopping-macumba-super-secret-jwt-2024-CHANGE" },
    @{ key = "JWT_EXPIRES_IN"; value = "7d" },
    @{ key = "FRONTEND_URL"; value = "https://shopping-macumba-frontend.onrender.com" }
)

$successCount = 0
$errorCount = 0

foreach ($env in $envVars) {
    try {
        $envBody = $env | ConvertTo-Json
        
        # Tentar criar
        Invoke-RestMethod -Uri "https://api.render.com/v1/services/$SERVICE_ID/env-vars" `
            -Method Post `
            -Headers $headers `
            -Body $envBody `
            -ErrorAction Stop
        
        Write-Host "   OK: $($env.key)" -ForegroundColor Green
        $successCount++
    } catch {
        # Se falhar, tentar atualizar
        try {
            $updateBody = @{ value = $env.value } | ConvertTo-Json
            Invoke-RestMethod -Uri "https://api.render.com/v1/services/$SERVICE_ID/env-vars/$($env.key)" `
                -Method Put `
                -Headers $headers `
                -Body $updateBody `
                -ErrorAction Stop
            Write-Host "   ATUALIZADO: $($env.key)" -ForegroundColor Cyan
            $successCount++
        } catch {
            Write-Host "   ERRO: $($env.key)" -ForegroundColor Red
            $errorCount++
        }
    }
}

Write-Host ""
if ($errorCount -gt 0) {
    Write-Host "Algumas variaveis falharam ($errorCount). Configure manualmente:" -ForegroundColor Yellow
    Write-Host "https://dashboard.render.com/web/$SERVICE_ID/env" -ForegroundColor Cyan
} else {
    Write-Host "Sucesso! $successCount variaveis configuradas!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Proximos passos:" -ForegroundColor Cyan
Write-Host "1. Acesse: https://dashboard.render.com/web/$SERVICE_ID"
Write-Host "2. Verifique Settings -> Build & Deploy"
Write-Host "3. Verifique Environment (6 variaveis)"
Write-Host "4. Clique em Manual Deploy -> Clear build cache & deploy"
Write-Host ""
Write-Host "Dashboard: https://dashboard.render.com/web/$SERVICE_ID" -ForegroundColor Green
