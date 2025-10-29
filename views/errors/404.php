<?php ob_start(); ?>

<div class="text-center py-20">
    <h1 class="text-9xl font-bold text-macumba mb-4">404</h1>
    <h2 class="text-3xl font-bold mb-4">Página não encontrada</h2>
    <p class="text-gray-600 mb-8">
        A página que você procura não existe ou foi removida.
    </p>
    <a href="/" class="bg-red-800 text-white px-8 py-3 rounded-lg inline-block hover:bg-red-900">
        🏠 Voltar para Home
    </a>
</div>

<?php $content = ob_get_clean(); ?>
<?php include __DIR__ . '/../layout.php'; ?>

