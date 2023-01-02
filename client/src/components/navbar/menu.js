import { Link } from "react-router-dom";

const Menu = (props) => {
  return (
    <nav className={props.menuOpen ? "menu" : "hidden"}>
      <Link to="/meal_plan">My Meal Plan</Link>
      <Link to="/recipes">Recipes</Link>
      <Link to="/lists">Shopping Lists</Link>
      <Link to="/inventory">My Inventory</Link>
      <Link to="/account">Account Settings</Link>
      <Link to="/" style={{ marginTop: "2rem" }}>
        Sign Out
      </Link>
    </nav>
  );
};

export default Menu;
