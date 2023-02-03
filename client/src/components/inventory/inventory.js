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
  return <div></div>;
};

export default Inventory;
