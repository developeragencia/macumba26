<?php

namespace App\Controllers;

class PaymentController extends BaseController
{
    public function stripe(): void
    {
        $this->json(['message' => 'Stripe payment processing']);
    }

    public function pix(): void
    {
        $this->json(['message' => 'PIX payment processing']);
    }
}

