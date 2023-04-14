import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addIngredientToList, createList } from "../../api/lists";
import IngredientQuery from "../inputs/ingredient-query/ingredient-query";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../api/firebase";
import { useAuth } from "../../contexts/AuthContext";

const ListForm = (props) => {
  const { listId } = useParams();
  const today = new Date();
  const [name, setName] = useState(`Grocery List, ${today.toDateString()}`);
  const [listIngredients, setListIngredients] = useState([]);
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  useEffect(() => {
    if (listId) {
    }
  }, [listId]);

  const removeItem = (idx) => {
    let temp = [...listIngredients];
    temp.splice(idx, 1);
    setListIngredients(temp);
  };

  const listsCollectionRef = collection(db, "lists");

  const handleSubmit = async () => {
    try {
      const list = await addDoc(listsCollectionRef, {
        name,
        created: new Date(),
        creator: currentUser.uid,
        active: true,
        items: listIngredients,
      });

      if (list.id) {
        navigate("/lists");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white border border-black shadow shadow-black dark:bg-stone-800 dark my-8 py-4 w-11/12 sm:w-96 mx-auto flex flex-col border-t-4 border-t-blue-700 dark:border-t-blue-400 dark:text-white">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-11/12 mx-auto text-center text-2xl bg-stone-200 dark:bg-stone-600 dark:text-white py-1"
      />
      <ul className="ml-12 mt-4 text-xl">
        {listIngredients.map((ingredient, idx) => (
          <li>
            - {ingredient.qty} {ingredient.unit} {ingredient.name}{" "}
            <button
              type="button"
              className="border border-black ml-1 bg-red-400 dark:text-white px-1 text-xs font-bold"
              onClick={() => removeItem(idx)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <span className="flex align-center w-full px-4 mt-4 dark:text-white">
        <IngredientQuery
          submitFunction={(newIngredient) => {
            setListIngredients([...listIngredients, newIngredient]);
          }}
        />
      </span>
      <button
        onClick={(e) => handleSubmit(e)}
        className="mt-6 mb-4 py-2 w-3/4 mx-auto bg-sky-100 dark:bg-teal-600 px-2 border border-black font-semibold text-xl shadow shadow-slate-700"
      >
        Save
      </button>
    </div>
  );
};

export default ListForm;
