import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../api/firebase";
import { useAuth } from "../../contexts/AuthContext";

const ListsList = (props) => {
  const [lists, setLists] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    async function getLists() {
      const q = query(
        collection(db, "lists"),
        where("creator", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      setLists(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setIsLoading(false);
    }

    setIsLoading(true);
    getLists();
  }, [props]);

  return (
    <div>
      <nav className="w-full py-2 flex-col bg-white dark:bg-stone-700 dark:text-stone-50 shadow shadow-black dark:border-none mb-4">
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
            className="grow px-2 border-l border-b border-solid border-black text-sm text-black"
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
            <li className="mt-4 text-lg border-2 dark:border-stone-800 shadow shadow-black bg-white border-purple-800 dark:bg-gray-800 dark:text-stone-300 py-2 px-4">
              <Link key={list.id} to={`/lists/list/${list.id}`}>
                {list.name}
              </Link>
            </li>
          ))
        ) : (
          <div className="mx-auto w-fit text-lg my-10 text-center">
            <p className="font-semibold text-orange-300 dark:text-gray-200">
              No lists found
            </p>
            <Link
              to="/lists/list_form"
              className="text-stone-100 hover:text-teal-200 dark:text-teal-400 dark:hover:text-teal-500 font-bold"
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
