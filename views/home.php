<?php ob_start(); ?>

<div class="container mx-auto px-4">
    <!-- Banner principal estilo ML -->
    <div class="bg-white rounded mb-4 overflow-hidden shadow">
        <div class="bg-gradient-to-r from-red-900 to-red-700 text-white p-12 text-center">
            <h1 class="text-4xl font-light mb-2">🕯️ Shopping da Macumba</h1>
            <p class="text-xl">Os melhores produtos espirituais e esotéricos</p>
            <p class="mt-2 text-sm">Frete grátis a partir de R$ 79</p>
        </div>
    </div>
    
    <!-- Benefícios estilo ML -->
    <div class="bg-white rounded p-4 mb-4 shadow">
        <div class="grid grid-cols-4 gap-4 text-center">
            <div class="flex flex-col items-center">
                <i class="fas fa-credit-card text-3xl text-blue-500 mb-2"></i>
                <h3 class="font-semibold text-sm">Pague com Pix</h3>
                <p class="text-xs text-gray-600">Desconto de 10%</p>
            </div>
            <div class="flex flex-col items-center">
                <i class="fas fa-truck text-3xl text-green-500 mb-2"></i>
                <h3 class="font-semibold text-sm">Frete grátis</h3>
                <p class="text-xs text-gray-600">A partir de R$ 79</p>
            </div>
            <div class="flex flex-col items-center">
                <i class="fas fa-shield-alt text-3xl text-yellow-500 mb-2"></i>
                <h3 class="font-semibold text-sm">Compra protegida</h3>
                <p class="text-xs text-gray-600">100% segura</p>
            </div>
            <div class="flex flex-col items-center">
                <i class="fas fa-undo text-3xl text-purple-500 mb-2"></i>
                <h3 class="font-semibold text-sm">Devolução grátis</h3>
                <p class="text-xs text-gray-600">Em 30 dias</p>
            </div>
        </div>
    </div>

    <!-- Ofertas do dia -->
    <div class="mb-4">
        <div class="bg-white rounded p-4 shadow">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-light text-gray-800">Ofertas do dia</h2>
                <a href="/produtos" class="text-blue-600 hover:underline text-sm">Ver todas</a>
            </div>
            
            <!-- Grid de produtos estilo ML -->
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                <?php if (empty($products)): ?>
                    <div class="col-span-full text-center py-12 text-gray-500">
                        <p class="text-lg">Nenhum produto disponível</p>
                        <p class="text-sm mt-2">Em breve teremos novidades!</p>
                    </div>
                <?php else: ?>
                    <?php foreach (array_slice($products, 0, 12) as $product): ?>
                        <a href="/produto/<?= $product['id'] ?>" class="product-card bg-white rounded hover:shadow-lg block">
                            <div class="p-3">
                                <!-- Imagem -->
                                <div class="aspect-square bg-gray-100 rounded mb-2 flex items-center justify-center">
                                    <span class="text-5xl">🕯️</span>
                                </div>
                                
                                <!-- Preço -->
                                <div class="mb-1">
                                    <span class="price-integer">R$ <?= number_format($product['price'], 0, ',', '.') ?></span>
                                    <span class="price-decimal"><?= str_pad(($product['price'] - floor($product['price'])) * 100, 2, '0') ?></span>
                                </div>
                                
                                <!-- Desconto fictício -->
                                <div class="text-xs text-green-600 mb-1">
                                    <span class="free-shipping">FRETE GRÁTIS</span>
                                </div>
                                
                                <!-- Nome do produto -->
                                <h3 class="text-sm text-gray-800 line-clamp-2 leading-tight">
                                    <?= htmlspecialchars($product['name']) ?>
                                </h3>
                            </div>
                        </a>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <!-- Categorias -->
    <div class="mb-4">
        <div class="bg-white rounded p-4 shadow">
            <h2 class="text-2xl font-light text-gray-800 mb-4">Categorias em destaque</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <a href="#" class="text-center p-4 hover:bg-gray-50 rounded">
                    <div class="text-4xl mb-2">🕯️</div>
                    <p class="text-sm font-semibold">Velas</p>
                </a>
                <a href="#" class="text-center p-4 hover:bg-gray-50 rounded">
                    <div class="text-4xl mb-2">💨</div>
                    <p class="text-sm font-semibold">Incensos</p>
                </a>
                <a href="#" class="text-center p-4 hover:bg-gray-50 rounded">
                    <div class="text-4xl mb-2">💎</div>
                    <p class="text-sm font-semibold">Cristais</p>
                </a>
                <a href="#" class="text-center p-4 hover:bg-gray-50 rounded">
                    <div class="text-4xl mb-2">📿</div>
                    <p class="text-sm font-semibold">Guias</p>
                </a>
                <a href="#" class="text-center p-4 hover:bg-gray-50 rounded">
                    <div class="text-4xl mb-2">🔮</div>
                    <p class="text-sm font-semibold">Oráculos</p>
                </a>
                <a href="#" class="text-center p-4 hover:bg-gray-50 rounded">
                    <div class="text-4xl mb-2">📚</div>
                    <p class="text-sm font-semibold">Livros</p>
                </a>
            </div>
        </div>
    </div>

    <!-- Mais vendidos -->
    <div class="mb-4">
        <div class="bg-white rounded p-4 shadow">
            <h2 class="text-2xl font-light text-gray-800 mb-4">Mais vendidos</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                <?php foreach (array_slice($products, 0, 6) as $product): ?>
                    <a href="/produto/<?= $product['id'] ?>" class="product-card bg-white rounded hover:shadow-lg block">
                        <div class="p-3">
                            <div class="aspect-square bg-gray-100 rounded mb-2 flex items-center justify-center">
                                <span class="text-5xl">🕯️</span>
                            </div>
                            <div class="mb-1">
                                <span class="price-integer">R$ <?= number_format($product['price'], 0, ',', '.') ?></span>
                                <span class="price-decimal"><?= str_pad(($product['price'] - floor($product['price'])) * 100, 2, '0') ?></span>
                            </div>
                            <h3 class="text-sm text-gray-800 line-clamp-2 leading-tight">
                                <?= htmlspecialchars($product['name']) ?>
                            </h3>
                        </div>
                    </a>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</div>

<?php $content = ob_get_clean(); ?>
<?php include __DIR__ . '/layout.php'; ?>
