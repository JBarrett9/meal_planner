import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useOutsideClick } from "../../hooks";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../api/firebase";
import { useAuth } from "../../contexts/AuthContext";

const List = (props) => {
  const [list, setList] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [checked, setChecked] = useState([]);
  const [currIngredient, setCurrIngredient] = useState({});
  const [qty, setQty] = useState(0);
  const [unit, setUnit] = useState("");
  const [displayPrompt, setDisplayPrompt] = useState(false);
  const { listId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getList() {
      const docRef = doc(db, "lists", listId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setList(docSnap.data());
      } else {
        console.log("No such document!");
        navigate("/lists");
      }
      setIsLoading(false);
    }

    setIsLoading(true);
    getList();
  }, [props.token]);

  const handleCheck = (ingredient, idx) => {
    let loc = checked.indexOf(idx);
    if (loc >= 0) {
      let temp = [...checked];
      temp.splice(loc, 1);
      setChecked(temp);
    } else {
      setCurrIngredient(ingredient);
      setDisplayPrompt(true);
      setQty(ingredient.qty);
      setUnit(ingredient.unit);
      setChecked([...checked, idx]);
    }
  };

  const handleAddToInventory = (e) => {
    e.preventDefault();
  };

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, setDisplayPrompt);

  return (
    <div className="bg-stone-100 dark:bg-stone-800 w-11/12 mx-auto sm:w-3/5 mt-8 shadow shadow-black px-4 py-6 dark:text-white">
      {isLoading ? (
        <div className="flex mx-auto w-full mt-4 items-center justify-center space-x-2">
          <div className="w-4 h-4 bg-emerald-500 rounded-full animate-bounce delay-1000"></div>
          <div className="w-4 h-4 bg-emerald-500 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-emerald-500 rounded-full animate-bounce delay-1000"></div>
        </div>
      ) : (
        ""
      )}
      {displayPrompt ? (
        <div
          ref={wrapperRef}
          className="absolute pb-6 w-80 px-4 bg-stone-200 left-1/2 -ml-40 shadow-lg shadow-black dark:bg-zinc-700"
        >
          <h3 className="text-2xl mt-4 text-center capitalize">
            {currIngredient.name}
          </h3>
          <span className="flex justify-center">
            <div className="flex flex-col mr-4 w-12">
              <label className="text-black dark:text-white">Qty</label>
              <input
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                type="number"
                min="0"
                className="border border-black pl-2 text-black"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-black dark:text-white">Unit</label>
              <select
                value={unit}
                onFocus={(e) => (e.target.size = 7)}
                onBlur={(e) => (e.target.size = 1)}
                onChange={(e) => {
                  setUnit(e.target.value);
                  e.target.size = 1;
                }}
                className="text-black w-full border border-black text-center"
              >
                <option disabled value="">
                  {" "}
                  -- select --{" "}
                </option>
                <option disabled> -- Weight --</option>
                <option value="grams">gram/s</option>
                <option value="oz">ounce/s</option>
                <option value="lbs">lbs</option>
                <option disabled> -- Volume --</option>
                <option value="tsp">teaspoon/s</option>
                <option value="tbsp">tablespoon/s</option>
                <option value="cups">cup/s</option>
                <option value="ml">milliliter/s</option>
                <option value="liter">liter/s</option>
                <option value="quart">quart/s</option>
                <option value="gal">gallon/s</option>
                <option disabled> -- Approximate -- </option>
                <option value="pinch">pinch/es</option>
                <option value="dash">dash/es</option>
                <option value="sm">small</option>
                <option value="md">medium</option>
                <option value="lg">large</option>
                <option value="xl">extra-large</option>
                <option disabled>-- Relative --</option>
                <option value="clove">clove/s</option>
                <option value="stalk">stalk/s</option>
                <option value="sprig">sprig/s</option>
              </select>
            </div>
          </span>
          <div className="flex flex-col mt-2">
            <span className="flex justify-center">
              <button
                type="submit"
                onClick={(e) => handleAddToInventory(e)}
                className="bg-emerald-300 dark:bg-emerald-800 px-4 border-2 border-zinc-200 dark:border-zinc-600 shadow shadow-black mt-4 mr-4"
              >
                Add to Inventory
              </button>
              <button
                onClick={() => setDisplayPrompt(false)}
                type="button"
                className="bg-sky-300 dark:bg-sky-700 px-4 border-2 border-zinc-200 dark:border-zinc-600 shadow shadow-black mt-4"
              >
                Skip
              </button>
            </span>
            <Link
              onClick={() => setDisplayPrompt(false)}
              className="self-center mt-2"
            >
              Skip For All
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}
      <h2 className="text-center text-xl">{list.name}</h2>
      <ul>
        {list?.items?.length > 0
          ? list.items.map((item, idx) => (
              <li
                onClick={() => handleCheck(item, idx)}
                className="flex align-center"
              >
                {checked.includes(idx) ? (
                  <span className="material-symbols-outlined text-emerald-600 mr-2">
                    done
                  </span>
                ) : (
                  <span className="material-symbols-outlined mr-2">
                    check_box_outline_blank
                  </span>
                )}
                {item.qty} {item.unit} {item.name}
              </li>
            ))
          : ""}
      </ul>
      <span className="flex justify-between">
        <button className="bg-sky-300 px-4 border-2 border-zinc-200 shadow shadow-black mt-4 text-black font-semibold">
          Add Item
        </button>
        <button className="bg-emerald-300 px-4 border-2 border-zinc-200 shadow shadow-black mt-4 text-black font-semibold">
          Complete
        </button>
      </span>
    </div>
  );
};

export default List;
