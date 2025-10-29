<?php ob_start(); ?>

<div class="bg-white rounded-lg shadow-lg p-8">
    <h1 class="text-3xl font-bold mb-6 text-macumba">📊 Dashboard</h1>
    
    <div class="mb-6">
        <p class="text-xl">Bem-vindo, <strong><?= htmlspecialchars($user['name']) ?></strong>!</p>
        <p class="text-gray-600"><?= htmlspecialchars($user['email']) ?></p>
    </div>
    
    <div class="grid md:grid-cols-3 gap-6 mt-8">
        <div class="bg-red-50 p-6 rounded-lg">
            <h3 class="font-bold text-lg mb-2">🛒 Meus Pedidos</h3>
            <p class="text-3xl font-bold text-macumba">0</p>
        </div>
        <div class="bg-red-50 p-6 rounded-lg">
            <h3 class="font-bold text-lg mb-2">❤️ Favoritos</h3>
            <p class="text-3xl font-bold text-macumba">0</p>
        </div>
        <div class="bg-red-50 p-6 rounded-lg">
            <h3 class="font-bold text-lg mb-2">⭐ Avaliações</h3>
            <p class="text-3xl font-bold text-macumba">0</p>
        </div>
    </div>
    
    <div class="mt-8">
        <a href="/produtos" class="bg-red-800 text-white px-6 py-3 rounded inline-block hover:bg-red-900">
            Continuar Comprando
        </a>
    </div>
</div>

<?php $content = ob_get_clean(); ?>
<?php include __DIR__ . '/../layout.php'; ?>

