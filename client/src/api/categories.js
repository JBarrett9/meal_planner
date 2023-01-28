const createCategory = async ({ token, name }) => {
  try {
    const response = await fetch(`/api/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

const getCategoriesByQuery = async (query) => {
  try {
    let url = `/api/categories/query?search=`;
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

export { createCategory, getCategoriesByQuery };
