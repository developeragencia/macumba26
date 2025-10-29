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
                $dsn = $_ENV['DATABASE_URL'] ?? 'postgresql://localhost/shopping_macumba';
                
                // Parse PostgreSQL connection string
                if (strpos($dsn, 'postgresql://') === 0) {
                    $parts = parse_url($dsn);
                    $host = $parts['host'];
                    $port = $parts['port'] ?? 5432;
                    $dbname = ltrim($parts['path'], '/');
                    $user = $parts['user'];
                    $password = $parts['pass'];
                    
                    $dsn = "pgsql:host=$host;port=$port;dbname=$dbname;sslmode=require";
                    
                    self::$connection = new PDO($dsn, $user, $password, [
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                        PDO::ATTR_EMULATE_PREPARES => false,
                    ]);
                }
            } catch (PDOException $e) {
                die("Database connection failed: " . $e->getMessage());
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

