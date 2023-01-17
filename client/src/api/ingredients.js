const createIngredient = async ({
  token,
  name,
  conversion,
  calories,
  type,
  nutrition,
}) => {
  try {
    const response = await fetch(`/api/ingredients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        conversion,
        calories,
        type,
        nutrition,
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

const getIngredientsByQuery = async (query) => {
  try {
    let url = `/api/ingredients/query?search=`;
    if (query) {
      url = url + query;
    }

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export { createIngredient, getIngredientsByQuery };
