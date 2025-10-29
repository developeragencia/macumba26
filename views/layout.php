<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title ?? 'Shopping da Macumba' ?></title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .bg-macumba { background: linear-gradient(135deg, #8B0000 0%, #000000 100%); }
        .text-macumba { color: #8B0000; }
    </style>
</head>
<body class="bg-gray-50">
    <nav class="bg-macumba text-white p-4 shadow-lg">
        <div class="container mx-auto flex justify-between items-center">
            <a href="/" class="text-2xl font-bold">🕯️ Shopping da Macumba</a>
            <div class="space-x-4">
                <a href="/produtos" class="hover:text-red-300">Produtos</a>
                <?php if (isset($user)): ?>
                    <a href="/dashboard" class="hover:text-red-300">Dashboard</a>
                    <a href="/carrinho" class="hover:text-red-300">🛒 Carrinho</a>
                    <span>Olá, <?= htmlspecialchars($user['name']) ?></span>
                <?php else: ?>
                    <a href="/login" class="hover:text-red-300">Login</a>
                    <a href="/register" class="hover:text-red-300">Cadastrar</a>
                <?php endif; ?>
            </div>
        </div>
    </nav>

    <main class="container mx-auto py-8 px-4">
        <?= $content ?? '' ?>
    </main>

    <footer class="bg-gray-800 text-white py-8 mt-16">
        <div class="container mx-auto text-center">
            <p>&copy; <?= date('Y') ?> Shopping da Macumba - Todos os direitos reservados</p>
            <p class="text-sm mt-2">Marketplace de produtos espirituais e esotéricos</p>
        </div>
    </footer>
</body>
</html>

