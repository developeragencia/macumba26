<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title ?? 'Shopping da Macumba' ?></title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        /* Estilo Mercado Livre adaptado - Vermelho, Branco e Preto */
        .bg-ml-yellow { background-color: #8B0000; } /* Vermelho escuro no lugar do amarelo */
        .text-ml-yellow { color: #8B0000; }
        .bg-ml-blue { background-color: #DC143C; } /* Vermelho médio no lugar do azul */
        .text-ml-blue { color: #DC143C; }
        .hover-ml:hover { background-color: #A52A2A; }
        
        /* Header fixo como ML */
        .header-fixed { 
            position: sticky; 
            top: 0; 
            z-index: 1000;
            box-shadow: 0 1px 0 0 rgba(0,0,0,.1);
        }
        
        /* Search bar estilo ML */
        .search-ml {
            box-shadow: 0 1px 2px 0 rgba(0,0,0,.2);
        }
        
        /* Cards de produto estilo ML */
        .product-card {
            transition: all .2s ease-in-out;
        }
        .product-card:hover {
            box-shadow: 0 7px 16px 0 rgba(0,0,0,.2);
            transform: translateY(-2px);
        }
        
        /* Badge de frete grátis estilo ML */
        .free-shipping {
            background-color: #00a650;
            color: white;
            padding: 2px 6px;
            border-radius: 2px;
            font-size: 11px;
            font-weight: 600;
        }
        
        /* Preço estilo ML */
        .price-integer {
            font-size: 28px;
            font-weight: 400;
            line-height: 1.2;
        }
        .price-decimal {
            font-size: 16px;
            font-weight: 400;
            vertical-align: super;
        }
    </style>
</head>
<body class="bg-gray-100">
    <!-- Header superior estilo Mercado Livre -->
    <div class="bg-ml-yellow header-fixed">
        <div class="container mx-auto px-4">
            <!-- Top bar -->
            <div class="py-2 text-xs text-white border-b border-red-900">
                <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-4">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>Enviar para São Paulo 01310-100</span>
                    </div>
                    <div class="flex items-center space-x-4">
                        <?php if (isset($user)): ?>
                            <span><i class="far fa-user"></i> <?= htmlspecialchars($user['name']) ?></span>
                            <a href="/dashboard" class="hover:underline">Minha conta</a>
                        <?php else: ?>
                            <a href="/register" class="hover:underline">Crie sua conta</a>
                            <a href="/login" class="hover:underline">Entre</a>
                        <?php endif; ?>
                        <a href="#" class="hover:underline">Contato</a>
                    </div>
                </div>
            </div>
            
            <!-- Main header -->
            <div class="py-3">
                <div class="flex items-center gap-8">
                    <!-- Logo -->
                    <a href="/" class="text-white flex items-center">
                        <span class="text-2xl font-bold">🕯️ Shopping</span>
                        <span class="text-2xl font-light ml-1">da Macumba</span>
                    </a>
                    
                    <!-- Barra de busca estilo ML -->
                    <div class="flex-1 max-w-3xl">
                        <form class="flex" onsubmit="return false;">
                            <input type="text" 
                                   placeholder="Buscar produtos, marcas e muito mais..." 
                                   class="flex-1 px-4 py-2 rounded-l text-gray-700 focus:outline-none search-ml">
                            <button type="submit" 
                                    class="bg-white px-6 py-2 rounded-r hover:bg-gray-100">
                                <i class="fas fa-search text-gray-600"></i>
                            </button>
                        </form>
                        <div class="mt-1 ml-1 text-xs text-white opacity-90">
                            <a href="#" class="hover:underline mr-3">velas espirituais</a>
                            <a href="#" class="hover:underline mr-3">incensos</a>
                            <a href="#" class="hover:underline mr-3">cristais</a>
                        </div>
                    </div>
                    
                    <!-- Carrinho -->
                    <a href="/carrinho" class="text-white hover:opacity-80 flex flex-col items-center">
                        <i class="fas fa-shopping-cart text-xl"></i>
                        <span class="text-xs mt-1">Carrinho</span>
                    </a>
                </div>
            </div>
            
            <!-- Categories bar -->
            <div class="bg-white py-2 -mx-4 px-4">
                <div class="flex items-center space-x-6 text-sm text-gray-700">
                    <a href="/produtos" class="hover:text-ml-blue flex items-center">
                        <i class="fas fa-bars mr-2"></i>
                        Categorias
                    </a>
                    <a href="#" class="hover:text-ml-blue">Ofertas</a>
                    <a href="#" class="hover:text-ml-blue">Histórico</a>
                    <a href="#" class="hover:text-ml-blue">Supermercado</a>
                    <a href="#" class="hover:text-ml-blue">Moda</a>
                    <a href="#" class="hover:text-ml-blue">Vender</a>
                    <a href="#" class="hover:text-ml-blue">Contato</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Main content -->
    <main class="py-4">
        <?= $content ?? '' ?>
    </main>

    <!-- Footer estilo Mercado Livre -->
    <footer class="bg-white mt-16 border-t">
        <div class="container mx-auto px-4 py-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 class="font-bold mb-3 text-gray-800">Sobre nós</h3>
                    <ul class="space-y-2 text-sm text-gray-600">
                        <li><a href="#" class="hover:text-ml-blue">Quem somos</a></li>
                        <li><a href="#" class="hover:text-ml-blue">Trabalhe conosco</a></li>
                        <li><a href="#" class="hover:text-ml-blue">Investidores</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="font-bold mb-3 text-gray-800">Comprar</h3>
                    <ul class="space-y-2 text-sm text-gray-600">
                        <li><a href="#" class="hover:text-ml-blue">Como comprar</a></li>
                        <li><a href="#" class="hover:text-ml-blue">Formas de pagamento</a></li>
                        <li><a href="#" class="hover:text-ml-blue">Garantia</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="font-bold mb-3 text-gray-800">Vender</h3>
                    <ul class="space-y-2 text-sm text-gray-600">
                        <li><a href="#" class="hover:text-ml-blue">Como vender</a></li>
                        <li><a href="#" class="hover:text-ml-blue">Criar anúncio</a></li>
                        <li><a href="/vendedor/dashboard" class="hover:text-ml-blue">Dashboard vendedor</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="font-bold mb-3 text-gray-800">Ajuda</h3>
                    <ul class="space-y-2 text-sm text-gray-600">
                        <li><a href="#" class="hover:text-ml-blue">Contato</a></li>
                        <li><a href="#" class="hover:text-ml-blue">FAQ</a></li>
                        <li><a href="#" class="hover:text-ml-blue">Política de privacidade</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="border-t mt-8 pt-8 text-center text-sm text-gray-600">
                <p class="mb-2">Copyright © <?= date('Y') ?> Shopping da Macumba</p>
                <p class="text-xs">Marketplace de produtos espirituais e esotéricos</p>
            </div>
        </div>
    </footer>
</body>
</html>
