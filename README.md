
🧑‍🍳 Community Cookbook

**Community Cookbook** is a simple, interactive recipe-sharing website built with **HTML, CSS, and JavaScript**.
Users can browse, view, and share delicious recipes — each loaded dynamically from a JSON file using recipe IDs.

---

🌟 Features

* 🍽️ Browse a curated list of recipes
* 🔍 View individual recipes dynamically via `recipe.html?id=...`
* 💾 Recipes stored and loaded from `recipes.json`
* 📤 Share recipes using the native Web Share API
* 📱 Fully responsive layout for mobile and desktop
* 🧠 Clean and lightweight front-end (no frameworks required)

---

🧩 Tech Stack

* **HTML5** – for structure
* **CSS3** – for styling and layout
* **JavaScript (Vanilla)** – for interactivity and data loading
* **JSON** – for recipe data storage

---

🧠 Git Workflow Used

```bash
# Initialize repo
git init

# Stage and commit project setup
git add .
git commit -m "Initial commit - setup project structure"

# Connect to GitHub
git branch -M main
git remote add origin https://github.com/yourusername/community-cookbook.git
git push -u origin main

# Update recipes
git add recipes.json
git commit -m "Added new recipes to recipes.json"
git push

# Update recipe display logic
git add recipe.html recipe.js
git commit -m "Updated recipe page to load recipes by ID"
git push
```

---

💡 How It Works

1. **Index Page (`index.html`)** — Displays all recipes as cards.
2. **Recipe Page (`recipe.html`)** — Dynamically loads recipe details using the ID in the URL (e.g. `recipe.html?id=spicy-thai-noodles`).
3. **JSON File (`recipes.json`)** — Contains all recipes (title, image, ingredients, and instructions).
4. **JavaScript (`recipe.js`)** — Handles fetching, rendering, and sharing recipes.

---

🧁 Example Recipe ID

```json
{
  "id": "spicy-thai-noodles",
  "title": "Spicy Thai Noodles",
  "category": "Asian Cuisine",
  "image": "images/spicy-thai-noodles.jpg",
  "ingredients": "Rice noodles\nSoy sauce\nChili paste\nVegetables",
  "instructions": "Boil noodles. Stir-fry with sauce and veggies. Serve hot."
}
```

Access via:
👉 `recipe.html?id=spicy-thai-noodles`

---

🚀 Future Improvements

* Add user submissions
* Enable likes and comments
* Filter recipes by category
* Implement search functionality
* Add dark mode toggle

---

Built with ❤️ and JavaScript

---

Would you like me to make this **visually styled for GitHub** (with emojis, headings, and code highlights), or keep it simple like a plain text readme?
