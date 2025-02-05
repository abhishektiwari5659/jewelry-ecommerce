document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    alert(errorData.message);
                    return;
                }

                const data = await response.json();

                // Save token or user data if needed
                window.location.href = 'index.html'; // Redirect to home page
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }
});
