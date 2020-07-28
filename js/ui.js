const recipes = document.querySelector(".recipes");

document.addEventListener("DOMContentLoaded", function () {
  // nav menu
  const menus = document.querySelectorAll(".side-menu");
  M.Sidenav.init(menus, { edge: "right" });
  // add recipe form
  const forms = document.querySelectorAll(".side-form");
  M.Sidenav.init(forms, { edge: "left" });
});

// Render Function

const renderRecipe = (data, id) => {
  const html = `
      <div class="card-panel recipe white row" data-id=${id}>
        <img src="img/dish.png" alt="recipe thumb" />
        <div class="recipe-details">
          <div class="recipe-title">${data.recipe}</div>
          <div class="recipe-ingredients">${data.ingredients}</div>
        </div>
        <div class="recipe-delete">
          <i class="material-icons" data-id=${id}>delete_outline</i>
        </div>
      </div>
  `;

  recipes.innerHTML += html;
};

//add recipe
const addRecipeForm = document.querySelector(".add-recipe");
addRecipeForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const somethingYummy = {
    recipe: addRecipeForm.title.value.trim(),
    ingredients: addRecipeForm.ingredients.value.trim(),
  };

  db.collection("recipes")
    .add(somethingYummy)
    .catch((err) => console.log(err));

  addRecipeForm.title.value = "";
  addRecipeForm.ingredients.value = "";
});
