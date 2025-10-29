<?php

namespace App\Models;

use App\Core\Database;

class Order
{
    public static function getAll(): array
    {
        return Database::query("SELECT * FROM orders ORDER BY created_at DESC");
    }

    public static function findById(int $id): ?array
    {
        $result = Database::query("SELECT * FROM orders WHERE id = ? LIMIT 1", [$id]);
        return $result[0] ?? null;
    }

    public static function getByUserId(int $userId): array
    {
        return Database::query(
            "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
            [$userId]
        );
    }

    public static function create(array $data): array
    {
        $orderNumber = 'ORD-' . time() . '-' . rand(1000, 9999);
        
        Database::execute(
            "INSERT INTO orders (user_id, vendor_id, order_number, status, payment_method, 
             payment_status, subtotal, shipping, total, shipping_address, created_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())",
            [
                $data['user_id'],
                $data['vendor_id'] ?? null,
                $orderNumber,
                $data['status'] ?? 'pending',
                $data['payment_method'] ?? 'pix',
                $data['payment_status'] ?? 'pending',
                $data['subtotal'],
                $data['shipping'] ?? 0,
                $data['total'],
                json_encode($data['shipping_address'] ?? []),
            ]
        );
        
        return self::findById((int)Database::lastInsertId());
    }

    public static function updateStatus(int $id, string $status): bool
    {
        return Database::execute(
            "UPDATE orders SET status = ?, updated_at = NOW() WHERE id = ?",
            [$status, $id]
        );
    }
}

