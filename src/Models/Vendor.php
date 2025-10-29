<?php

namespace App\Models;

use App\Core\Database;

class Vendor
{
    public static function getAll(): array
    {
        return Database::query("SELECT * FROM vendors ORDER BY created_at DESC");
    }

    public static function findById(int $id): ?array
    {
        $result = Database::query("SELECT * FROM vendors WHERE id = ? LIMIT 1", [$id]);
        return $result[0] ?? null;
    }

    public static function findByUserId(int $userId): ?array
    {
        $result = Database::query("SELECT * FROM vendors WHERE user_id = ? LIMIT 1", [$userId]);
        return $result[0] ?? null;
    }

    public static function create(array $data): array
    {
        Database::execute(
            "INSERT INTO vendors (user_id, business_name, description, subscription_tier, created_at) 
             VALUES (?, ?, ?, ?, NOW())",
            [
                $data['user_id'],
                $data['business_name'],
                $data['description'] ?? '',
                $data['subscription_tier'] ?? 'free',
            ]
        );
        
        return self::findById((int)Database::lastInsertId());
    }

    public static function updateSubscription(int $id, string $tier): bool
    {
        return Database::execute(
            "UPDATE vendors SET subscription_tier = ?, updated_at = NOW() WHERE id = ?",
            [$tier, $id]
        );
    }
}

