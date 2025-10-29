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
                // Usar variáveis separadas do .env
                $host = $_ENV['DB_HOST'] ?? 'localhost';
                $port = $_ENV['DB_PORT'] ?? '5432';
                $dbname = $_ENV['DB_DATABASE'] ?? 'shopping_macumba';
                $user = $_ENV['DB_USERNAME'] ?? 'postgres';
                $password = $_ENV['DB_PASSWORD'] ?? '';
                
                $dsn = "pgsql:host=$host;port=$port;dbname=$dbname";
                
                // Adicionar sslmode apenas se não for localhost
                if ($host !== 'localhost' && $host !== '127.0.0.1') {
                    $dsn .= ";sslmode=require";
                }
                
                self::$connection = new PDO($dsn, $user, $password, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ]);
                
            } catch (PDOException $e) {
                // Log error e mostrar mensagem amigável
                error_log("Database connection failed: " . $e->getMessage());
                
                if ($_ENV['APP_DEBUG'] ?? false) {
                    die("❌ Erro de conexão com banco de dados: " . $e->getMessage());
                } else {
                    die("❌ Erro de conexão com banco de dados. Verifique as configurações.");
                }
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
