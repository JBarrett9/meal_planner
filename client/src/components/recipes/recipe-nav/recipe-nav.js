import { Link } from "react-router-dom";

const RecipeNav = () => {
  return (
    <nav>
      <span>
        <label>Search: </label>
        <input />
      </span>
      <span>
        <label>Category:</label>
        <select name="sortBy" id="sortBy">
          <option disabled value={-1}>
            {" "}
            -- select --{" "}
          </option>
        </select>
      </span>
      <Link to="/recipe_form">+ Add a Recipe</Link>
    </nav>
  );
};

export default RecipeNav;
