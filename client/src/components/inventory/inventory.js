import { useEffect, useState } from "react";
import { fetchInventory } from "../../api/inventory";

const Inventory = (props) => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const getInventory = async () => {
      const data = await fetchInventory(props.token);
      setInventory(data);
    };

    getInventory();
  }, []);

  console.log(inventory);
  return (
    <div>
      <h1>Hello Inventory</h1>
    </div>
  );
};

export default Inventory;
