import { Link } from "react-router-dom";
import { useWindowSize } from "../../hooks";
const Navbar = (props) => {
  const size = useWindowSize();

  return (
    <header className="flex justify-between flex-wrap">
      <Link className="text-4xl dark:text-slate-200 mt-2 ml-4" to="/">
        M-Plan
      </Link>
      {props.token ? (
        <button
          className="mr-4 mt-2"
          onClick={() => props.setMenuOpen(!props.menuOpen)}
        >
          <span className="material-symbols-outlined menu-icon text-6xl dark:text-stone-50">
            menu
          </span>
        </button>
      ) : (
        <span className="flex flex-col sm:flex-row mt-4 mr-8 mx-auto dark:text-stone-50 text-xl sm:text-2xl">
          {size.width > 640 ? (
            <Link to="/user/register" className="sm:mr-6">
              Create an Account
            </Link>
          ) : (
            <></>
          )}
          <Link to="/user/login">Sign In</Link>
        </span>
      )}
    </header>
  );
};

export default Navbar;
