// login.js
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // Optional: store logged-in user info
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect to home page after successful login
      window.location.href = 'index.html'; // <-- change this to your home page URL if different
    } else {
      alert(data.message); // show error message from server
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Something went wrong. Try again.');
  }
});