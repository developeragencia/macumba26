<?php ob_start(); ?>

<div class="bg-white rounded-lg shadow-lg p-8">
    <h1 class="text-3xl font-bold mb-6 text-macumba">🛒 Carrinho de Compras</h1>
    
    <div class="text-center py-12">
        <p class="text-xl text-gray-500 mb-4">Seu carrinho está vazio</p>
        <a href="/produtos" class="bg-red-800 text-white px-6 py-3 rounded inline-block hover:bg-red-900">
            Ver Produtos
        </a>
    </div>
</div>

<?php $content = ob_get_clean(); ?>
<?php include __DIR__ . '/../layout.php'; ?>

