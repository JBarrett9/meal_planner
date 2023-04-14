import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  addRecipeToMeal,
  createMeal,
  fetchAccountMeals,
} from "../../api/meals";
import { fetchAccountRecipes } from "../../api/recipes";
import { useOutsideClick } from "../../hooks";
import MealDisplay from "./meal-display";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../api/firebase";
import { useAuth } from "../../contexts/AuthContext";

const MealPlan = (props) => {
  const [displayForm, setDisplayForm] = useState(false);
  const [meals, setMeals] = useState([]);
  const today = new Date();
  const [weekday, setWeekday] = useState(today.toDateString());
  const [keywords, setKeywords] = useState("");
  const [date, setDate] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentMeal, setCurrentMeal] = useState([]);
  const [mealDisplay, setMealDisplay] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    async function getMeals() {
      const q = query(
        collection(db, "meals"),
        where("creator", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      setMeals(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setIsLoading(false);
    }

    getMeals();
  }, []);

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

  const mealsCollectionRef = collection(db, "meals");
  const handleRecipeSelect = async (recipe) => {
    const docRef = await addDoc(mealsCollectionRef, {
      creator: currentUser.uid,
      ...recipe,
      date,
    });
    setDisplayForm(false);
  };

  const week = Array.from(Array(7).keys()).map((idx) => {
    const d = new Date(weekday);
    d.setDate(d.getDate() - d.getDay() + idx);
    return d;
  });

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  console.log(meals);

  const wrapperRef = useRef(null);
  const wrapperRef2 = useRef(null);
  useOutsideClick(wrapperRef, setDisplayForm);
  useOutsideClick(wrapperRef2, setMealDisplay);

  return (
    <span className="flex flex-wrap mx-auto mt-4 w-11/12 lg:w-max dark:text-white">
      <div ref={wrapperRef}>
        {displayForm ? (
          <div className="absolute pb-6 w-80 px-4 bg-stone-200 left-1/2 -ml-40 shadow-lg shadow-black dark:bg-zinc-800">
            <h2 className="text-xl text-center font-semibold mt-4">
              Select Recipe
            </h2>
            <span className="flex justify-center mt-2">
              <label className="mr-2">Search: </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="border border-black focus:shadow-md focus:shadow-black"
              />
            </span>
            {isLoading ? (
              <div className="flex mx-auto w-full mt-4 items-center justify-center space-x-2">
                <div className="w-4 h-4 bg-emerald-500 rounded-full animate-bounce delay-1000"></div>
                <div className="w-4 h-4 bg-emerald-500 rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-emerald-500 rounded-full animate-bounce delay-1000"></div>
              </div>
            ) : (
              ""
            )}
            <span className="flex flex-wrap">
              {recipes.length > 0 ? (
                recipes.map((recipe) => (
                  <button
                    key={recipe.id}
                    onClick={() => handleRecipeSelect(recipe)}
                    className="mt-4 bg-purple-300 dark:bg-teal-700 dark:text-stone-300 py-1 px-4 text-sm capitalize mx-2 shadow shadow-black"
                  >
                    {recipe.name}
                  </button>
                ))
              ) : (
                <div className="mx-auto w-fit text-lg mt-4 text-center">
                  <p className="dark:text-gray-200">No recipes found</p>
                  <Link
                    to="/recipes/recipe_form"
                    className="text-teal-800 hover:text-teal-900 dark:text-teal-400 dark:hover:text-teal-500 font-bold"
                  >
                    Add a recipe?
                  </Link>
                </div>
              )}
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
      <div ref={wrapperRef2}>
        {mealDisplay ? <MealDisplay meal={currentMeal} /> : ""}
      </div>
      {week.map((day) => (
        <div
          key={day.toDateString()}
          className={`border border-black dark:border-teal-300 bg-stone-100 shadow-md shadow-gray-700 flex flex-col w-28 m-1 text-center pb-2 ${
            day.toDateString() === today.toDateString()
              ? "bg-sky-100 dark:bg-slate-800"
              : "dark:bg-stone-800"
          }`}
        >
          <span className="flex justify-between pl-2">
            {days[day.getDay()]}
            <span className="pr-2 border-l border-b border-black dark:border-teal-300 w-8 text-right">
              {day.getDate()}
            </span>
          </span>
          {meals[day.toDateString()] ? (
            <ul
              onClick={() => {
                setCurrentMeal(meals[day.toDateString()]);
                setMealDisplay(true);
              }}
            >
              {meals[day.toDateString()].map((recipe) => (
                <li key={recipe.id}>{recipe.name}</li>
              ))}
            </ul>
          ) : (
            ""
          )}
          <button
            onClick={(e) => {
              setDate(day);
              setDisplayForm(true);
            }}
            className="text-blue-800 dark:text-blue-300 font-semibold text-3xl"
          >
            +
          </button>
        </div>
      ))}
    </span>
  );
};

export default MealPlan;
