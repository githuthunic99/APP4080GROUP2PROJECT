// recipe.js

document.addEventListener("DOMContentLoaded", () => {
  const recipeContainer = document.getElementById("recipe-details");

  // Get recipe ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get("id");

  // Get recipes from localStorage
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];

  // Find the recipe
  const recipe = recipes.find(r => r.id == recipeId);

  if (!recipe) {
    recipeContainer.innerHTML = `
      <div class="not-found">
        <h2>Recipe Not Found 🍽️</h2>
        <p>It looks like this recipe doesn't exist or was removed.</p>
        <a href="index.html" class="back-home">← Go Back Home</a>
      </div>
    `;
    return;
  }

  // Render recipe details
  recipeContainer.innerHTML = `
    <div class="recipe-header">
      <h1>${recipe.title}</h1>
      <p class="meta">By <strong>${recipe.author}</strong> • ${recipe.date}</p>
    </div>

    <div class="recipe-image">
      <img src="${recipe.image}" alt="${recipe.title}">
    </div>

    <div class="recipe-info">
      <h2>Category</h2>
      <p>${recipe.category}</p>

      <h2>Ingredients</h2>
      <ul>
        ${recipe.ingredients
          .split("\n")
          .map(item => `<li>${item.trim()}</li>`)
          .join("")}
      </ul>

      <h2>Instructions</h2>
      <p>${recipe.instructions.replace(/\n/g, "<br>")}</p>
    </div>

    <div class="recipe-footer">
      <button id="shareRecipe" class="share-btn">📤 Share Recipe</button>
      <a href="index.html" class="back-home">← Back to Home</a>
    </div>
  `;

  // Share button logic
  document.getElementById("shareRecipe").addEventListener("click", async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: `Check out this recipe on Taste & Tell: ${recipe.title}`,
          url: window.location.href
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      alert("Sharing is not supported on your device/browser.");
    }
  });
});
