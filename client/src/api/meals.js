import { BASE_URL } from ".";

const addRecipeToMeal = async ({ token, mealId, recipeId }) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/meals/meal/${mealId}/recipes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          recipeId,
        }),
      }
    );

    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

const createMeal = async ({ token, date, time }) => {
  try {
    const response = await fetch(`${BASE_URL}/api/meals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        date,
        time,
      }),
    });

    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

const fetchAccountMeals = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/api/meals/account`, {
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

const fetchMeal = async ({ token, mealId }) => {
  try {
    const response = await fetch(`${BASE_URL}/api/meals/meal/${mealId}`, {
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

export { addRecipeToMeal, createMeal, fetchAccountMeals, fetchMeal };
