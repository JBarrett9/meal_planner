import { useEffect, useRef, useState } from "react";
import { createIngredient, updateIngredient } from "../../../api/ingredients";
import { useOutsideClick } from "../../../hooks";

const IngredientForm = (props) => {
  const [name, setName] = useState("");
  const [conversion, setConversion] = useState(0);
  const [calories, setCalories] = useState(0);
  const [type, setType] = useState("");
  const [nutrition, setNutrition] = useState("");

  useEffect(() => {
    setName(props?.ingredient?.name);
    setConversion(props?.ingredient?.conversion);
    setCalories(props?.ingredient?.calories);
    setType(props?.ingredient?.type);
    setNutrition(props?.ingredient?.nutrition);
  }, [props]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (props?.ingredient?.id) {
      const response = await updateIngredient({
        token: props.token,
        ingredientId: props.ingredient.id,
        fields: { name, conversion, calories, type, nutrition },
      });
      if (response.id) {
        props.setDisplay(false);
      }
    } else {
      const response = await createIngredient({
        token: props.token,
        name,
        conversion,
        calories,
        type,
        nutrition,
      });
      if (response.id) {
        props.setDisplay(false);
      }
    }
  };

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, props.setDisplay);

  return (
    <form
      ref={wrapperRef}
      onSubmit={(e) => handleSubmit(e)}
      className="absolute pb-6 w-80 px-4 bg-stone-200 left-1/2 -ml-40 shadow-lg shadow-black dark:bg-zinc-700 dark:text-white flex flex-col pt-6"
    >
      <span className="mt-4">
        <label className="mr-4">Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-black px-2 text-center"
        />
      </span>
      <span className="mt-4">
        <label className="mr-4">Conversion (grams in 1 cup): </label>
        <input
          type="number"
          value={conversion}
          onChange={(e) => setConversion(e.target.value)}
          className="text-black px-2 w-16 text-center"
        />
      </span>
      <span className="mt-4">
        <label className="mr-4">Calories (per 100 grams): </label>
        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          className="text-black px-2 w-16 text-center"
        />
      </span>
      <span className="mt-4">
        <label className="mr-4">Type: </label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="text-black px-2 text-center"
        />
      </span>
      <span className="mt-4">
        <label className="mr-4">Nutrition: </label>
        <input
          type="text"
          value={nutrition}
          onChange={(e) => setNutrition(e.target.value)}
          className="text-black px-2 text-center"
        />
      </span>
      {props?.ingredient?.id ? (
        <button className="mt-4">Update</button>
      ) : (
        <button className="mt-4">Create</button>
      )}
    </form>
  );
};

export default IngredientForm;
