<?php

namespace App\Controllers;

use App\Models\Product;

class ProductController extends BaseController
{
    public function index(): void
    {
        $products = Product::getAll();
        $this->json(['products' => $products]);
    }

    public function show(int $id): void
    {
        $product = Product::findById($id);
        
        if (!$product) {
            $this->json(['error' => 'Produto não encontrado'], 404);
        }
        
        $this->json(['product' => $product]);
    }

    public function store(): void
    {
        $this->requireAuth();
        
        $data = $this->getJsonInput();
        $product = Product::create($data);
        
        $this->json(['product' => $product], 201);
    }

    public function update(int $id): void
    {
        $this->requireAuth();
        
        $data = $this->getJsonInput();
        Product::update($id, $data);
        
        $product = Product::findById($id);
        $this->json(['product' => $product]);
    }

    public function destroy(int $id): void
    {
        $this->requireAuth();
        
        Product::delete($id);
        $this->json(['message' => 'Produto deletado com sucesso']);
    }

    // Web pages
    public function list(): void
    {
        $products = Product::getAll();
        $this->view('products/list', ['products' => $products]);
    }

    public function details(int $id): void
    {
        $product = Product::findById($id);
        
        if (!$product) {
            $this->view('errors/404');
            return;
        }
        
        $this->view('products/details', ['product' => $product]);
    }
}

