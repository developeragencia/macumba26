<?php ob_start(); ?>

<div class="max-w-md mx-auto">
    <div class="bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-3xl font-bold mb-6 text-center text-macumba">📝 Cadastro</h2>
        
        <form id="registerForm" class="space-y-4">
            <div>
                <label class="block font-semibold mb-2">Nome</label>
                <input type="text" name="name" required
                       class="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-red-800">
            </div>
            
            <div>
                <label class="block font-semibold mb-2">Email</label>
                <input type="email" name="email" required
                       class="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-red-800">
            </div>
            
            <div>
                <label class="block font-semibold mb-2">Senha</label>
                <input type="password" name="password" required minlength="6"
                       class="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-red-800">
            </div>
            
            <button type="submit" 
                    class="w-full bg-red-800 text-white py-3 rounded font-bold hover:bg-red-900">
                Cadastrar
            </button>
        </form>
        
        <p class="text-center mt-4">
            Já tem conta? <a href="/login" class="text-macumba font-bold">Fazer login</a>
        </p>
    </div>
</div>

<script>
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            alert('Cadastro realizado com sucesso!');
            window.location.href = '/login';
        } else {
            const error = await response.json();
            alert(error.error || 'Erro ao cadastrar');
        }
    } catch (error) {
        alert('Erro ao conectar com o servidor');
    }
});
</script>

<?php $content = ob_get_clean(); ?>
<?php include __DIR__ . '/../layout.php'; ?>

