<?php ob_start(); ?>

<h1 class="text-4xl font-bold mb-8 text-macumba">🛍️ Todos os Produtos</h1>

<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <?php if (empty($products)): ?>
        <div class="col-span-full text-center py-12">
            <p class="text-gray-500 text-xl">Nenhum produto encontrado</p>
        </div>
    <?php else: ?>
        <?php foreach ($products as $product): ?>
            <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <div class="h-48 bg-gray-200 flex items-center justify-center">
                    <span class="text-6xl">🕯️</span>
                </div>
                <div class="p-4">
                    <h3 class="font-bold text-lg mb-2"><?= htmlspecialchars($product['name']) ?></h3>
                    <p class="text-gray-600 text-sm mb-3">
                        <?= htmlspecialchars(substr($product['description'] ?? '', 0, 80)) ?>...
                    </p>
                    <div class="flex justify-between items-center">
                        <span class="text-2xl font-bold text-macumba">
                            R$ <?= number_format($product['price'], 2, ',', '.') ?>
                        </span>
                        <a href="/produto/<?= $product['id'] ?>" 
                           class="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900">
                            Ver
                        </a>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    <?php endif; ?>
</div>

<?php $content = ob_get_clean(); ?>
<?php include __DIR__ . '/../layout.php'; ?>

