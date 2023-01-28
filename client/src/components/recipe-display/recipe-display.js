import { useEffect, useState } from "react";

const RecipeDisplay = (props) => {
  const [step, setStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [current, setCurrent] = useState({});
  const [seconds, setSeconds] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [hours, setHours] = useState("00");

  const { recipe } = props;

  useEffect(() => {
    setSteps(recipe.steps.split("\n"));
  }, []);

  useEffect(() => {
    setCurrent(steps[step]);
    let second = current.match(/\d+ second/i);
    let minute = current.match(/\d+ minute/i);
    let hour = current.match(/\d+ hour/i);

    if (second) {
      setSeconds(second.match(/\d+/)[0]);
    }
    if (minute) {
      setMinutes(minute.match(/\d+/)[0]);
    }
    if (hour) {
      setHours(hour.match(/\d+/)[0]);
    }
  }, [step]);
  return (
    <div>
      {step === 0 ? (
        <>
          <h3>Mise en place</h3>
          <ul className="list-disc ml-4 mb-6 mt-8">
            {recipe.ingredients
              ? recipe.ingredients.map((ingredient) => (
                  <li key={ingredient.id}>
                    {ingredient.qty} {ingredient.unit} {ingredient.name}
                  </li>
                ))
              : ""}
          </ul>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default RecipeDisplay();
