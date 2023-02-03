import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteRecipe, fetchRecipe } from "../../../api/recipes";
import { useOutsideClick } from "../../../hooks";
import Timer from "../../timer/timer";

const Recipe = (props) => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({});
  const [displayDeleteConfirmation, setDisplayDeleteConfirmation] =
    useState(false);
  const [displayTimer, setDisplayTimer] = useState(false);
  const [displayDateSelect, setDisplayDateSelect] = useState(false);
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

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, setDisplayDeleteConfirmation);

  return (
    <div className="bg-orange-100 dark:bg-stone-800 w-11/12 mx-auto sm:w-3/5 mt-8 shadow shadow-black px-4 py-6 dark:text-white">
      {recipe && recipe.name ? (
        <>
          <span className="flex flex-col">
            <h2 className="text-center text-2xl -mt-2">{recipe.name}</h2>
            <span className="flex justify-around my-2 px-8">
              <Link onClick={() => setDisplayTimer(!displayTimer)}>
                <span class="material-symbols-outlined text-yellow-900 dark:text-yellow-400">
                  timer
                </span>
              </Link>
              <Link to={`/recipes/recipe/${recipeId}/step_view`}>
                <span class="material-symbols-outlined text-emerald-800 dark:text-emerald-300">
                  slideshow
                </span>
              </Link>
              <Link onClick={() => setDisplayDateSelect(!displayDateSelect)}>
                <span class="material-symbols-outlined text-purple-700 dark:text-purple-400">
                  calendar_add_on
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
                  ref={wrapperRef}
                  onClick={() => setDisplayDeleteConfirmation(true)}
                >
                  delete
                </span>
              </Link>
            </span>
          </span>
          {displayTimer ? <Timer hours="00" minutes="00" seconds="00" /> : ""}
          {displayDateSelect ? (
            <span className="w-full flex justify center mb-2">
              <input type="date" className="mx-auto" />
            </span>
          ) : (
            ""
          )}
          {displayDeleteConfirmation ? (
            <div className="absolute h-48 w-80 px-4 bg-white left-1/2 -ml-40 shadow-lg shadow-black dark:bg-zinc-800">
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
              <Link>
                <span className="material-symbols-outlined text-blue-700 dark:text-cyan-400">
                  edit
                </span>
              </Link>
            </span>
            <span className="flex justify-around items-center">
              {recipe.categories
                ? recipe.categories.map((category) => (
                    <li className="bg-emerald-200 text-black px-4 shadow shadow-black">
                      {category.name}
                    </li>
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
