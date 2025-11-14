// This file handles the submission of the signup form (signup.html) 
// and communicates with the Node.js server running on port 5000.

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('signupForm');
    
    // Helper function to provide user feedback
    const showMessage = (msg, isError = false) => {
        if (messageDiv) {
            messageDiv.textContent = msg;
            // You can replace these Tailwind classes with your own CSS styles
            messageDiv.className = isError 
                ? 'text-red-500 font-bold p-2 bg-red-100 rounded' 
                : 'text-green-500 font-bold p-2 bg-green-100 rounded';
        } else {
            console.log(isError ? 'ERROR: ' + msg : 'SUCCESS: ' + msg);
        }
    };

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Stop the default page refresh
            
            // Collect values using your specific HTML input IDs
            const fname = document.getElementById('fname').value.trim();
const lname = document.getElementById('lname').value.trim();
const email = document.getElementById('email').value.trim();
const password = document.getElementById('password').value;
const confirmPassword = document.getElementById('confirm-password').value;
            // Simple client-side validation
            if (password !== confirmPassword) {
                showMessage("Passwords do not match.", true);
                return;
            }
            if (!fname || !lname || !email || !password) {
                showMessage("Please fill in all required fields.", true);
                return;
            }
            
            // Send data to the Node.js server's /signup API endpoint
            try {
                const response = await fetch('http://localhost:5000/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // MAPPING: Ensure the keys sent match the server's expected keys
                    body: JSON.stringify({ 
                        fname, 
                        lname, 
                        email, 
                        password 
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    showMessage(data.message || 'Registration successful! Redirecting to login.', false);
                    form.reset();
                    // Redirect after a short delay
                    setTimeout(() => {
                        window.location.href = 'login.html'; 
                    }, 1500);
                } else {
                    // Display error message from the server (e.g., "Email already exists")
                    showMessage(data.message || 'Registration failed due to server error.', true);
                }
            } catch (error) {
                console.error('Network error:', error);
                showMessage("Could not connect to the server. Check if the Node.js server is running.", true);
            }
        });
    }
});
