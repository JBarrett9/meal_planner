import { useState } from "react";
import { removeCategoryFromRecipe } from "../../../api/recipes";

const CategoryOptions = (props) => {
  const { category } = props;
  const [displayOptions, setDisplayOptions] = useState(false);

  const handleRemove = async () => {
    const response = await removeCategoryFromRecipe({
      token: props.token,
      recicpeCategoryId: category.id,
    });
  };

  return (
    <li className="flex mt-2">
      <span
        onClick={() => setDisplayOptions(!displayOptions)}
        className="bg-emerald-700 dark:bg-teal-400 capitalize text-white dark:text-black py-1 tracking-wide font-semibold px-4 shadow shadow-black"
      >
        {category.name}
      </span>
      {displayOptions ? (
        <span className="ml-2 bg-orange-200 dark:bg-stone-600 h-6 px-2">
          <button class="material-symbols-outlined text-emerald-700 dark:text-blue-300">
            menu
          </button>
          <button
            onClick={handleRemove}
            type="submit"
            class="material-symbols-outlined text-red-700 dark:text-red-300"
          >
            close
          </button>
        </span>
      ) : (
        ""
      )}
    </li>
  );
};

export default CategoryOptions;
