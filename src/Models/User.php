<?php

namespace App\Models;

use App\Core\Database;

class User
{
    public static function findByEmail(string $email): ?array
    {
        $result = Database::query(
            "SELECT * FROM users WHERE email = ? LIMIT 1",
            [$email]
        );
        
        return $result[0] ?? null;
    }

    public static function findById(int $id): ?array
    {
        $result = Database::query(
            "SELECT * FROM users WHERE id = ? LIMIT 1",
            [$id]
        );
        
        return $result[0] ?? null;
    }

    public static function create(array $data): ?array
    {
        Database::execute(
            "INSERT INTO users (email, password, name, role, created_at) VALUES (?, ?, ?, ?, NOW())",
            [
                $data['email'],
                $data['password'],
                $data['name'],
                $data['role'] ?? 'user',
            ]
        );
        
        $id = Database::lastInsertId();
        return self::findById((int)$id);
    }

    public static function update(int $id, array $data): bool
    {
        $sets = [];
        $params = [];
        
        foreach ($data as $key => $value) {
            $sets[] = "$key = ?";
            $params[] = $value;
        }
        
        $params[] = $id;
        $sql = "UPDATE users SET " . implode(', ', $sets) . ", updated_at = NOW() WHERE id = ?";
        
        return Database::execute($sql, $params);
    }
}

