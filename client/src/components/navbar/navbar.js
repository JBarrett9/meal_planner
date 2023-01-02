import { Link } from "react-router-dom";
import "./navbar.css";
const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <div className="logo" />
      </Link>
      <span className="material-symbols-outlined menu-icon">menu</span>
    </nav>
  );
};

export default Navbar;
