const addCategoryToRecipe = async ({ token, recipeId, categoryId }) => {
  try {
    const response = await fetch(`/api/recipes/recipe/${recipeId}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        categoryId,
      }),
    });

    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

const createRecipe = async ({
  token,
  name,
  steps,
  description,
  source,
  pub,
  ingredients,
  categories,
}) => {
  try {
    const response = await fetch(`/api/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        steps,
        description,
        source,
        pub,
      }),
    });

    const result = await response.json();

    for (let ingredient of ingredients) {
      await fetch(`/api/recipes/recipe/${result.id}/ingredients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ingredientId: ingredient.id,
          qty: ingredient.qty,
          unit: ingredient.unit,
          order: ingredient.order,
        }),
      });
    }

    for (let category of categories) {
      await fetch(`/api/recipes/recipe/${result.id}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          categoryId: category.id,
          recipeId: result.id,
        }),
      });
    }

    return result;
  } catch (error) {
    console.error(error);
  }
};

const deleteRecipe = async ({ token, recipeId }) => {
  try {
    const response = await fetch(`/api/recipes/recipe/${recipeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

const fetchRecipe = async ({ token, recipeId }) => {
  try {
    const response = await fetch(`/api/recipes/recipe/${recipeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

const fetchAccountRecipes = async (token, query, page) => {
  try {
    const response = await fetch(
      `/api/recipes/account?search=${query}&page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

const fetchStep = async ({ token, recipeId, step }) => {
  try {
    const response = await fetch(
      `/api/recipes/recipe/${recipeId}/step_view?step=${step}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

const removeCategoryFromRecipe = async ({ token, recicpeCategoryId }) => {
  try {
    const response = await fetch(
      `/api/recipes/recipe_category/${recicpeCategoryId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export {
  addCategoryToRecipe,
  createRecipe,
  deleteRecipe,
  fetchRecipe,
  fetchAccountRecipes,
  fetchStep,
  removeCategoryFromRecipe,
};
