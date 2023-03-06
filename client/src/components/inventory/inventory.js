import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchInventory } from "../../api/inventory";

const Inventory = (props) => {
  const [inventory, setInventory] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);

  useEffect(() => {
    const getInventory = async () => {
      const data = await fetchInventory(props.token);
      setInventory(data);
    };

    getInventory();
  }, []);

  const removeItem = async () => {};

  console.log(inventory);
  return (
    <div className="w-80 sm:w-96 mx-auto mt-8 border border-black bg-white dark:bg-stone-800 dark:text-stone-50 border-t-4 border-t-purple-400 dark:border-t-purple-400 flex flex-col px-6 py-4 shadow-md shadow-black">
      <h2 className="text-xl text-center font-semibold">Inventory</h2>
      <Link className="text-center font-semibold mb-2">+ Add Item</Link>
      <ul>
        {inventory?.ingredients?.map((ingredient) => (
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
