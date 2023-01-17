import { Link } from "react-router-dom";
import { RecipeListNav } from "../recipe-navs";

const RecipeList = () => {
  const recipes = [];
  return (
    <div className="recipe-list">
      <RecipeListNav />
      {recipes.length > 0 ? (
        recipes.map(() => (
          <table>
            <tr></tr>
          </table>
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
    </div>
  );
};

export default RecipeList;
