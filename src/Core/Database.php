<?php

namespace App\Core;

use PDO;
use PDOException;

class Database
{
    private static ?PDO $connection = null;

    public static function init(): void
    {
        if (self::$connection === null) {
            try {
                // Tentar obter configuração de variáveis de ambiente
                $host = $_ENV['DB_HOST'] ?? 'localhost';
                $port = $_ENV['DB_PORT'] ?? '3306';
                $dbname = $_ENV['DB_DATABASE'] ?? $_ENV['DB_NAME'] ?? 'shopping_macumba';
                $user = $_ENV['DB_USERNAME'] ?? $_ENV['DB_USER'] ?? 'root';
                $password = $_ENV['DB_PASSWORD'] ?? $_ENV['DB_PASS'] ?? '';
                $driver = $_ENV['DB_DRIVER'] ?? 'mysql'; // 'mysql' ou 'pgsql'
                
                // Detectar driver automaticamente baseado nas extensões disponíveis
                if ($driver === 'pgsql' && !extension_loaded('pdo_pgsql')) {
                    $driver = 'mysql';
                    $port = '3306'; // Porta padrão MySQL
                }
                
                // Construir DSN baseado no driver
                if ($driver === 'mysql') {
                    $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";
                } else {
                    $dsn = "pgsql:host=$host;port=$port;dbname=$dbname";
                }
                
                self::$connection = new PDO($dsn, $user, $password, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ]);
                
            } catch (PDOException $e) {
                error_log("Database connection failed: " . $e->getMessage());
                die("Erro de conexão com banco de dados. Verifique as credenciais no arquivo .env");
            }
        }
    }

    public static function getConnection(): PDO
    {
        if (self::$connection === null) {
            self::init();
        }
        return self::$connection;
    }

    public static function query(string $sql, array $params = []): array
    {
        $stmt = self::getConnection()->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    public static function execute(string $sql, array $params = []): bool
    {
        $stmt = self::getConnection()->prepare($sql);
        return $stmt->execute($params);
    }

    public static function lastInsertId(): string
    {
        return self::getConnection()->lastInsertId();
    }
}
