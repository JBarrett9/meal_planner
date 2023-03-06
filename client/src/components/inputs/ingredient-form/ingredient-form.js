import IngredientQuery from "../ingredient-query/ingredient-query";

const IngredientForm = (props) => {
  return (
    <div
      ref={props.wrapperRef}
      className="absolute pb-6 w-80 px-4 bg-stone-200 left-1/2 -ml-40 shadow-lg shadow-black dark:bg-zinc-700"
    >
      <IngredientQuery />
    </div>
  );
};

export default IngredientForm;
