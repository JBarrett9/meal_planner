const FormInput = (props) => {
  return (
    <span className="flex mt-3 flex-wrap">
      <label className="mr-2 text-md">{props.label}</label>
      <input
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        className="grow px-2 border-l border-b border-solid border-black text-md text-black"
      />
    </span>
  );
};

export default FormInput;
