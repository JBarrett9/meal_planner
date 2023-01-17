import { useState } from "react";
import { Link } from "react-router-dom";
import { FormInput } from "../../inputs";

const RecipeListNav = () => {
  const [keywords, setKeywords] = useState("");

  return (
    <nav className="w-full px-6 pb-4 mx-auto flex flex-col md:flex-row md:items-center text-center bg-emerald-500 dark:bg-stone-800 dark:text-stone-50 shadow shadow-black dark:border-none mb-4">
      <FormInput
        label="Search: "
        type="text"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
      />
      <span className="flex my-2 md:mx-8">
        <label className="mr-2 text-md">Category:</label>
        <select
          className="grow px-2 border border-solid border-black text-md"
          name="sortBy"
          id="sortBy"
        >
          <option disabled value={-1}>
            {" "}
            -- select --{" "}
          </option>
        </select>
      </span>
    </nav>
  );
};

export default RecipeListNav;
