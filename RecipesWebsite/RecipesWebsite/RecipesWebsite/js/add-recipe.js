// add-recipe.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("recipeForm");
  const messageBox = document.getElementById("message");

  // Load existing recipes from localStorage
  let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const title = document.getElementById("title").value.trim();
    const category = document.getElementById("category").value.trim();
    const ingredients = document.getElementById("ingredients").value.trim();
    const instructions = document.getElementById("instructions").value.trim();
    const image = document.getElementById("image").value.trim();

    // Simple validation
    if (!title || !category || !ingredients || !instructions) {
      showMessage("Please fill in all required fields.", "error");
      return;
    }

    // Create recipe object
    const newRecipe = {
      id: Date.now(),
      title,
      category,
      ingredients,
      instructions,
      image: image || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600", // default
      author: "Chef Olivia Parker", // Dummy user for now
      date: new Date().toLocaleDateString(),
    };

    // Save to localStorage
    recipes.push(newRecipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));

    // Clear form
    form.reset();

    // Show success message
    showMessage("🎉 Your recipe has been added successfully!", "success");

    // Optional: redirect after a few seconds
    setTimeout(() => {
      window.location.href = "recipes.html"; // You can change this
    }, 2000);
  });

  function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = type === "success" ? "message success" : "message error";
    messageBox.style.display = "block";

    setTimeout(() => {
      messageBox.style.display = "none";
    }, 3000);
  }
});
