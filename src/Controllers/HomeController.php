<?php

namespace App\Controllers;

use App\Models\Product;

class HomeController extends BaseController
{
    public function index(): void
    {
        $products = Product::getAll();
        $this->view('home', [
            'products' => array_slice($products, 0, 12),
            'user' => $this->getCurrentUser()
        ]);
    }
}

