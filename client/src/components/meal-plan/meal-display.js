import { useState } from "react";
import { Link } from "react-router-dom";

const MealDisplay = (props) => {
  const [activeRecipe, setActiveRecipe] = useState({});
  const handleRemove = () => {};

  console.log(activeRecipe);
  return (
    <div className="fixed w-96 px-4 py-4 bg-white border-2 border-black left-1/2 -ml-48 top-20 shadow-lg shadow-black dark:bg-zinc-800">
      <nav className="mb-4 flex">
        <Link
          onClick={() => setActiveRecipe({})}
          className={`w-20 p-1 truncate border-l-2 border-t-2 ${
            activeRecipe.id ? "border-b-2" : "border-b-0"
          }`}
        >
          Recipes
        </Link>
        {props.meal.map((recipe) => (
          <Link
            key={recipe.recipeId}
            onClick={() => setActiveRecipe(recipe)}
            className={`w-20 p-1 truncate border-x-2 border-t-2 border-b-2 ${
              activeRecipe.id && activeRecipe.id === recipe.id
                ? "border-b-0"
                : "border-b-2"
            }`}
          >
            {recipe.name}
          </Link>
        ))}
        <span className="flex-1 border-b-2"></span>
      </nav>
      <ul>
        {activeRecipe.id ? (
          <p>{activeRecipe.name}</p>
        ) : (
          props.meal.map((recipe) => (
            <Link
              key={recipe.recipeId}
              to={`/recipes/recipe/${recipe.recipeId}`}
            >
              <li className="flex justify-between">
                <p>{recipe.name}</p>
                <button
                  onClick={handleRemove}
                  type="submit"
                  class="material-symbols-outlined text-red-700 dark:text-red-300"
                >
                  close
                </button>
              </li>
            </Link>
          ))
        )}
      </ul>
    </div>
  );
};

export default MealDisplay;
