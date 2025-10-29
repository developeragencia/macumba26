<?php

namespace App\Models;

use App\Core\Database;

class Product
{
    public static function getAll(): array
    {
        return Database::query("SELECT * FROM products ORDER BY created_at DESC");
    }

    public static function findById(int $id): ?array
    {
        $result = Database::query("SELECT * FROM products WHERE id = ? LIMIT 1", [$id]);
        return $result[0] ?? null;
    }

    public static function create(array $data): array
    {
        Database::execute(
            "INSERT INTO products (vendor_id, category_id, name, slug, description, price, stock, status, created_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())",
            [
                $data['vendor_id'] ?? null,
                $data['category_id'] ?? null,
                $data['name'],
                $data['slug'] ?? strtolower(str_replace(' ', '-', $data['name'])),
                $data['description'] ?? '',
                $data['price'],
                $data['stock'] ?? 0,
                $data['status'] ?? 'active',
            ]
        );
        
        return self::findById((int)Database::lastInsertId());
    }

    public static function update(int $id, array $data): bool
    {
        $sets = [];
        $params = [];
        
        foreach ($data as $key => $value) {
            if (in_array($key, ['name', 'description', 'price', 'stock', 'status'])) {
                $sets[] = "$key = ?";
                $params[] = $value;
            }
        }
        
        $params[] = $id;
        return Database::execute(
            "UPDATE products SET " . implode(', ', $sets) . ", updated_at = NOW() WHERE id = ?",
            $params
        );
    }

    public static function delete(int $id): bool
    {
        return Database::execute("DELETE FROM products WHERE id = ?", [$id]);
    }
}

