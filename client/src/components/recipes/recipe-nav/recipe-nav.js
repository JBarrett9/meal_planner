import { Link } from "react-router-dom";
import "./recipe-nav.css";

const RecipeNav = () => {
  return (
    <nav className="recipe-nav">
      <span className="recipe-nav-sec">
        <label>Search: </label>
        <input />
      </span>
      <span className="recipe-nav-sec">
        <label>Category:</label>
        <select name="sortBy" id="sortBy">
          <option disabled value={-1}>
            {" "}
            -- select --{" "}
          </option>
        </select>
      </span>
      <span className="recipe-nav-sec">
        <Link to="/recipe_form">+ Add a Recipe</Link>
      </span>
    </nav>
  );
};

export default RecipeNav;
