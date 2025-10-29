<?php

namespace App\Controllers;

class VendorController extends BaseController
{
    public function dashboard(): void
    {
        $this->requireAuth();
        $this->view('vendor/dashboard', ['user' => $this->getCurrentUser()]);
    }
}

