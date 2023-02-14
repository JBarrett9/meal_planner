import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  const { recipeId } = useParams();

  useEffect(() => {
    async function getStep() {
      const data = await fetchStep({ token: props.token, recipeId, step });
      setIngredients(data.ingredients);
      setLimit(data.limit);

      console.log(data);

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
        <>
          <Timer hours={hours} minutes={minutes} seconds={seconds} />
          <p className="mb-4 mx-2">{current}</p>
        </>
      )}
    </div>
  );
};

export default RecipeDisplay;
