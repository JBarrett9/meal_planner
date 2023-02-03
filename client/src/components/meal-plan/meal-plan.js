const MealPlan = () => {
  const week = Array.from(Array(7).keys()).map((idx) => {
    const d = new Date();
    d.setDate(d.getDate() - d.getDay() + idx);
    return d;
  });

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <span className="flex flex-wrap justify-center dark:text-white">
      {week.map((day) => (
        <div className="border border-black dark:border-teal-300 bg-stone-100 dark:bg-stone-800 shadow-md shadow-gray-700 flex flex-col w-28 m-1 text-center pb-2">
          <span className="flex justify-between pl-2">
            {days[day.getDay()]}
            <span className="pr-2 border-l border-b border-black dark:border-teal-300 w-8 text-right">
              {day.getDate()}
            </span>
          </span>
          <p className="p-2"></p>
          <button className="text-blue-800 dark:text-blue-300 font-semibold text-3xl">
            +
          </button>
        </div>
      ))}
    </span>
  );
};

export default MealPlan;
