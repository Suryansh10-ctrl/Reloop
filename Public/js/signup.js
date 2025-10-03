document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const API_BASE_URL = 'http://localhost:5000';

    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;

        try {
            const response = await fetch(`${API_BASE_URL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, role })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Signup failed!');
            }

            alert('Signup successful! Please log in to continue.');
            window.location.href = 'login.html';

        } catch (error) {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        }
    });
});