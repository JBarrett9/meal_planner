import { Link } from "react-router-dom";
import "./navbar.css";
const Navbar = (props) => {
  return (
    <header className="navbar">
      <Link to="/">
        <div className="logo" />
      </Link>
      <button onClick={() => props.setMenuOpen(!props.menuOpen)}>
        <span className="material-symbols-outlined menu-icon">menu</span>
      </button>
    </header>
  );
};

export default Navbar;
