<?php

namespace App\Controllers;

class CheckoutController extends BaseController
{
    public function index(): void
    {
        $this->requireAuth();
        $this->view('checkout/index', ['user' => $this->getCurrentUser()]);
    }
}

