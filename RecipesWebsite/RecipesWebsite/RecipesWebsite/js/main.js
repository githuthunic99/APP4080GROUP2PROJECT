// main.js

document.addEventListener("DOMContentLoaded", () => {
  const recipeGrid = document.querySelector(".recipe-grid");
  const shareButtons = document.querySelectorAll(".share-recipe");
  const header = document.getElementById("mainHeader");

  // ===== Scroll Hide/Show Header =====
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && currentScroll > 100) {
      header.classList.add("hide");
    } else {
      header.classList.remove("hide");
    }
    lastScroll = currentScroll;
  });

  // ===== Load Recipes from localStorage =====
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];

  if (recipeGrid && recipes.length > 0) {
    recipeGrid.innerHTML = recipes
      .map(recipe => `
        <div class="recipe-card">
          <a href="recipe.html?id=${recipe.id}" class="recipe-link">
            <img src="${recipe.image}" alt="${recipe.title}">
            <div class="info">
              <h3>${recipe.title}</h3>
              <p>${recipe.description || "A tasty homemade recipe you'll love."}</p>
            </div>
          </a>
        </div>
      `)
      .join("");
  } else if (recipeGrid) {
    recipeGrid.innerHTML = `
      <p style="text-align:center; color:#777; margin-top:20px;">
        No recipes yet 😋 — <a href="add-recipe.html" style="color:#d2691e; text-decoration:underline;">add one now!</a>
      </p>
    `;
  }

  // ===== Share Recipe Button =====
  shareButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      window.location.href = "add-recipe.html";
    });
  });
});
