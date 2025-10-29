<?php

namespace App\Models;

use App\Core\Database;

class Category
{
    public static function getAll(): array
    {
        return Database::query("SELECT * FROM categories ORDER BY name ASC");
    }

    public static function findById(int $id): ?array
    {
        $result = Database::query("SELECT * FROM categories WHERE id = ? LIMIT 1", [$id]);
        return $result[0] ?? null;
    }

    public static function findBySlug(string $slug): ?array
    {
        $result = Database::query("SELECT * FROM categories WHERE slug = ? LIMIT 1", [$slug]);
        return $result[0] ?? null;
    }

    public static function create(array $data): array
    {
        Database::execute(
            "INSERT INTO categories (name, slug, description, parent_id, created_at) 
             VALUES (?, ?, ?, ?, NOW())",
            [
                $data['name'],
                $data['slug'] ?? strtolower(str_replace(' ', '-', $data['name'])),
                $data['description'] ?? '',
                $data['parent_id'] ?? null,
            ]
        );
        
        return self::findById((int)Database::lastInsertId());
    }
}

