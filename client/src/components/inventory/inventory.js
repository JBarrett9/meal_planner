import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../api/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useOutsideClick } from "../../hooks";
import { IngredientQuery } from "../inputs";

const Inventory = (props) => {
  const [inventory, setInventory] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const getInventory = async () => {
      const q = query(
        collection(db, "inventoryItems"),
        where("user", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      setInventory(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    getInventory();
  }, []);

  const inventoryItemscCollectionRef = collection(db, "inventoryItems");

  const handleAddItem = async (ingredient) => {
    setDisplayForm(false);
    const inventoryItem = await addDoc(inventoryItemscCollectionRef, {
      user: currentUser.uid,
      ...ingredient,
    });
  };
  const removeItem = async () => {};

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, setDisplayForm);

  return (
    <div className="w-80 sm:w-96 mx-auto mt-8 border border-black bg-white dark:bg-stone-800 dark:text-stone-50 border-t-4 border-t-purple-400 dark:border-t-purple-400 flex flex-col px-6 py-4 shadow-md shadow-black">
      <h2 className="text-xl text-center font-semibold">Inventory</h2>
      {displayForm ? (
        <form
          ref={wrapperRef}
          onSubmit={handleAddItem}
          className="absolute pb-6 w-80 px-4 bg-stone-200 left-1/2 -ml-40 shadow-lg shadow-black dark:bg-zinc-700 dark:text-white flex flex-col pt-6"
        >
          <IngredientQuery
            submitFunction={(newIngredient) => {
              handleAddItem(newIngredient);
            }}
          />
        </form>
      ) : (
        ""
      )}
      <Link
        onClick={() => {
          setDisplayForm(true);
        }}
        className="text-center font-semibold mb-2"
      >
        + Add Item
      </Link>
      <ul>
        {inventory?.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.qty} {ingredient.unit} {ingredient.name}
            <button
              type="button"
              className="border border-black ml-2 bg-red-500 text-white px-1 text-xs"
              onClick={() => removeItem(ingredient)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;
