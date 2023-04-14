import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../api/firebase";
import { useAuth } from "../../../contexts/AuthContext";
import { fetchAccountRecipes } from "../../../api/recipes";
import { InputField } from "../../inputs";

const RecipeList = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const delay = setTimeout(async () => {
      const q = query(
        collection(db, "recipes"),
        where("creator", "==", currentUser.uid),
        where("name", ">=", keywords),
        where("name", "<", keywords + "z")
      );
      const querySnapshot = await getDocs(q);
      setRecipes(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setIsLoading(false);
    }, 1000);

    setIsLoading(true);
    return () => clearTimeout(delay);
  }, [keywords]);

  const searchRef = useRef(null);

  return (
    <div className="recipe-list">
      <nav className="w-full px-6 pb-4 mx-auto flex flex-col md:flex-row md:items-center text-center bg-white dark:bg-stone-700 dark:text-stone-50 shadow shadow-black dark:border-none mb-4">
        <InputField
          label="Search: "
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          ref={searchRef}
        />
      </nav>
      <ul className="sm:w-96 mx-auto">
        {isLoading ? (
          <div className="flex mx-auto w-full mt-4 items-center justify-center space-x-2">
            <div className="w-4 h-4 bg-emerald-500 rounded-full animate-bounce delay-1000"></div>
            <div className="w-4 h-4 bg-emerald-500 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-emerald-500 rounded-full animate-bounce delay-1000"></div>
          </div>
        ) : (
          ""
        )}
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <li
              key={recipe.id}
              className="mt-4 text-lg border-2 dark:border-stone-800 shadow shadow-black bg-white border-purple-800 dark:bg-gray-800 dark:text-stone-300 py-2 px-4"
            >
              <Link key={recipe.id} to={`/recipes/recipe/${recipe.id}`}>
                {recipe.name}
              </Link>
            </li>
          ))
        ) : (
          <div className="mx-auto w-fit text-lg my-10 text-center">
            <p className="font-semibold text-orange-300 dark:text-gray-200">
              No recipes found
            </p>
            <Link
              to="/recipes/recipe_form"
              className="text-stone-100 hover:text-teal-200 dark:text-teal-400 dark:hover:text-teal-500 font-bold"
            >
              Add a recipe?
            </Link>
          </div>
        )}
      </ul>
    </div>
  );
};

export default RecipeList;
