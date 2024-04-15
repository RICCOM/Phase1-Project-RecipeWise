document.addEventListener("DOMContentLoaded", function() {
  fetch('db.json')
  .then(response => response.json())
  .then(data => {
      const sidebar = document.querySelector('.sidebar');
      const recipes = data.recipes;

      recipes.forEach(recipe => {
          const recipeItem = document.createElement('div');
          recipeItem.classList.add('recipe-item');
          recipeItem.innerHTML = `
              <span>${recipe.name}</span>
              <button class="delete-btn" data-id="${recipe.id}">Delete</button>
          `;
          sidebar.appendChild(recipeItem);
      });

      const recipeItems = document.querySelectorAll('.recipe-item');
      const mainContent = document.querySelector('.main-content');

      recipeItems.forEach(item => {
          item.addEventListener('click', () => {
              const selectedRecipe = recipes.find(recipe => recipe.id === parseInt(item.querySelector('.delete-btn').dataset.id));
              mainContent.innerHTML = `
                  <h2>${selectedRecipe.name}</h2>
                  <img src="${selectedRecipe.image}" alt="${selectedRecipe.name}">
                  <h3>Ingredients:</h3>
                  <ul>
                      ${selectedRecipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                  </ul>
                  <h3>Instructions:</h3>
                  <p>${selectedRecipe.instructions}</p>
              `;
          });

          const deleteBtn = item.querySelector('.delete-btn');
          deleteBtn.addEventListener('click', (event) => {
              const recipeId = parseInt(event.target.dataset.id);
              const recipeIndex = recipes.findIndex(recipe => recipe.id === recipeId);
              if (recipeIndex !== -1) {
                  recipes.splice(recipeIndex, 1);
                  // Remove from sidebar
                  item.remove();
                  // Remove from main content if currently displayed
                  const displayedRecipe = document.querySelector('.main-content h2');
                  if (displayedRecipe && parseInt(displayedRecipe.dataset.id) === recipeId) {
                      mainContent.innerHTML = '';
                  }
              }
          });
      });
  });
});
