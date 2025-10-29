<?php

namespace App\Models;

use App\Core\Database;

class Review
{
    public static function getByProductId(int $productId): array
    {
        return Database::query(
            "SELECT r.*, u.name as user_name FROM reviews r 
             JOIN users u ON r.user_id = u.id 
             WHERE r.product_id = ? ORDER BY r.created_at DESC",
            [$productId]
        );
    }

    public static function create(array $data): array
    {
        Database::execute(
            "INSERT INTO reviews (user_id, product_id, rating, comment, created_at) 
             VALUES (?, ?, ?, ?, NOW())",
            [
                $data['user_id'],
                $data['product_id'],
                $data['rating'],
                $data['comment'] ?? '',
            ]
        );
        
        $result = Database::query(
            "SELECT * FROM reviews WHERE id = ? LIMIT 1",
            [Database::lastInsertId()]
        );
        return $result[0] ?? [];
    }

    public static function getAverageRating(int $productId): float
    {
        $result = Database::query(
            "SELECT AVG(rating) as avg_rating FROM reviews WHERE product_id = ?",
            [$productId]
        );
        
        return (float)($result[0]['avg_rating'] ?? 0);
    }
}

