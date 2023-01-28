import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteRecipe, fetchRecipe } from "../../../api/recipes";
import Timer from "../../timer/timer";

const Recipe = (props) => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({});
  const [displayDeleteConfirmation, setDisplayDeleteConfirmation] =
    useState(false);
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

  return (
    <div className="bg-orange-100 dark:bg-stone-800 w-11/12 mx-auto sm:w-3/5 mt-8 shadow shadow-black px-4 py-6 dark:text-white">
      <span className="flex flex-wrap justify-between">
        <span></span>
        <h2 className="text-center text-2xl -mt-2 mr-6">{recipe.name}</h2>
        <span className="">
          <Link className="mr-4 -ml-8">
            <span class="material-symbols-outlined text-emerald-800 dark:text-emerald-300">
              slideshow
            </span>
          </Link>
          <Link>
            <span className="mr-4 material-symbols-outlined text-blue-700 dark:text-cyan-400">
              edit
            </span>
          </Link>
          <Link>
            <span
              className="material-symbols-outlined text-red-700 dark:text-red-400"
              onClick={() => setDisplayDeleteConfirmation(true)}
            >
              delete
            </span>
          </Link>
        </span>
      </span>
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
      <Timer hours={"00"} minutes={"01"} seconds={"00"} />
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
    </div>
  );
};

export default Recipe;
