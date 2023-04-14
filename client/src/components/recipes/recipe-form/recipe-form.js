import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createRecipe } from "../../../api/recipes";
import { Form, FormList, InputField } from "../../inputs";
import CategoryQuery from "../../inputs/category-query/category-query";
import IngredientQuery from "../../inputs/ingredient-query/ingredient-query";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../api/firebase";
import { useAuth } from "../../../contexts/AuthContext";

const RecipeForm = (props) => {
  const [name, setName] = useState("");
  const [steps, setSteps] = useState([]);
  const [step, setStep] = useState("");
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [makePublic, setMakePublic] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  const addStep = (e) => {
    e.preventDefault();
    setSteps([...steps, step]);
    setStep("");
  };

  const removeCategory = (idx) => {
    let temp = [...categories];
    temp.splice(idx, 1);
    setCategories(temp);
  };

  const removeStep = (idx) => {
    let temp = [...steps];
    temp.splice(idx, 1);
    setSteps(temp);
  };

  const updateStep = (value, idx) => {
    let temp = [...steps];
    temp[idx] = value;
    setSteps(temp);
  };

  const recipesCollectionRef = collection(db, "recipes");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const recipe = await addDoc(recipesCollectionRef, {
        creator: currentUser.uid,
        name,
        steps: steps.join("\n"),
        description,
        source,
        makePublic,
        ingredients,
        categories,
      });

      if (recipe.id) {
        navigate("/recipes");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (location.state) {
      const { recipe } = location.state;
      setName(recipe.name);
      setSteps(recipe.steps.split("\n"));
      setDescription(recipe.description);
      setSource(recipe.source);
      setIngredients(recipe.ingredients);
      setCategories(recipe.categories);
      setMakePublic(recipe.public);
    }
  }, []);

  const titleRef = useRef(null);
  const ReferenceRef = useRef(null);

  return (
    <Form title="New Recipe">
      <InputField
        label="Title: "
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        inputRef={titleRef}
      />
      <InputField
        label="Reference: "
        type="text"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        inputRef={ReferenceRef}
      />
      <span className="flex flex-col mt-4">
        <label>Description: </label>
        <textarea
          value={description}
          className="border border-black text-black px-2 py-2 h-24"
          onChange={(e) => setDescription(e.target.value)}
        />
      </span>
      <span className="mt-4">
        <label>Ingredients: </label>
        <FormList items={ingredients} setItems={setIngredients} />
        <IngredientQuery
          submitFunction={(newIngredient) => {
            setIngredients([...ingredients, newIngredient]);
          }}
        />
      </span>
      <span className="mt-4">
        <label>Steps: </label>
        <ol className="list-decimal ml-4">
          {steps.map((step, idx) => (
            <li key={idx}>
              <input
                type="text"
                value={steps[idx]}
                onChange={(e) => updateStep(e.target.value, idx)}
                className="dark:bg-stone-800"
              />
              <button
                type="button"
                className="border border-black ml-1 bg-red-500 text-white px-1 text-xs"
                onClick={() => removeStep(idx)}
              >
                X
              </button>
            </li>
          ))}
        </ol>
      </span>
      <span className="flex mt-4">
        <input
          type="text"
          value={step}
          onChange={(e) => setStep(e.target.value)}
          className="grow border border-black text-black pl-2"
        />
        <button
          className="ml-4 bg-sky-100 dark:bg-teal-600 px-2 border border-black font-semibold text-xl"
          onClick={(e) => addStep(e)}
        >
          +
        </button>
      </span>
      <span className="mt-4">
        <label>Categories: </label>
        <ul className="ml-4 flex flex-wrap">
          {categories.map((category, idx) => (
            <li key={idx} className="mr-4">
              {category.name}{" "}
              <button
                type="button"
                className="border border-black ml-1 bg-red-500 text-white px-1 text-xs"
                onClick={() => removeCategory(idx)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
        <CategoryQuery
          categories={categories}
          setCategories={setCategories}
          token={props.token}
        />
      </span>
      <span className="mt-4 flex justify-center items-center">
        <label className="mr-2">Make Public? </label>
        <input
          checked={makePublic}
          onChange={() => setMakePublic(!makePublic)}
          type="checkbox"
          className="h-5 w-5"
        />
      </span>
      <button
        onClick={(e) => handleSubmit(e)}
        className="mt-6 mb-4 py-2 bg-sky-100 dark:bg-teal-600 px-2 border border-black font-semibold text-xl"
      >
        Save
      </button>
    </Form>
  );
};

export default RecipeForm;
