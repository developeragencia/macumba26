<?php ob_start(); ?>

<div class="bg-macumba text-white rounded-lg p-12 mb-8 text-center">
    <h1 class="text-5xl font-bold mb-4">🕯️ Shopping da Macumba</h1>
    <p class="text-xl">Marketplace de produtos espirituais, religiosos e esotéricos</p>
    <p class="text-lg mt-2">Conectando você ao mundo místico</p>
</div>

<section class="mb-8">
    <h2 class="text-3xl font-bold mb-6 text-macumba">📦 Produtos em Destaque</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <?php if (empty($products)): ?>
            <div class="col-span-full text-center py-12">
                <p class="text-gray-500 text-lg">Nenhum produto cadastrado ainda</p>
                <p class="text-gray-400 mt-2">Em breve teremos produtos incríveis!</p>
            </div>
        <?php else: ?>
            <?php foreach ($products as $product): ?>
                <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                    <div class="h-48 bg-gray-200 flex items-center justify-center">
                        <span class="text-6xl">🕯️</span>
                    </div>
                    <div class="p-4">
                        <h3 class="font-bold text-lg mb-2"><?= htmlspecialchars($product['name']) ?></h3>
                        <p class="text-gray-600 text-sm mb-3 line-clamp-2">
                            <?= htmlspecialchars(substr($product['description'] ?? '', 0, 100)) ?>...
                        </p>
                        <div class="flex justify-between items-center">
                            <span class="text-2xl font-bold text-macumba">
                                R$ <?= number_format($product['price'], 2, ',', '.') ?>
                            </span>
                            <a href="/produto/<?= $product['id'] ?>" 
                               class="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900">
                                Ver Mais
                            </a>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        <?php endif; ?>
    </div>
</section>

<section class="grid md:grid-cols-3 gap-6 mt-12">
    <div class="bg-white p-6 rounded-lg shadow text-center">
        <div class="text-4xl mb-3">✨</div>
        <h3 class="font-bold text-xl mb-2">Produtos Autênticos</h3>
        <p class="text-gray-600">Itens espirituais selecionados com cuidado</p>
    </div>
    <div class="bg-white p-6 rounded-lg shadow text-center">
        <div class="text-4xl mb-3">🚚</div>
        <h3 class="font-bold text-xl mb-2">Entrega Segura</h3>
        <p class="text-gray-600">Envio para todo Brasil</p>
    </div>
    <div class="bg-white p-6 rounded-lg shadow text-center">
        <div class="text-4xl mb-3">🔮</div>
        <h3 class="font-bold text-xl mb-2">Vendedores Verificados</h3>
        <p class="text-gray-600">Profissionais certificados</p>
    </div>
</section>

<?php $content = ob_get_clean(); ?>
<?php include __DIR__ . '/layout.php'; ?>

