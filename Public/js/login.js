document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const API_BASE_URL = 'http://localhost:5000';

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed!');
            }

            localStorage.setItem('reloop-token', data.token);
            localStorage.setItem('reloop-user', JSON.stringify(data.user));

            alert('Login successful!');
            window.location.href = 'marketplace.html';

        } catch (error) { // Added opening brace
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        }
    });
});