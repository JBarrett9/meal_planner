import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchStep } from "../../api/recipes";
import Timer from "../timer/timer";

const RecipeDisplay = (props) => {
  const [step, setStep] = useState(0);
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
        <button onClick={() => setStep(step - 1)}>prev.</button>
        <button onClick={() => setStep(step + 1)}>next</button>
      </span>
      {step === 0 ? (
        <>
          <h3>Mise en place</h3>
          <ul className="list-disc ml-4 mb-6 mt-8">
            {ingredients.length > 0
              ? ingredients.map((ingredient) => (
                  <li key={ingredient.id}>
                    {ingredient.qty} {ingredient.unit} {ingredient.name}
                  </li>
                ))
              : ""}
          </ul>
        </>
      ) : (
        <>
          <Timer hours={hours} minutes={minutes} seconds={seconds} />
          <p>{current}</p>
        </>
      )}
    </div>
  );
};

export default RecipeDisplay;
