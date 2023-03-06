import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchStep } from "../../api/recipes";
import Timer from "../timer/timer";

const RecipeDisplay = (props) => {
  const [step, setStep] = useState(0);
  const [limit, setLimit] = useState(0);
  const [current, setCurrent] = useState("");
  const [seconds, setSeconds] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [hours, setHours] = useState("00");
  const [ingredients, setIngredients] = useState([]);
  const [displayTimer, setDisplayTimer] = useState(false);

  const { recipeId } = useParams();

  useEffect(() => {
    async function getStep() {
      const data = await fetchStep({ token: props.token, recipeId, step });
      setIngredients(data.ingredients);
      setLimit(data.limit);

      if (step > 0) {
        setCurrent(data.current);
        setSeconds(data.seconds);
        setMinutes(data.minutes);
        setHours(data.hours);
      }
    }

    getStep();
  }, [step]);

  return (
    <div className="mx-auto mt-4 w-96 bg-orange-100 dark:bg-stone-800 dark:text-white px-4 py-2">
      <span className="flex justify-between mb-2">
        {step > 0 ? (
          <button onClick={() => setStep(step - 1)}>prev.</button>
        ) : (
          <span></span>
        )}
        {step < limit ? (
          <button onClick={() => setStep(step + 1)}>next</button>
        ) : (
          <span></span>
        )}
      </span>
      {step === 0 ? (
        <div className="flex flex-col">
          <h3 className="text-center text-xl">Mise en place</h3>
          <ul className="list-disc mx-auto mb-6 mt-2">
            {ingredients.length > 0
              ? ingredients.map((ingredient) => (
                  <li key={ingredient.id}>
                    {ingredient.qty} {ingredient.unit} {ingredient.name}
                  </li>
                ))
              : ""}
          </ul>
        </div>
      ) : (
        <div>
          {displayTimer ? (
            <span className="flex justify-around items-center">
              <Timer hours={hours} minutes={minutes} seconds={seconds} />
              <button
                onClick={() => setDisplayTimer(!displayTimer)}
                className="material-symbols-outlined"
              >
                close
              </button>
            </span>
          ) : (
            <Link
              className="flex justify-center"
              onClick={() => setDisplayTimer(!displayTimer)}
            >
              <span className="material-symbols-outlined text-yellow-900 dark:text-yellow-400">
                timer
              </span>
            </Link>
          )}
          <p>{current}</p>
        </div>
      )}
    </div>
  );
};

export default RecipeDisplay;
