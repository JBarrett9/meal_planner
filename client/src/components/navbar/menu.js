import { useRef } from "react";
import { Link } from "react-router-dom";

const Menu = (props) => {
  return (
    <nav
      className={
        props.menuOpen
          ? "absolute right-2 bg-white shadow-md shadow-gray-500 flex flex-col border-solid border-black dark:border-cyan-50 border-2 w-72 items-center py-4 dark:bg-zinc-800 text-xl dark:text-cyan-50"
          : "hidden"
      }
    >
      <Link to="/meal_plan">My Meal Plan</Link>
      <Link to="/recipes">Recipes</Link>
      <Link to="/lists">Grocery Lists</Link>
      <Link to="/inventory">My Inventory</Link>
      <Link to="/account">Account Settings</Link>
      <Link onClick={() => props.logout()} to="/" className="mt-2">
        Sign Out
      </Link>
    </nav>
  );
};

export default Menu;
