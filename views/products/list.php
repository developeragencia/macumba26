<?php ob_start(); ?>

<div class="container mx-auto px-4">
    <!-- Breadcrumb estilo ML -->
    <nav class="py-3 text-sm text-gray-600">
        <a href="/" class="hover:text-ml-blue">Início</a>
        <span class="mx-2">></span>
        <span class="text-gray-800">Produtos</span>
    </nav>

    <div class="flex gap-4">
        <!-- Sidebar de filtros estilo ML -->
        <aside class="w-64 flex-shrink-0">
            <div class="bg-white rounded p-4 shadow">
                <h3 class="font-semibold text-lg mb-4">Filtros</h3>
                
                <!-- Categorias -->
                <div class="mb-6">
                    <h4 class="font-semibold text-sm mb-3 text-gray-700">Categorias</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="#" class="text-blue-600 hover:underline">Velas (243)</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-blue-600">Incensos (156)</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-blue-600">Cristais (98)</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-blue-600">Guias (75)</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-blue-600">Livros (64)</a></li>
                        <li><a href="#" class="text-blue-600 hover:underline text-xs">Ver mais</a></li>
                    </ul>
                </div>

                <!-- Preço -->
                <div class="mb-6">
                    <h4 class="font-semibold text-sm mb-3 text-gray-700">Preço</h4>
                    <div class="flex items-center gap-2 mb-2">
                        <input type="number" placeholder="Mín" class="border rounded px-2 py-1 text-sm w-full">
                        <span>-</span>
                        <input type="number" placeholder="Máx" class="border rounded px-2 py-1 text-sm w-full">
                    </div>
                    <button class="text-blue-600 text-sm hover:underline">Aplicar</button>
                </div>

                <!-- Condição -->
                <div class="mb-6">
                    <h4 class="font-semibold text-sm mb-3 text-gray-700">Condição</h4>
                    <label class="flex items-center gap-2 mb-2">
                        <input type="checkbox" class="rounded">
                        <span class="text-sm">Novo (<?= count($products) ?>)</span>
                    </label>
                    <label class="flex items-center gap-2">
                        <input type="checkbox" class="rounded">
                        <span class="text-sm">Usado (0)</span>
                    </label>
                </div>

                <!-- Frete grátis -->
                <div class="mb-6">
                    <label class="flex items-center gap-2">
                        <input type="checkbox" class="rounded">
                        <span class="text-sm text-green-600 font-semibold">Frete grátis</span>
                    </label>
                </div>
            </div>
        </aside>

        <!-- Área principal de produtos -->
        <main class="flex-1">
            <!-- Ordenação estilo ML -->
            <div class="bg-white rounded p-4 mb-4 shadow flex justify-between items-center">
                <h1 class="text-2xl font-light">Produtos</h1>
                <div class="flex items-center gap-2">
                    <span class="text-sm text-gray-600">Ordenar por</span>
                    <select class="border rounded px-3 py-1 text-sm">
                        <option>Mais relevantes</option>
                        <option>Menor preço</option>
                        <option>Maior preço</option>
                        <option>Mais vendidos</option>
                    </select>
                </div>
            </div>

            <!-- Grid de produtos estilo ML -->
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <?php if (empty($products)): ?>
                    <div class="col-span-full bg-white rounded p-12 text-center shadow">
                        <i class="fas fa-search text-6xl text-gray-300 mb-4"></i>
                        <p class="text-xl text-gray-600">Nenhum produto encontrado</p>
                        <p class="text-sm text-gray-500 mt-2">Tente buscar por outros termos</p>
                    </div>
                <?php else: ?>
                    <?php foreach ($products as $product): ?>
                        <a href="/produto/<?= $product['id'] ?>" class="product-card bg-white rounded block">
                            <div class="p-4">
                                <!-- Imagem -->
                                <div class="aspect-square bg-gray-100 rounded mb-3 flex items-center justify-center relative">
                                    <span class="text-7xl">🕯️</span>
                                    <?php if (rand(0, 1)): ?>
                                        <span class="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                                            <?= rand(10, 50) ?>% OFF
                                        </span>
                                    <?php endif; ?>
                                </div>
                                
                                <!-- Preço -->
                                <div class="mb-2">
                                    <span class="price-integer">R$ <?= number_format($product['price'], 0, ',', '.') ?></span>
                                    <span class="price-decimal"><?= str_pad(($product['price'] - floor($product['price'])) * 100, 2, '0') ?></span>
                                </div>
                                
                                <!-- Parcelas -->
                                <div class="text-xs text-green-600 mb-2">
                                    em 12x R$ <?= number_format($product['price'] / 12, 2, ',', '.') ?> sem juros
                                </div>
                                
                                <!-- Frete -->
                                <?php if ($product['price'] > 79): ?>
                                    <div class="text-xs mb-2">
                                        <span class="free-shipping">FRETE GRÁTIS</span>
                                    </div>
                                <?php endif; ?>
                                
                                <!-- Nome do produto -->
                                <h3 class="text-sm text-gray-800 line-clamp-2 leading-tight h-10">
                                    <?= htmlspecialchars($product['name']) ?>
                                </h3>
                            </div>
                        </a>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>

            <!-- Paginação estilo ML -->
            <?php if (!empty($products)): ?>
                <div class="bg-white rounded p-4 mt-4 shadow">
                    <div class="flex justify-center items-center gap-2">
                        <button class="px-3 py-1 border rounded text-sm text-gray-400 cursor-not-allowed">
                            Anterior
                        </button>
                        <button class="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
                        <button class="px-3 py-1 border rounded text-sm hover:bg-gray-50">2</button>
                        <button class="px-3 py-1 border rounded text-sm hover:bg-gray-50">3</button>
                        <span class="text-gray-400">...</span>
                        <button class="px-3 py-1 border rounded text-sm hover:bg-gray-50">10</button>
                        <button class="px-3 py-1 border rounded text-sm text-blue-600 hover:bg-blue-50">
                            Próximo
                        </button>
                    </div>
                </div>
            <?php endif; ?>
        </main>
    </div>
</div>

<?php $content = ob_get_clean(); ?>
<?php include __DIR__ . '/../layout.php'; ?>
