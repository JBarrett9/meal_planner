const Form = (props) => {
  return (
    <form className="w-80 sm:w-96 mx-auto mt-8 border border-black bg-white dark:bg-stone-800 dark:text-stone-50 border-t-4 border-t-red-400 dark:border-t-red-400 flex flex-col px-6 py-4 shadow-md shadow-black">
      <h2 className="text-center text-2xl">{props.title}</h2>
      {props.children}
    </form>
  );
};

export default Form;
