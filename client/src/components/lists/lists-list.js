import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { fetchAccountLists } from "../../api/lists";

const ListsList = (props) => {
  const [lists, setLists] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getLists() {
      const data = await fetchAccountLists(props.token);
      setLists(data);
      setIsLoading(false);
    }

    setIsLoading(true);
    getLists();
  }, [props]);

  return (
    <div>
      <nav className="w-full py-2 flex-col bg-slate-200 dark:bg-stone-700 dark:text-stone-50 shadow shadow-black dark:border-none mb-4">
        <span className="flex mb-2">
          <NavLink
            end
            to="/lists"
            className={({ isActive }) =>
              isActive
                ? "text-stone-700 dark:text-gray-400 ml-4"
                : "ml-4 hover:text-stone-900 dark:hover:text-stone-200"
            }
          >
            View All
          </NavLink>
          <NavLink
            end
            to="/lists/active"
            className={({ isActive }) =>
              isActive
                ? "text-stone-700 dark:text-gray-400 ml-4"
                : "ml-4 hover:text-stone-900 dark:hover:text-stone-200"
            }
          >
            Current
          </NavLink>
          <NavLink
            end
            to="/lists/past"
            className={({ isActive }) =>
              isActive
                ? "text-stone-700 dark:text-gray-400 ml-4"
                : "ml-4 hover:text-stone-900 dark:hover:text-stone-200"
            }
          >
            Completed
          </NavLink>
        </span>
        <span>
          <label className="ml-4 mr-2">Search:</label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="border border-black"
          />
        </span>
      </nav>
      <ul className="w-96 mx-auto">
        {isLoading ? (
          <div className="flex mx-auto w-full mt-4 items-center justify-center space-x-2">
            <div className="w-4 h-4 bg-emerald-500 rounded-full animate-bounce delay-1000"></div>
            <div className="w-4 h-4 bg-emerald-500 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-emerald-500 rounded-full animate-bounce delay-1000"></div>
          </div>
        ) : (
          ""
        )}
        {lists.length > 0 ? (
          lists.map((list) => (
            <Link key={list.id} to={`/lists/list/${list.id}`}>
              <li className="mt-4 text-lg bg-purple-300 dark:bg-gray-800 dark:text-stone-300 py-2 px-4">
                {list.name}
              </li>
            </Link>
          ))
        ) : (
          <div className="mx-auto w-fit text-lg my-10 text-center">
            <p className="dark:text-gray-200">No lists found</p>
            <Link
              to="/lists/list_form"
              className="text-teal-800 hover:text-teal-900 dark:text-teal-400 dark:hover:text-teal-500 font-bold"
            >
              Add a list?
            </Link>
          </div>
        )}
      </ul>
    </div>
  );
};

export default ListsList;
