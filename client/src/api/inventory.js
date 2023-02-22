import { BASE_URL } from ".";

const addIngredientToInventory = async ({
  token,
  inventoryId,
  ingredientId,
  qty,
  unit,
}) => {
  try {
    const response = await fetch(
      `/api/inventories/${inventoryId}/ingredients`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: {
          ingredientId,
          qty,
          unit,
        },
      }
    );

    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

const fetchInventory = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/api/inventories`, {
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

export { addIngredientToInventory, fetchInventory };
