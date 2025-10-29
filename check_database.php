<?php
/**
 * Script de Verificação do Banco de Dados
 * Acesse: https://seudominio.com/check_database.php
 * Use para verificar se todas as tabelas foram criadas
 */

require_once __DIR__ . '/vendor/autoload.php';

use Dotenv\Dotenv;

// Load environment variables
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verificação do Banco - Shopping da Macumba</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8">
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 class="text-3xl font-bold text-red-800 mb-6">🗄️ Verificação do Banco de Dados</h1>
        
        <?php
        try {
            // Conectar ao banco
            $host = $_ENV['DB_HOST'] ?? 'localhost';
            $port = $_ENV['DB_PORT'] ?? '5432';
            $dbname = $_ENV['DB_DATABASE'] ?? '';
            $user = $_ENV['DB_USERNAME'] ?? '';
            $password = $_ENV['DB_PASSWORD'] ?? '';
            
            echo "<div class='mb-6 p-4 bg-blue-50 border border-blue-200 rounded'>";
            echo "<h3 class='font-bold text-blue-800 mb-2'>📋 Configurações do Banco</h3>";
            echo "<p class='text-sm'><strong>Host:</strong> {$host}</p>";
            echo "<p class='text-sm'><strong>Porta:</strong> {$port}</p>";
            echo "<p class='text-sm'><strong>Banco:</strong> {$dbname}</p>";
            echo "<p class='text-sm'><strong>Usuário:</strong> {$user}</p>";
            echo "</div>";
            
            $dsn = "pgsql:host={$host};port={$port};dbname={$dbname}";
            if ($host !== 'localhost' && $host !== '127.0.0.1') {
                $dsn .= ";sslmode=require";
            }
            
            $pdo = new PDO($dsn, $user, $password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            echo "<div class='mb-6 p-4 bg-green-100 border border-green-400 rounded'>";
            echo "<p class='text-green-800 font-bold'>✅ Conexão com banco de dados: OK</p>";
            echo "</div>";
            
            // Verificar versão do PostgreSQL
            $stmt = $pdo->query("SELECT version()");
            $version = $stmt->fetchColumn();
            echo "<div class='mb-6 p-3 bg-gray-50 border rounded'>";
            echo "<p class='text-sm text-gray-700'><strong>PostgreSQL:</strong> {$version}</p>";
            echo "</div>";
            
            // Listar todas as tabelas esperadas
            $expected_tables = [
                'users',
                'vendors',
                'categories',
                'products',
                'orders',
                'order_items',
                'reviews',
                'subscriptions',
                'messages',
                'notifications',
                'blog_posts'
            ];
            
            echo "<h3 class='text-xl font-bold mb-4'>📊 Verificação de Tabelas</h3>";
            echo "<div class='space-y-2'>";
            
            $missing_tables = [];
            foreach ($expected_tables as $table) {
                $stmt = $pdo->prepare("
                    SELECT COUNT(*) 
                    FROM information_schema.tables 
                    WHERE table_schema = 'public' 
                    AND table_name = ?
                ");
                $stmt->execute([$table]);
                $exists = $stmt->fetchColumn() > 0;
                
                if ($exists) {
                    // Contar registros
                    $count_stmt = $pdo->query("SELECT COUNT(*) FROM {$table}");
                    $count = $count_stmt->fetchColumn();
                    
                    echo "<div class='flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded'>";
                    echo "<span class='font-semibold text-green-800'>✅ {$table}</span>";
                    echo "<span class='text-sm text-green-600'>{$count} registro(s)</span>";
                    echo "</div>";
                } else {
                    $missing_tables[] = $table;
                    echo "<div class='flex items-center p-3 bg-red-50 border border-red-200 rounded'>";
                    echo "<span class='font-semibold text-red-800'>❌ {$table} - FALTANDO</span>";
                    echo "</div>";
                }
            }
            
            echo "</div>";
            
            // Resumo
            $total = count($expected_tables);
            $found = $total - count($missing_tables);
            
            echo "<div class='mt-6 p-4 border rounded'>";
            echo "<h3 class='font-bold text-lg mb-2'>📈 Resumo</h3>";
            echo "<p class='text-2xl font-bold'>{$found} de {$total} tabelas criadas</p>";
            
            if (count($missing_tables) === 0) {
                echo "<div class='mt-4 p-4 bg-green-100 border border-green-400 rounded'>";
                echo "<p class='text-green-800 font-bold'>🎉 PARABÉNS! Todas as tabelas estão criadas!</p>";
                echo "<p class='text-sm text-green-700 mt-2'>Seu banco de dados está pronto para uso.</p>";
                echo "</div>";
            } else {
                echo "<div class='mt-4 p-4 bg-red-100 border border-red-400 rounded'>";
                echo "<p class='text-red-800 font-bold'>⚠️ ATENÇÃO! Faltam " . count($missing_tables) . " tabela(s):</p>";
                echo "<ul class='list-disc ml-6 mt-2 text-red-700'>";
                foreach ($missing_tables as $table) {
                    echo "<li>{$table}</li>";
                }
                echo "</ul>";
                echo "<p class='text-sm text-red-700 mt-4'><strong>Solução:</strong></p>";
                echo "<ol class='list-decimal ml-6 text-sm text-red-700'>";
                echo "<li>Acesse cPanel > phpPgAdmin</li>";
                echo "<li>Selecione seu banco de dados</li>";
                echo "<li>Clique em 'SQL'</li>";
                echo "<li>Cole TODO o conteúdo do arquivo <code>database/migrations.sql</code></li>";
                echo "<li>Clique em 'Execute'</li>";
                echo "</ol>";
                echo "</div>";
            }
            echo "</div>";
            
            // Verificar índices
            echo "<h3 class='text-xl font-bold mt-8 mb-4'>🔍 Índices Criados</h3>";
            $stmt = $pdo->query("
                SELECT indexname, tablename 
                FROM pg_indexes 
                WHERE schemaname = 'public' 
                AND indexname LIKE 'idx_%'
                ORDER BY tablename, indexname
            ");
            $indexes = $stmt->fetchAll();
            
            if (count($indexes) > 0) {
                echo "<div class='grid grid-cols-2 gap-2'>";
                foreach ($indexes as $index) {
                    echo "<div class='p-2 bg-gray-50 border rounded text-sm'>";
                    echo "<span class='text-gray-700'>{$index['indexname']}</span>";
                    echo "<span class='text-gray-500 ml-2'>({$index['tablename']})</span>";
                    echo "</div>";
                }
                echo "</div>";
            } else {
                echo "<p class='text-gray-600'>Nenhum índice personalizado encontrado.</p>";
            }
            
        } catch (PDOException $e) {
            echo "<div class='p-4 bg-red-100 border border-red-400 rounded'>";
            echo "<p class='text-red-800 font-bold'>❌ ERRO DE CONEXÃO</p>";
            echo "<p class='text-sm text-red-700 mt-2'>" . htmlspecialchars($e->getMessage()) . "</p>";
            echo "</div>";
            
            echo "<div class='mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded'>";
            echo "<p class='text-yellow-800 font-bold'>💡 Possíveis Soluções:</p>";
            echo "<ul class='list-disc ml-6 mt-2 text-sm text-yellow-700'>";
            echo "<li>Verifique se o arquivo .env existe e está configurado corretamente</li>";
            echo "<li>Confirme as credenciais do banco de dados no cPanel</li>";
            echo "<li>Certifique-se de que o banco foi criado no cPanel > PostgreSQL Databases</li>";
            echo "<li>Verifique se o usuário tem permissões no banco</li>";
            echo "</ul>";
            echo "</div>";
        }
        ?>
        
        <div class="mt-8 flex gap-4">
            <a href="/" class="bg-red-800 text-white px-6 py-2 rounded hover:bg-red-900">
                ← Voltar ao site
            </a>
            <button onclick="location.reload()" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                🔄 Verificar Novamente
            </button>
        </div>
        
        <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p class="text-sm text-yellow-800">
                <strong>⚠️ SEGURANÇA:</strong> Delete este arquivo (check_database.php) após verificar o banco!
            </p>
        </div>
    </div>
</body>
</html>

