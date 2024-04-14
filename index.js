document.addEventListener('DOMContentLoaded', function () {
  // Fetch recipes from the API
  fetch('http://localhost:3000/recipes')
    .then(response => response.json())
    .then(data => {
      // Display recipe list as cards
      const recipeCardsContainer = document.querySelector('.recipe-cards');
      data.forEach(recipe => {
        const card = document.createElement('div');
        card.classList.add('recipe-card');
        
        const title = document.createElement('h3');
        title.textContent = recipe.title;
        card.appendChild(title);
        
        const image = document.createElement('img');
        image.src = `assets/recipe${recipe.id}.jpg`;
        image.alt = 'Recipe Image';
        card.appendChild(image);
        
        recipeCardsContainer.appendChild(card);
  
        // Add click event listener to each recipe card
        card.addEventListener('click', function () {
          displayRecipe(recipe);
        });
      });
    })
    .catch(error => console.error('Error fetching recipes:', error));
  
  function displayRecipe(recipe) {
    // Display recipe details
    document.getElementById('recipe-title').textContent = recipe.title;
    document.getElementById('recipe-image').src = `assets/recipe${recipe.id}.jpg`;
    document.getElementById('recipe-description').textContent = recipe.description;
  
    // Display ingredients
    const ingredientsList = document.getElementById('recipe-ingredients');
    ingredientsList.innerHTML = ''; // Clear previous ingredients
    recipe.ingredients.forEach(ingredient => {
      const li = document.createElement('li');
      li.textContent = ingredient;
      ingredientsList.appendChild(li);
    });
  
    // Display instructions
    document.getElementById('recipe-instructions').textContent = recipe.instructions;
  }
});

  
  