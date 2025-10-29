<?php ob_start(); ?>

<div class="grid md:grid-cols-2 gap-8">
    <div class="bg-white rounded-lg shadow-lg p-8">
        <div class="h-96 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
            <span class="text-9xl">🕯️</span>
        </div>
    </div>
    
    <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-4xl font-bold mb-4"><?= htmlspecialchars($product['name']) ?></h1>
        
        <div class="text-4xl font-bold text-macumba mb-6">
            R$ <?= number_format($product['price'], 2, ',', '.') ?>
        </div>
        
        <div class="mb-6">
            <h3 class="font-bold text-xl mb-2">Descrição</h3>
            <p class="text-gray-700 leading-relaxed">
                <?= htmlspecialchars($product['description'] ?? 'Sem descrição disponível') ?>
            </p>
        </div>
        
        <div class="mb-6">
            <span class="inline-block bg-green-100 text-green-800 px-3 py-1 rounded">
                ✓ <?= $product['stock'] ?> em estoque
            </span>
        </div>
        
        <button class="w-full bg-red-800 text-white py-4 rounded-lg font-bold hover:bg-red-900 text-xl">
            🛒 Adicionar ao Carrinho
        </button>
        
        <div class="mt-6 space-y-2">
            <a href="/produtos" class="block text-center text-macumba hover:underline">
                ← Voltar para produtos
            </a>
        </div>
    </div>
</div>

<section class="mt-12 bg-white rounded-lg shadow-lg p-8">
    <h2 class="text-2xl font-bold mb-4">⭐ Avaliações</h2>
    <p class="text-gray-500">Nenhuma avaliação ainda. Seja o primeiro a avaliar!</p>
</section>

<?php $content = ob_get_clean(); ?>
<?php include __DIR__ . '/../layout.php'; ?>

