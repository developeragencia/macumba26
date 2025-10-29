<?php
/**
 * Shopping da Macumba - Entry Point
 * Este arquivo redireciona para o index.php dentro de public/
 * 
 * Se você está na Hostinger:
 * - Coloque TODOS os arquivos em public_html/
 * - O .htaccess já está configurado para redirecionar
 */

// Verificar se estamos na raiz ou em public/
if (file_exists(__DIR__ . '/public/index.php')) {
    // Estamos na raiz, redirecionar para public/
    require_once __DIR__ . '/public/index.php';
} else {
    die('Erro: Arquivo public/index.php não encontrado. Verifique a estrutura de pastas.');
}

