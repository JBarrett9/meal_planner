import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchIngredients } from "../../../api/ingredients";

const Ingredients = () => {
  const [queriedIngredients, setQueriedIngredients] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(async () => {
      const ingredients = await fetchIngredients(keywords, 1);
      setIsLoading(false);
      setQueriedIngredients(ingredients);
    }, 1000);

    setIsLoading(true);
    return () => clearTimeout(delay);
  }, [keywords]);

  return (
    <>
      <nav className="w-full py-2 flex flex-col bg-slate-200 dark:bg-stone-700 dark:text-stone-50 shadow shadow-black dark:border-none mb-4">
        <NavLink className="ml-4 hover:text-stone-900 dark:hover:text-stone-200">
          Create Ingredient
        </NavLink>
        <span className="mt-4">
          <label className="ml-4 mr-2">Search:</label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="border border-black"
          />
        </span>
      </nav>
      {isLoading ? (
        <div className="flex mx-auto w-full mt-4 items-center justify-center space-x-2">
          <div className="w-4 h-4 bg-emerald-500 rounded-full animate-bounce delay-1000"></div>
          <div className="w-4 h-4 bg-emerald-500 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-emerald-500 rounded-full animate-bounce delay-1000"></div>
        </div>
      ) : (
        ""
      )}
      {queriedIngredients.map((ingredient) => (
        <p>{ingredient.name}</p>
      ))}
    </>
  );
};

export default Ingredients;
