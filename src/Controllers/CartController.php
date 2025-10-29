<?php

namespace App\Controllers;

class CartController extends BaseController
{
    public function index(): void
    {
        $this->view('cart/index', ['user' => $this->getCurrentUser()]);
    }
}

