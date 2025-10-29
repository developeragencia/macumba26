<?php
/**
 * Clear Cache Script
 * Acesse: https://seudominio.com/clear_cache.php
 * Use quando precisar limpar cache do OPCache
 * DELETE este arquivo após uso por segurança
 */

// Security check - apenas em modo de desenvolvimento ou com senha
$password = 'macumba2024'; // MUDE ESTA SENHA!

if (!isset($_GET['pass']) || $_GET['pass'] !== $password) {
    die('❌ Acesso negado. Use: ?pass=sua_senha');
}

?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clear Cache - Shopping da Macumba</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8">
    <div class="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 class="text-2xl font-bold text-red-800 mb-4">🧹 Clear Cache</h1>
        
        <?php
        $results = [];
        
        // Clear OPCache
        if (function_exists('opcache_reset')) {
            if (opcache_reset()) {
                $results[] = ['success' => true, 'message' => '✅ OPCache limpo com sucesso'];
            } else {
                $results[] = ['success' => false, 'message' => '❌ Erro ao limpar OPCache'];
            }
        } else {
            $results[] = ['success' => false, 'message' => '⚠️ OPCache não está disponível'];
        }
        
        // Clear session files
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        session_destroy();
        $results[] = ['success' => true, 'message' => '✅ Sessões limpas'];
        
        // Show PHP info
        $results[] = ['success' => true, 'message' => 'ℹ️ PHP Version: ' . PHP_VERSION];
        $results[] = ['success' => true, 'message' => 'ℹ️ Server: ' . $_SERVER['SERVER_SOFTWARE']];
        
        // Display results
        foreach ($results as $result) {
            $bgColor = $result['success'] ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800';
            echo "<div class='mb-2 p-3 border rounded {$bgColor}'>{$result['message']}</div>";
        }
        ?>
        
        <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p class="text-sm text-yellow-800">
                <strong>⚠️ SEGURANÇA:</strong> Delete este arquivo após uso!
            </p>
        </div>
        
        <a href="/" class="mt-4 inline-block bg-red-800 text-white px-6 py-2 rounded hover:bg-red-900">
            Voltar ao site
        </a>
    </div>
</body>
</html>

