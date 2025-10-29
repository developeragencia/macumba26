<?php

namespace App\Controllers;

class OrderController extends BaseController
{
    public function index(): void
    {
        $this->requireAuth();
        $this->json(['orders' => []]);
    }

    public function store(): void
    {
        $this->requireAuth();
        $data = $this->getJsonInput();
        $this->json(['message' => 'Order created'], 201);
    }

    public function show(int $id): void
    {
        $this->requireAuth();
        $this->json(['order' => ['id' => $id]]);
    }
}

