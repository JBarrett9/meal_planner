import { NavLink } from "react-router-dom";

const RecipeNav = () => {
  return (
    <nav className="w-full bg-emerald-400 shadow shadow-black dark:bg-stone-800 py-4 text-stone-800 font-semibold dark:text-stone-50 flex border-y border-black ">
      <NavLink
        end
        to="/recipes"
        className={({ isActive }) =>
          isActive
            ? "text-stone-700 dark:text-gray-400 ml-4"
            : "ml-4 hover:text-stone-900 dark:hover:text-stone-200"
        }
      >
        Recipes
      </NavLink>
      <NavLink
        to="/recipes/recipe_form"
        className={({ isActive }) =>
          isActive
            ? "text-stone-700 dark:text-gray-400 ml-4"
            : "ml-4 hover:text-stone-900 dark:hover:text-stone-200"
        }
      >
        Add a Recipe
      </NavLink>
    </nav>
  );
};

export default RecipeNav;
