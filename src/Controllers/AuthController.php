<?php

namespace App\Controllers;

use App\Models\User;

class AuthController extends BaseController
{
    public function register(): void
    {
        $data = $this->getJsonInput();
        
        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';
        $name = $data['name'] ?? '';
        
        if (empty($email) || empty($password) || empty($name)) {
            $this->json(['error' => 'Todos os campos são obrigatórios'], 400);
        }
        
        // Check if user exists
        $existingUser = User::findByEmail($email);
        if ($existingUser) {
            $this->json(['error' => 'Email já cadastrado'], 400);
        }
        
        // Create user
        $user = User::create([
            'email' => $email,
            'password' => password_hash($password, PASSWORD_BCRYPT),
            'name' => $name,
        ]);
        
        if ($user) {
            $this->json([
                'message' => 'Usuário criado com sucesso',
                'user' => [
                    'id' => $user['id'],
                    'email' => $user['email'],
                    'name' => $user['name'],
                ]
            ], 201);
        } else {
            $this->json(['error' => 'Erro ao criar usuário'], 500);
        }
    }

    public function login(): void
    {
        $data = $this->getJsonInput();
        
        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';
        
        if (empty($email) || empty($password)) {
            $this->json(['error' => 'Email e senha são obrigatórios'], 400);
        }
        
        $user = User::findByEmail($email);
        
        if (!$user || !password_verify($password, $user['password'])) {
            $this->json(['error' => 'Credenciais inválidas'], 401);
        }
        
        // Create session
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_email'] = $user['email'];
        $_SESSION['user_name'] = $user['name'];
        $_SESSION['user_role'] = $user['role'];
        
        $this->json([
            'message' => 'Login realizado com sucesso',
            'user' => [
                'id' => $user['id'],
                'email' => $user['email'],
                'name' => $user['name'],
                'role' => $user['role'],
            ]
        ]);
    }

    public function me(): void
    {
        $this->requireAuth();
        
        $user = $this->getCurrentUser();
        $this->json(['user' => $user]);
    }

    public function logout(): void
    {
        session_destroy();
        $this->json(['message' => 'Logout realizado com sucesso']);
    }

    public function loginPage(): void
    {
        $this->view('auth/login');
    }

    public function registerPage(): void
    {
        $this->view('auth/register');
    }
}

