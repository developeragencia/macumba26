<?php ob_start(); ?>

<div class="max-w-md mx-auto">
    <div class="bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-3xl font-bold mb-6 text-center text-macumba">🔑 Login</h2>
        
        <form id="loginForm" class="space-y-4">
            <div>
                <label class="block font-semibold mb-2">Email</label>
                <input type="email" name="email" required
                       class="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-red-800">
            </div>
            
            <div>
                <label class="block font-semibold mb-2">Senha</label>
                <input type="password" name="password" required
                       class="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-red-800">
            </div>
            
            <button type="submit" 
                    class="w-full bg-red-800 text-white py-3 rounded font-bold hover:bg-red-900">
                Entrar
            </button>
        </form>
        
        <p class="text-center mt-4">
            Não tem conta? <a href="/register" class="text-macumba font-bold">Cadastre-se</a>
        </p>
    </div>
</div>

<script>
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            window.location.href = '/dashboard';
        } else {
            const error = await response.json();
            alert(error.error || 'Erro ao fazer login');
        }
    } catch (error) {
        alert('Erro ao conectar com o servidor');
    }
});
</script>

<?php $content = ob_get_clean(); ?>
<?php include __DIR__ . '/../layout.php'; ?>

