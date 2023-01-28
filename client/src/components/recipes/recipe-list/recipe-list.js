import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAccountRecipes } from "../../../api/recipes";
import { RecipeListNav } from "../recipe-navs";

const RecipeList = (props) => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    async function getRecipes() {
      const data = await fetchAccountRecipes(props.token);
      setRecipes(data);
    }

    getRecipes();
  }, []);
  return (
    <div className="recipe-list">
      <RecipeListNav />
      <ul className="w-96 mx-auto">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Link key={recipe.id} to={`/recipes/recipe/${recipe.id}`}>
              <li className="mt-4 text-lg bg-purple-300 dark:bg-gray-800 dark:text-stone-300 py-2 px-4">
                {recipe.name}
              </li>
            </Link>
          ))
        ) : (
          <div className="mx-auto w-fit text-lg my-10">
            <p className="dark:text-gray-200">
              You haven't added any recipes yet
            </p>
            <Link
              to="/recipes/recipe_form"
              className="text-teal-800 hover:text-teal-900 dark:text-teal-400 dark:hover:text-teal-500 font-bold"
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
