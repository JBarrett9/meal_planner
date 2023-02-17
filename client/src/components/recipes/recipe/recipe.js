import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createCategory, getCategoriesByQuery } from "../../../api/categories";
import { addRecipeToMeal, createMeal } from "../../../api/meals";
import {
  addCategoryToRecipe,
  deleteRecipe,
  fetchRecipe,
} from "../../../api/recipes";
import { useOutsideClick } from "../../../hooks";
import CategoryQuery from "../../inputs/category-query/category-query";
import Timer from "../../timer/timer";
import CategoryOptions from "./category-options";

const Recipe = (props) => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({});
  const [displayDeleteConfirmation, setDisplayDeleteConfirmation] =
    useState(false);
  const [displayTimer, setDisplayTimer] = useState(false);
  const [displayDateSelect, setDisplayDateSelect] = useState(false);
  const [date, setDate] = useState(new Date());
  const [displayCategorySelect, setDisplayCategorySelect] = useState(false);
  const [queriedCategories, setQueriedCategories] = useState([]);
  const [categorySearch, setCategorySearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getRecipe() {
      const data = await fetchRecipe({ token: props.token, recipeId });
      setRecipe(data);
    }

    getRecipe();
  }, [recipeId]);

  const handleDelete = async () => {
    setDisplayDeleteConfirmation(false);
    await deleteRecipe({ token: props.token, recipeId });
    navigate("/recipes");
  };

  const addToMeal = async () => {
    const meal = await createMeal({ token: props.token, date, time: 1 });
    const mealRecipe = await addRecipeToMeal({
      token: props.token,
      mealId: meal.id,
      recipeId,
    });
    if (mealRecipe.id) {
      navigate("/meal_plan");
    }
  };

  useEffect(() => {
    const delay = setTimeout(async () => {
      const categories = await getCategoriesByQuery(categorySearch);
      setQueriedCategories(categories);
    }, 1000);

    return () => clearTimeout(delay);
  }, [categorySearch]);

  const handleCategorySelect = async (category) => {
    await addCategoryToRecipe({
      token: props.token,
      recipeId,
      categoryId: category.id,
    });
    const data = await fetchRecipe({ token: props.token, recipeId });
    setRecipe(data);
  };

  const addNewCategory = async (e) => {
    e.preventDefault();
    const newCategory = await createCategory({
      token: props.token,
      name: categorySearch,
    });
    handleCategorySelect(newCategory);
  };

  const wrapperRef = useRef(null);
  const wrapperRef2 = useRef(null);
  const wrapperRef3 = useRef(null);
  useOutsideClick(wrapperRef, setDisplayDeleteConfirmation);
  useOutsideClick(wrapperRef2, setDisplayDateSelect);
  useOutsideClick(wrapperRef3, setDisplayCategorySelect);

  return (
    <div className="bg-stone-100 dark:bg-stone-800 w-11/12 mx-auto sm:w-3/5 mt-8 shadow shadow-black px-4 py-6 dark:text-white">
      {recipe && recipe.name ? (
        <>
          <span className="flex flex-col">
            <h2 className="text-center text-2xl -mt-2">{recipe.name}</h2>
            <span className="flex justify-around my-2 px-8 w-80 mx-auto">
              <Link onClick={() => setDisplayTimer(!displayTimer)}>
                <span className="material-symbols-outlined text-yellow-900 dark:text-yellow-400">
                  timer
                </span>
              </Link>
              <Link to={`/recipes/recipe/${recipeId}/step_view`}>
                <span className="material-symbols-outlined text-emerald-800 dark:text-emerald-300">
                  slideshow
                </span>
              </Link>
              <Link onClick={() => setDisplayDateSelect(true)}>
                <span
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="material-symbols-outlined text-purple-700 dark:text-purple-400"
                >
                  calendar_add_on
                </span>
              </Link>
              <Link>
                <span class="material-symbols-outlined text-fuchsia-700 dark:text-fuchsia-400">
                  playlist_add
                </span>
              </Link>
              <Link>
                <span className="material-symbols-outlined text-blue-700 dark:text-cyan-400">
                  edit
                </span>
              </Link>
              <Link>
                <span
                  className="material-symbols-outlined text-red-700 dark:text-red-400"
                  onClick={() =>
                    setDisplayDeleteConfirmation(!displayDeleteConfirmation)
                  }
                >
                  delete
                </span>
              </Link>
            </span>
          </span>
          {displayTimer ? <Timer hours="00" minutes="00" seconds="00" /> : ""}
          {displayDateSelect ? (
            <div
              ref={wrapperRef2}
              className="absolute pb-6 w-80 px-4 bg-stone-100 left-1/2 -ml-40 shadow-lg shadow-black dark:bg-zinc-800"
            >
              <h2 className="text-center text-lg mt-4 font-semibold">
                {recipe?.name}
              </h2>
              <span className="w-full flex justify-center mt-2">
                <label className="mr-2 text-lg">Date: </label>
                <input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  className="text-black border border-black focus:shadow-md focus:shadow-black px-2"
                />
              </span>
              <button
                onClick={addToMeal}
                className="mt-2 mb-2 py-1 bg-sky-200 dark:bg-teal-600 px-2 border border-black font-semibold text-md"
              >
                Add
              </button>
            </div>
          ) : (
            ""
          )}
          {displayDeleteConfirmation ? (
            <div
              ref={wrapperRef}
              className="absolute h-48 w-80 px-4 bg-white left-1/2 -ml-40 shadow-lg shadow-black dark:bg-zinc-800"
            >
              <h3 className="text-2xl text-center mt-4 font-medium">
                Are you sure you would like to permanently delete this recipe?
              </h3>
              <span className="flex justify-around mt-6">
                <button
                  type="button"
                  onClick={() => setDisplayDeleteConfirmation(false)}
                  className="w-32 shadow shadow-gray-700 border-2 border-sky-600 dark:border-cyan-300 rounded py-1 text-sky-800 dark:text-cyan-300 font-medium text-xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete()}
                  className="w-32 shadow shadow-gray-700 border-2 border-rose-600 dark:border-red-400 rounded py-1 text-rose-800 dark:text-red-400 font-medium text-xl"
                >
                  Yes
                </button>
              </span>
            </div>
          ) : (
            ""
          )}
          {displayCategorySelect ? (
            <div
              ref={wrapperRef3}
              className="fixed w-80 px-4 py-4 bg-white border-2 border-black left-1/2 -ml-40 top-20 shadow-lg shadow-black dark:bg-zinc-800"
            >
              <span
                onClick={() => setDisplayCategorySelect(false)}
                class="material-symbols-outlined float-right"
              >
                close
              </span>
              <span className="flex mt-4 mt-9">
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
                      className="mr-6 px-2 mt-4 dark:text-white bg-emerald-700 dark:bg-teal-400 text-white dark:text-black tracking-wide font-semibold py-1 border border-black"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          handleCategorySelect(category);
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
            </div>
          ) : (
            ""
          )}
          <cite>{recipe.source}</cite>
          <p>{recipe.description}</p>
          <ul className="list-disc ml-4 mb-6 mt-8">
            {recipe.ingredients
              ? recipe.ingredients.map((ingredient) => (
                  <li key={ingredient.id}>
                    {ingredient.qty} {ingredient.unit} {ingredient.name}
                  </li>
                ))
              : ""}
          </ul>
          <ol className="list-decimal ml-4">
            {recipe.steps
              ? recipe.steps.split("\n").map((step) => (
                  <li key={step} className="mb-4">
                    {step}
                  </li>
                ))
              : ""}
          </ol>
          <ul>
            <span className="flex justify-between">
              <h3>Categories</h3>
              <Link onClick={() => setDisplayCategorySelect(true)}>
                <span class="material-symbols-outlined text-emerald-700 dark:text-teal-300">
                  add
                </span>
              </Link>
            </span>
            <span className="flex justify-around items-center flex-wrap">
              {recipe.categories
                ? recipe.categories.map((category) => (
                    <CategoryOptions category={category} token={props.token} />
                  ))
                : ""}
            </span>
          </ul>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Recipe;
