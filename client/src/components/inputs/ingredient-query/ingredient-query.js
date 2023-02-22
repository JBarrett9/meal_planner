import { useEffect, useState } from "react";
import {
  createIngredient,
  getIngredientsByQuery,
} from "../../../api/ingredients";

const IngredientQuery = (props) => {
  const [queriedIngredients, setQueriedIngredients] = useState([]);
  const [ingredientSearch, setIngredientSearch] = useState("");
  const [qty, setQty] = useState(0);
  const [unit, setUnit] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(async () => {
      const ingredients = await getIngredientsByQuery(ingredientSearch);
      setIsLoading(false);
      setQueriedIngredients(ingredients);
    }, 1000);

    setIsLoading(true);
    return () => clearTimeout(delay);
  }, [ingredientSearch]);

  const handleSubmit = (ingredient) => {
    let newIngredient = { qty, unit, ...ingredient };
    props.setIngredients([...props.ingredients, newIngredient]);
    setIngredientSearch("");
    setQty(0);
    setUnit("");
  };

  const addNewIngredient = async (e) => {
    e.preventDefault();
    const newIngredient = await createIngredient({
      token: props.token,
      name: ingredientSearch,
    });
    console.log(newIngredient);
    handleSubmit(newIngredient);
  };

  return (
    <span className="">
      <span className="flex flex-wrap">
        <div className="flex flex-col mr-4 mt-2 w-12">
          <label className="text-white">Qty</label>
          <input
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            type="number"
            min="0"
            className="border border-black pl-2 text-black"
          />
        </div>
        <div className="flex flex-col mt-2">
          <label className="text-white">Unit</label>
          <select
            value={unit}
            onFocus={(e) => (e.target.size = 7)}
            onBlur={(e) => (e.target.size = 1)}
            onChange={(e) => {
              setUnit(e.target.value);
              e.target.size = 1;
            }}
            className="text-black w-full border border-black text-center"
          >
            <option disabled value="">
              {" "}
              -- select --{" "}
            </option>
            <option disabled> -- Weight --</option>
            <option value="grams">gram/s</option>
            <option value="oz">ounce/s</option>
            <option value="lbs">lbs</option>
            <option disabled> -- Volume --</option>
            <option value="tsp">teaspoon/s</option>
            <option value="tbsp">tablespoon/s</option>
            <option value="cups">cup/s</option>
            <option value="ml">milliliter/s</option>
            <option value="liter">liter/s</option>
            <option value="quart">quart/s</option>
            <option value="gal">gallon/s</option>
            <option disabled> -- Approximate -- </option>
            <option value="pinch">pinch/es</option>
            <option value="dash">dash/es</option>
            <option value="sm">small</option>
            <option value="md">medium</option>
            <option value="lg">large</option>
            <option value="xl">extra-large</option>
            <option disabled>-- Relative --</option>
            <option value="clove">clove/s</option>
            <option value="stalk">stalk/s</option>
            <option value="sprig">sprig/s</option>
          </select>
        </div>
        <div className="flex flex-col mt-2 w-full">
          <label className="text-white">Ingredient: </label>
          <span className="flex">
            <input
              type="search"
              value={ingredientSearch}
              className="border border-black text-black grow pl-2"
              onChange={(e) => setIngredientSearch(e.target.value)}
            ></input>
            {queriedIngredients.length === 0 ? (
              <button
                onClick={(e) => {
                  addNewIngredient(e);
                }}
                className="ml-4 bg-sky-100 dark:bg-teal-600 px-2 border border-black font-semibold text-xl"
              >
                +
              </button>
            ) : (
              <></>
            )}
          </span>
        </div>
      </span>
      <ul className="flex flex-wrap">
        {isLoading ? (
          <div className="flex mx-auto w-full mt-4 items-center justify-center space-x-2">
            <div className="w-4 h-4 bg-sky-400 rounded-full animate-bounce delay-1000"></div>
            <div className="w-4 h-4 bg-sky-400 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-sky-400 rounded-full animate-bounce delay-1000"></div>
          </div>
        ) : (
          ""
        )}
        {queriedIngredients.length ? (
          queriedIngredients.map((ingredient) => (
            <li
              key={ingredient.id}
              className="mr-6 px-2 mt-4 dark:text-white bg-sky-100 dark:bg-teal-700 border border-black"
            >
              <button
                type="button"
                onClick={() => {
                  handleSubmit(ingredient);
                }}
              >
                {ingredient.name} +
              </button>
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </span>
  );
};

export default IngredientQuery;
