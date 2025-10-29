<?php ob_start(); ?>

<div class="container mx-auto px-4">
    <!-- Breadcrumb -->
    <nav class="py-3 text-sm text-gray-600">
        <a href="/" class="hover:text-ml-blue">Início</a>
        <span class="mx-2">></span>
        <a href="/produtos" class="hover:text-ml-blue">Produtos</a>
        <span class="mx-2">></span>
        <span class="text-gray-800"><?= htmlspecialchars($product['name']) ?></span>
    </nav>

    <div class="flex gap-4">
        <!-- Coluna esquerda - Imagens -->
        <div class="w-2/3">
            <div class="bg-white rounded p-6 shadow mb-4">
                <!-- Imagem principal -->
                <div class="aspect-square bg-gray-100 rounded mb-4 flex items-center justify-center">
                    <span class="text-9xl">🕯️</span>
                </div>
                
                <!-- Miniaturas -->
                <div class="flex gap-2">
                    <div class="w-16 h-16 bg-gray-200 rounded border-2 border-blue-600 flex items-center justify-center cursor-pointer">
                        <span class="text-2xl">🕯️</span>
                    </div>
                    <div class="w-16 h-16 bg-gray-200 rounded hover:border-2 hover:border-gray-400 flex items-center justify-center cursor-pointer">
                        <span class="text-2xl">🕯️</span>
                    </div>
                    <div class="w-16 h-16 bg-gray-200 rounded hover:border-2 hover:border-gray-400 flex items-center justify-center cursor-pointer">
                        <span class="text-2xl">🕯️</span>
                    </div>
                </div>
            </div>

            <!-- Descrição do produto -->
            <div class="bg-white rounded p-6 shadow mb-4">
                <h2 class="text-2xl font-light mb-4">Descrição</h2>
                <p class="text-gray-700 leading-relaxed">
                    <?= nl2br(htmlspecialchars($product['description'] ?? 'Produto de alta qualidade para seus rituais espirituais. Fabricado com ingredientes naturais e seguindo tradições milenares.')) ?>
                </p>
                
                <div class="mt-6">
                    <h3 class="font-semibold mb-2">Características principais</h3>
                    <ul class="space-y-1 text-sm text-gray-600">
                        <li>✓ Material de primeira qualidade</li>
                        <li>✓ Seguindo tradições ancestrais</li>
                        <li>✓ Garantia de autenticidade</li>
                        <li>✓ Embalagem discreta</li>
                    </ul>
                </div>
            </div>

            <!-- Avaliações -->
            <div class="bg-white rounded p-6 shadow">
                <h2 class="text-2xl font-light mb-4">Opiniões sobre o produto</h2>
                <div class="flex items-center mb-6">
                    <div class="text-5xl font-light mr-4">4.8</div>
                    <div>
                        <div class="flex text-yellow-400 text-xl mb-1">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                        </div>
                        <p class="text-sm text-gray-600">Média entre 127 opiniões</p>
                    </div>
                </div>

                <!-- Lista de avaliações -->
                <div class="space-y-4">
                    <div class="border-t pt-4">
                        <div class="flex items-start gap-3">
                            <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                <span class="font-semibold">M</span>
                            </div>
                            <div class="flex-1">
                                <div class="flex items-center gap-2 mb-1">
                                    <span class="font-semibold text-sm">Maria Silva</span>
                                    <div class="flex text-yellow-400 text-xs">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                    </div>
                                </div>
                                <p class="text-sm text-gray-700">Produto excelente! Chegou rápido e muito bem embalado. Recomendo!</p>
                                <p class="text-xs text-gray-500 mt-1">há 2 dias</p>
                            </div>
                        </div>
                    </div>

                    <div class="border-t pt-4">
                        <div class="flex items-start gap-3">
                            <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                <span class="font-semibold">J</span>
                            </div>
                            <div class="flex-1">
                                <div class="flex items-center gap-2 mb-1">
                                    <span class="font-semibold text-sm">João Santos</span>
                                    <div class="flex text-yellow-400 text-xs">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="far fa-star"></i>
                                    </div>
                                </div>
                                <p class="text-sm text-gray-700">Muito bom, atendeu minhas expectativas.</p>
                                <p class="text-xs text-gray-500 mt-1">há 1 semana</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Coluna direita - Compra -->
        <div class="w-1/3">
            <div class="bg-white rounded p-6 shadow sticky top-24">
                <!-- Novo/Usado -->
                <p class="text-sm text-gray-600 mb-2">Novo | +100 vendidos</p>
                
                <!-- Nome -->
                <h1 class="text-xl mb-4"><?= htmlspecialchars($product['name']) ?></h1>
                
                <!-- Avaliação -->
                <div class="flex items-center gap-2 mb-4">
                    <div class="flex text-yellow-400 text-sm">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                    </div>
                    <span class="text-sm text-gray-600">(127)</span>
                </div>

                <!-- Preço -->
                <div class="mb-4">
                    <div class="text-3xl">
                        <span class="price-integer">R$ <?= number_format($product['price'], 0, ',', '.') ?></span>
                        <span class="price-decimal"><?= str_pad(($product['price'] - floor($product['price'])) * 100, 2, '0') ?></span>
                    </div>
                    <p class="text-sm text-green-600 mt-1">em 12x R$ <?= number_format($product['price'] / 12, 2, ',', '.') ?> sem juros</p>
                    <a href="#" class="text-xs text-blue-600 hover:underline">Ver meios de pagamento</a>
                </div>

                <!-- Frete -->
                <?php if ($product['price'] > 79): ?>
                    <div class="mb-4 text-green-600 flex items-center gap-2">
                        <i class="fas fa-truck"></i>
                        <span class="free-shipping">FRETE GRÁTIS</span>
                    </div>
                <?php endif; ?>

                <div class="mb-4">
                    <p class="text-sm font-semibold mb-2">Chegará grátis amanhã</p>
                    <div class="flex items-center gap-2 text-sm">
                        <i class="fas fa-map-marker-alt text-gray-400"></i>
                        <input type="text" placeholder="Digite seu CEP" class="border rounded px-2 py-1 flex-1 text-sm">
                    </div>
                </div>

                <!-- Estoque -->
                <div class="mb-4">
                    <p class="text-sm">
                        <span class="text-gray-600">Estoque disponível: </span>
                        <span class="font-semibold"><?= $product['stock'] ?? rand(10, 50) ?> unidades</span>
                    </p>
                </div>

                <!-- Quantidade -->
                <div class="mb-4">
                    <p class="text-sm font-semibold mb-2">Quantidade:</p>
                    <div class="flex items-center gap-2">
                        <button class="border rounded px-3 py-1 hover:bg-gray-50">-</button>
                        <input type="number" value="1" min="1" class="border rounded px-3 py-1 w-16 text-center">
                        <button class="border rounded px-3 py-1 hover:bg-gray-50">+</button>
                        <span class="text-sm text-gray-600">(<?= $product['stock'] ?? rand(10, 50) ?> disponíveis)</span>
                    </div>
                </div>

                <!-- Botões de ação -->
                <div class="space-y-2 mb-4">
                    <button class="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700">
                        Comprar agora
                    </button>
                    <button class="w-full bg-blue-100 text-blue-600 py-3 rounded font-semibold hover:bg-blue-200">
                        Adicionar ao carrinho
                    </button>
                </div>

                <!-- Informações do vendedor -->
                <div class="border-t pt-4">
                    <div class="flex items-center gap-3 mb-2">
                        <div class="w-10 h-10 bg-gray-300 rounded-full"></div>
                        <div>
                            <p class="text-sm font-semibold">Loja Mística</p>
                            <div class="flex items-center gap-1 text-xs text-gray-600">
                                <i class="fas fa-medal text-yellow-500"></i>
                                <span>MercadoLíder Gold</span>
                            </div>
                        </div>
                    </div>
                    <div class="text-xs text-gray-600 space-y-1">
                        <p>+1000 vendas</p>
                        <p class="text-green-600">98% avaliações positivas</p>
                    </div>
                </div>

                <!-- Garantia -->
                <div class="border-t mt-4 pt-4">
                    <div class="space-y-2 text-sm text-gray-700">
                        <div class="flex items-center gap-2">
                            <i class="fas fa-shield-alt text-blue-600"></i>
                            <span>Compra Garantida</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <i class="fas fa-undo text-blue-600"></i>
                            <span>Devolução grátis</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php $content = ob_get_clean(); ?>
<?php include __DIR__ . '/../layout.php'; ?>
