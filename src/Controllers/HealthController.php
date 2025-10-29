<?php

namespace App\Controllers;

class HealthController extends BaseController
{
    public function check(): void
    {
        $this->json([
            'status' => 'ok',
            'timestamp' => date('c'),
            'service' => 'Shopping da Macumba API',
            'version' => '1.0.0'
        ]);
    }
}

