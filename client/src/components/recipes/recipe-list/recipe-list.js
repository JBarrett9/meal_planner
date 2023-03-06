import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAccountRecipes } from "../../../api/recipes";
import { FormInput } from "../../inputs";

const RecipeList = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(async () => {
      const data = await fetchAccountRecipes(props.token, keywords, page);
      setIsLoading(false);
      setRecipes(data);
    }, 1000);

    setIsLoading(true);
    return () => clearTimeout(delay);
  }, [keywords]);

  return (
    <div className="recipe-list">
      <nav className="w-full px-6 pb-4 mx-auto flex flex-col md:flex-row md:items-center text-center bg-white dark:bg-stone-700 dark:text-stone-50 shadow shadow-black dark:border-none mb-4">
        <FormInput
          label="Search: "
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
      </nav>
      <ul className="sm:w-96 mx-auto">
        {isLoading ? (
          <div className="flex mx-auto w-full mt-4 items-center justify-center space-x-2">
            <div className="w-4 h-4 bg-emerald-500 rounded-full animate-bounce delay-1000"></div>
            <div className="w-4 h-4 bg-emerald-500 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-emerald-500 rounded-full animate-bounce delay-1000"></div>
          </div>
        ) : (
          ""
        )}
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Link key={recipe.id} to={`/recipes/recipe/${recipe.id}`}>
              <li className="mt-4 text-lg font-semibold border-t border-stone-800 shadow shadow-black bg-purple-400/75 dark:bg-gray-800 dark:text-stone-300 py-2 px-4">
                {recipe.name}
              </li>
            </Link>
          ))
        ) : (
          <div className="mx-auto w-fit text-lg my-10 text-center">
            <p className="font-semibold text-orange-300 dark:text-gray-200">
              No recipes found
            </p>
            <Link
              to="/recipes/recipe_form"
              className="text-stone-100 hover:text-teal-200 dark:text-teal-400 dark:hover:text-teal-500 font-bold"
            >
              Add a recipe?
            </Link>
          </div>
        )}
      </ul>
    </div>
  );
};

export default RecipeList;
