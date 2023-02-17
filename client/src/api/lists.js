const addIngredientToList = async ({
  token,
  listId,
  ingredientId,
  qty,
  unit,
}) => {
  try {
    const response = await fetch(`/api/lists/list/${listId}/ingredients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ingredientId,
        qty,
        unit,
      }),
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

const createList = async ({ token, name }) => {
  try {
    const response = await fetch(`/api/lists/account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
      }),
    });

    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

const fetchAccountLists = async (token) => {
  try {
    const response = await fetch(`/api/lists/account`, {
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

const fetchList = async ({ token, listId }) => {
  try {
    const response = await fetch(`/api/lists/list/${listId}`, {
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

export { addIngredientToList, createList, fetchAccountLists, fetchList };
