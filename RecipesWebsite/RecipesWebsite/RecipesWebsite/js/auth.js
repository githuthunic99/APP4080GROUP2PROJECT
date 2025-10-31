// auth.js
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login-form");
  const signupForm = document.querySelector("#signup-form");
  const logoutBtn = document.querySelector("#logout-btn");

  // Handle Login
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.querySelector("#login-email").value.trim();
      const password = document.querySelector("#login-password").value.trim();

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("Login successful!");
        window.location.href = "profile.html";
      } else {
        alert("Invalid email or password");
      }
    });
  }

  // Handle Signup
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.querySelector("#signup-name").value.trim();
      const email = document.querySelector("#signup-email").value.trim();
      const password = document.querySelector("#signup-password").value.trim();

      if (!name || !email || !password) {
        alert("Please fill in all fields.");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];

      if (users.some((u) => u.email === email)) {
        alert("Email already registered. Try logging in instead.");
        return;
      }

      const newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      alert("Signup successful! You can now log in.");
      window.location.href = "login.html";
    });
  }

  // Handle Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      alert("Logged out successfully.");
      window.location.href = "index.html";
    });
  }

  // Auto-redirect if logged in
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (user && window.location.pathname.endsWith("login.html")) {
    window.location.href = "profile.html";
  }
});
