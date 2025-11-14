// recipe.js
async function loadRecipe() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id"); // recipe ID from query string

  try {
    const response = await fetch(`http://localhost:5000/recipes/${id}`);
    if (!response.ok) throw new Error("Recipe not found");
    const recipe = await response.json();

    document.title = `${recipe.title} - Taste & Tell`;
    document.getElementById("recipe-title").textContent = recipe.title;
    document.getElementById("recipe-desc").textContent = recipe.description;
    document.getElementById("hero").style.background = `url('${recipe.image}') center/cover no-repeat`;

    document.getElementById("ingredients-list").innerHTML =
      recipe.ingredients.map(i => `<li>${i}</li>`).join("");

    document.getElementById("instructions-list").innerHTML =
      recipe.instructions.map(step => `<li>${step}</li>`).join("");

    document.getElementById("author-img").src = recipe.authorImg;
    document.getElementById("author-name").textContent = "By: " + recipe.author;
    document.getElementById("author-bio").textContent = recipe.authorBio;
  } catch (error) {
    console.error("Error loading recipe:", error);
    document.querySelector("main").innerHTML =
      "<p style='text-align:center;'>Recipe not found.</p>";
  }
}

// Load recipe on page load
window.addEventListener("DOMContentLoaded", loadRecipe);

// Example share function
function shareRecipe(platform) {
  alert(`Sharing on ${platform} is not implemented yet.`);
}
