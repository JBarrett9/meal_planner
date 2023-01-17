const createRecipe = async ({
  token,
  name,
  steps,
  description,
  source,
  pub,
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
    return result;
  } catch (error) {
    console.error(error);
  }
};

const fetchRecipe = async ({ token, recipeId }) => {
  try {
    const response = await fetch(`/api/recipes/${recipeId}`, {
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

const fetchAccountRecipes = async (token) => {
  try {
    const response = await fetch(`/api/recipes/account`, {
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

export { createRecipe, fetchRecipe, fetchAccountRecipes };
