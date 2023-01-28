import { NavLink } from "react-router-dom";

const AdminNav = () => {
  return (
    <nav className="w-full bg-slate-500 shadow shadow-black dark:bg-stone-800 py-4 text-stone-800 font-semibold dark:text-stone-50 flex">
      <NavLink
        end
        to="/admin/users"
        className={({ isActive }) =>
          isActive
            ? "text-stone-700 dark:text-gray-400 ml-4"
            : "ml-4 hover:text-stone-900 dark:hover:text-stone-200"
        }
      >
        Users
      </NavLink>
      <NavLink
        end
        to="/admin/ingredients"
        className={({ isActive }) =>
          isActive
            ? "text-stone-700 dark:text-gray-400 ml-4"
            : "ml-4 hover:text-stone-900 dark:hover:text-stone-200"
        }
      >
        Ingredients
      </NavLink>
      <NavLink
        end
        to="/admin/recipes"
        className={({ isActive }) =>
          isActive
            ? "text-stone-700 dark:text-gray-400 ml-4"
            : "ml-4 hover:text-stone-900 dark:hover:text-stone-200"
        }
      >
        Recipes
      </NavLink>
    </nav>
  );
};

export default AdminNav;
