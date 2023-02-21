import { BASE_URL } from ".";

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

export { fetchInventory };
