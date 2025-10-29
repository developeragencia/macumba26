<?php

namespace App\Controllers;

class DashboardController extends BaseController
{
    public function index(): void
    {
        $this->requireAuth();
        $this->view('dashboard/index', ['user' => $this->getCurrentUser()]);
    }
}

