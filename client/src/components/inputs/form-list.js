import { useRef } from "react";

const FormList = (props) => {
  const removeItem = (idx) => {
    let temp = [...props.items];
    temp.splice(idx, 1);
    props.setItems(temp);
  };

  return (
    <ol
      className={
        props.items.length && props.items[0].name
          ? "list-disc ml-4"
          : "list-decimal ml-4"
      }
    >
      {props.items.map((item, idx) => (
        <li key={idx}>
          {item && item.name ? `${item.qty} ${item.unit} ${item.name} ` : item}
          <button
            type="button"
            className="border border-black ml-1 bg-red-500 text-white px-1 text-xs"
            onClick={() => removeItem(idx)}
          >
            X
          </button>
        </li>
      ))}
    </ol>
  );
};

export default FormList;
