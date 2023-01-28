import { useEffect, useState } from "react";
import { createCategory, getCategoriesByQuery } from "../../../api/categories";

const CategoryQuery = (props) => {
  const [queriedCategories, setQueriedCategories] = useState([]);
  const [categorySearch, setCategorySearch] = useState("");

  useEffect(() => {
    const delay = setTimeout(async () => {
      const categories = await getCategoriesByQuery(categorySearch);
      setQueriedCategories(categories);
    }, 1000);

    return () => clearTimeout(delay);
  }, [categorySearch]);

  const handleSubmit = (category) => {
    props.setCategories([...props.categories, category]);
    setCategorySearch("");
  };

  const addNewCategory = async (e) => {
    e.preventDefault();
    const newCategory = await createCategory({
      token: props.token,
      name: categorySearch,
    });
    handleSubmit(newCategory);
  };

  return (
    <span className="">
      <span className="flex mt-4">
        <input
          type="text"
          value={categorySearch}
          onChange={(e) => setCategorySearch(e.target.value)}
          className="grow border border-black text-black pl-2"
        />
        {queriedCategories.length === 0 ? (
          <button
            onClick={(e) => {
              addNewCategory(e);
            }}
            className="ml-4 bg-sky-100 dark:bg-teal-600 px-2 border border-black font-semibold text-xl"
          >
            +
          </button>
        ) : (
          <></>
        )}
      </span>
      <ul className="flex flex-wrap">
        {queriedCategories.length ? (
          queriedCategories.map((category) => (
            <li
              key={category.id}
              className="mr-6 px-2 mt-4 dark:text-white bg-sky-100 dark:bg-teal-700 border border-black"
            >
              <button
                type="button"
                onClick={() => {
                  handleSubmit(category);
                }}
                className="capitalize"
              >
                {category.name} +
              </button>
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </span>
  );
};

export default CategoryQuery;
