<?php
/**
 * Script de Instalação - Shopping da Macumba
 * Execute este arquivo UMA VEZ após fazer upload para a Hostinger
 * Acesse: https://seudominio.com/install.php
 */

// Verificar se já foi instalado
if (file_exists(__DIR__ . '/.installed')) {
    die('❌ A aplicação já foi instalada. Delete o arquivo .installed para reinstalar.');
}

?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Instalação - Shopping da Macumba</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">
    <div class="container mx-auto px-4 py-12">
        <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h1 class="text-3xl font-bold text-red-800 mb-6">🕯️ Shopping da Macumba - Instalação</h1>
            
            <?php
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                // Processar instalação
                $errors = [];
                $success = [];
                
                // 1. Verificar PHP Version
                if (version_compare(PHP_VERSION, '8.0.0', '<')) {
                    $errors[] = "PHP 8.0+ é necessário. Versão atual: " . PHP_VERSION;
                } else {
                    $success[] = "✅ PHP " . PHP_VERSION . " OK";
                }
                
                // 2. Verificar extensões necessárias
                $required_extensions = ['pdo', 'json', 'mbstring'];
                $optional_extensions = ['pdo_pgsql', 'pdo_mysql'];
                
                foreach ($required_extensions as $ext) {
                    if (!extension_loaded($ext)) {
                        $errors[] = "Extensão PHP necessária não encontrada: {$ext}";
                    } else {
                        $success[] = "✅ Extensão {$ext} OK";
                    }
                }
                
                // Verificar se tem pelo menos um driver de banco
                $has_db_driver = false;
                foreach ($optional_extensions as $ext) {
                    if (extension_loaded($ext)) {
                        $success[] = "✅ Extensão {$ext} OK";
                        $has_db_driver = true;
                    }
                }
                
                if (!$has_db_driver) {
                    $errors[] = "Nenhum driver de banco encontrado. Ative pdo_pgsql ou pdo_mysql no cPanel > Select PHP Version";
                }
                
                // 3. Criar arquivo .env
                $db_host = $_POST['db_host'] ?? 'localhost';
                $db_port = $_POST['db_port'] ?? '5432';
                $db_name = $_POST['db_name'] ?? '';
                $db_user = $_POST['db_user'] ?? '';
                $db_pass = $_POST['db_pass'] ?? '';
                $app_url = $_POST['app_url'] ?? '';
                
                if (empty($db_name) || empty($db_user) || empty($app_url)) {
                    $errors[] = "Todos os campos são obrigatórios!";
                } else {
                    $env_content = "# Database Configuration\n";
                    $env_content .= "DB_HOST={$db_host}\n";
                    $env_content .= "DB_PORT={$db_port}\n";
                    $env_content .= "DB_DATABASE={$db_name}\n";
                    $env_content .= "DB_USERNAME={$db_user}\n";
                    $env_content .= "DB_PASSWORD={$db_pass}\n\n";
                    $env_content .= "# Application\n";
                    $env_content .= "APP_ENV=production\n";
                    $env_content .= "APP_DEBUG=false\n";
                    $env_content .= "APP_URL={$app_url}\n\n";
                    $env_content .= "# Session\n";
                    $env_content .= "SESSION_LIFETIME=120\n";
                    $env_content .= "SESSION_SECURE=true\n";
                    
                    if (file_put_contents(__DIR__ . '/.env', $env_content)) {
                        $success[] = "✅ Arquivo .env criado";
                        chmod(__DIR__ . '/.env', 0600);
                    } else {
                        $errors[] = "Erro ao criar arquivo .env. Verifique permissões.";
                    }
                }
                
                // 4. Testar conexão com banco
                if (empty($errors)) {
                    try {
                        $dsn = "pgsql:host={$db_host};port={$db_port};dbname={$db_name}";
                        $pdo = new PDO($dsn, $db_user, $db_pass);
                        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                        $success[] = "✅ Conexão com banco de dados OK";
                        
                        // Verificar se as tabelas existem
                        $stmt = $pdo->query("SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users'");
                        if ($stmt->fetchColumn() > 0) {
                            $success[] = "✅ Tabelas já existem no banco";
                        } else {
                            $errors[] = "⚠️ Tabelas não encontradas. Execute as migrations em database/migrations.sql";
                        }
                    } catch (PDOException $e) {
                        $errors[] = "Erro ao conectar no banco: " . $e->getMessage();
                    }
                }
                
                // 5. Verificar permissões de pastas
                $writable_dirs = ['.'];
                foreach ($writable_dirs as $dir) {
                    if (is_writable($dir)) {
                        $success[] = "✅ Pasta {$dir}/ com permissões OK";
                    } else {
                        $errors[] = "Pasta {$dir}/ não tem permissão de escrita. Execute: chmod 755 {$dir}";
                    }
                }
                
                // Verificar vendor (aviso, não erro)
                if (file_exists('vendor')) {
                    if (is_writable('vendor')) {
                        $success[] = "✅ Pasta vendor/ com permissões OK";
                    } else {
                        $success[] = "⚠️ Pasta vendor/ sem permissão de escrita (pode ignorar se já tem dependências)";
                    }
                } else {
                    $success[] = "⚠️ Pasta vendor/ não existe (execute: composer install)";
                }
                
                // 6. Marcar como instalado se tudo OK
                if (empty($errors)) {
                    file_put_contents(__DIR__ . '/.installed', date('Y-m-d H:i:s'));
                    echo '<div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">';
                    echo '<strong>🎉 INSTALAÇÃO CONCLUÍDA!</strong><br>';
                    echo 'Próximos passos:<br>';
                    echo '1. <strong>DELETE</strong> o arquivo install.php por segurança<br>';
                    echo '2. Execute as migrations no banco de dados (se ainda não fez)<br>';
                    echo '3. Acesse: <a href="' . $app_url . '" class="underline">' . $app_url . '</a><br>';
                    echo '</div>';
                }
                
                // Exibir sucessos
                if (!empty($success)) {
                    echo '<div class="bg-blue-50 border border-blue-200 rounded p-4 mb-4">';
                    foreach ($success as $msg) {
                        echo "<p class='text-sm text-blue-800'>{$msg}</p>";
                    }
                    echo '</div>';
                }
                
                // Exibir erros
                if (!empty($errors)) {
                    echo '<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">';
                    echo '<strong>❌ Erros encontrados:</strong><ul class="list-disc ml-6 mt-2">';
                    foreach ($errors as $error) {
                        echo "<li>{$error}</li>";
                    }
                    echo '</ul></div>';
                }
            }
            ?>
            
            <form method="POST" class="space-y-4">
                <div>
                    <label class="block text-sm font-bold mb-2">URL do Site</label>
                    <input type="url" name="app_url" required 
                           value="<?= $_POST['app_url'] ?? 'https://' ?>"
                           placeholder="https://shoppingdamacumba.com"
                           class="w-full border rounded px-3 py-2">
                    <p class="text-xs text-gray-600 mt-1">URL completa do seu domínio (com https://)</p>
                </div>
                
                <hr class="my-6">
                
                <h3 class="text-lg font-bold text-gray-800">Configurações do Banco de Dados</h3>
                <p class="text-sm text-gray-600">Obtenha estas informações no cPanel > Databases</p>
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-bold mb-2">Host</label>
                        <input type="text" name="db_host" required 
                               value="<?= $_POST['db_host'] ?? 'localhost' ?>"
                               class="w-full border rounded px-3 py-2">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-bold mb-2">Porta</label>
                        <input type="text" name="db_port" required 
                               value="<?= $_POST['db_port'] ?? '5432' ?>"
                               class="w-full border rounded px-3 py-2">
                    </div>
                </div>
                
                <div>
                    <label class="block text-sm font-bold mb-2">Nome do Banco</label>
                    <input type="text" name="db_name" required 
                           value="<?= $_POST['db_name'] ?? '' ?>"
                           placeholder="u123456789_macumba"
                           class="w-full border rounded px-3 py-2">
                </div>
                
                <div>
                    <label class="block text-sm font-bold mb-2">Usuário</label>
                    <input type="text" name="db_user" required 
                           value="<?= $_POST['db_user'] ?? '' ?>"
                           placeholder="u123456789_admin"
                           class="w-full border rounded px-3 py-2">
                </div>
                
                <div>
                    <label class="block text-sm font-bold mb-2">Senha</label>
                    <input type="password" name="db_pass" required 
                           value="<?= $_POST['db_pass'] ?? '' ?>"
                           class="w-full border rounded px-3 py-2">
                </div>
                
                <button type="submit" 
                        class="w-full bg-red-800 text-white py-3 rounded font-bold hover:bg-red-900">
                    Instalar Agora
                </button>
            </form>
            
            <div class="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
                <p class="text-sm text-yellow-800">
                    <strong>⚠️ IMPORTANTE:</strong><br>
                    • Certifique-se de ter criado o banco de dados no cPanel<br>
                    • Execute as migrations SQL antes de usar o sistema<br>
                    • Delete este arquivo (install.php) após a instalação<br>
                </p>
            </div>
        </div>
    </div>
</body>
</html>

