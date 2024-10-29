document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        // Validación básica del lado del cliente
        if (!username || !password) {
            showError('Por favor, completa todos los campos.');
            return;
        }

        try {
            const response = await fetch('/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (data.success) {
                window.location.href = data.redirectUrl;
            } else {
                showError(data.error || 'Error al iniciar sesión. Por favor, intenta de nuevo.');
            }
        } catch (error) {
            console.error('Error:', error);
            showError('Ocurrió un error al conectar con el servidor. Por favor, intenta de nuevo más tarde.');
        }
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
});