import { NavLink } from "react-router-dom";

const UsersNav = () => {
  return (
    <nav className="w-full flex flex-col md:flex-row md:justify-between pr-4 bg-stone-400 shadow shadow-black dark:bg-stone-700 py-4 text-stone-700 font-semibold dark:text-stone-50 flex">
      <span className="mx-auto mb-4 md:mx-0 md:mb-0">
        <NavLink
          end
          to="/admin/users/accounts"
          className={({ isActive }) =>
            isActive
              ? "text-stone-700 dark:text-gray-400 ml-4"
              : "ml-4 hover:text-stone-900 dark:hover:text-stone-200"
          }
        >
          Accounts
        </NavLink>
        <NavLink
          end
          to="/admin/users/all"
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
          to="/admin/users/new"
          className={({ isActive }) =>
            isActive
              ? "text-stone-700 dark:text-gray-400 ml-4"
              : "ml-4 hover:text-stone-900 dark:hover:text-stone-200"
          }
        >
          Create User
        </NavLink>
      </span>
      <span className="mx-auto md:mx-0">
        <label className="mr-2">Search: </label>
        <input type="text" />
      </span>
    </nav>
  );
};

export default UsersNav;
