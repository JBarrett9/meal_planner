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
      {props.user?.admin ? (
        <Link
          onClick={() => {
            props.setMenuOpen(false);
          }}
          to="/admin"
        >
          Admin Dashboard
        </Link>
      ) : (
        ""
      )}
      <Link
        to="/meal_plan"
        onClick={() => {
          props.setMenuOpen(false);
        }}
      >
        My Meal Plan
      </Link>
      <Link
        to="/recipes"
        onClick={() => {
          props.setMenuOpen(false);
        }}
      >
        Recipes
      </Link>
      <Link
        to="/lists"
        onClick={() => {
          props.setMenuOpen(false);
        }}
      >
        Grocery Lists
      </Link>
      <Link
        to="/inventory"
        onClick={() => {
          props.setMenuOpen(false);
        }}
      >
        My Inventory
      </Link>
      <Link
        to="/account"
        onClick={() => {
          props.setMenuOpen(false);
        }}
      >
        Account Settings
      </Link>
      <Link
        onClick={() => {
          props.logout();
          props.setMenuOpen(false);
        }}
        to="/"
        className="mt-2"
      >
        Sign Out
      </Link>
    </nav>
  );
};

export default Menu;
