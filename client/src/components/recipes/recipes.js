import RecipeList from "./recipe-list/recipe-list";
import RecipeNav from "./recipe-nav/recipe-nav";

const Recipes = () => {
  return (
    <div className="recipes">
      <RecipeNav />
      <RecipeList />
    </div>
  );
};

export default Recipes;
