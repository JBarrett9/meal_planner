import { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "./api/authentication";
import Footer from "./components/footer/footer";
import Home from "./components/home/home";
import Menu from "./components/navbar/menu";
import Navbar from "./components/navbar/navbar";
import { Recipes } from "./components/recipes";
import Login from "./components/user/login";
import Register from "./components/user/register";
import { useOutsideClick } from "./hooks";

function App() {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");

    async function getMe() {
      const me = await getUser(storedToken);
      setUser(me);
    }
    if (storedToken) {
      setToken(storedToken);
      getMe();
    }
  }, []);

  const logout = () => {
    setMenuOpen(false);
    localStorage.clear();
    setUser({});
    setToken("");
  };

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, setMenuOpen);

  return (
    <>
      <div className="mb-16">
        <div ref={wrapperRef}>
          <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} token={token} />
          <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} logout={logout} />
        </div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/user">
            <Route
              path="login"
              element={<Login setToken={setToken} setUser={setUser} />}
            ></Route>
            <Route
              path="register"
              element={<Register setToken={setToken} setUser={setUser} />}
            ></Route>
          </Route>
          <Route
            path="/recipes/*"
            element={<Recipes user={user} token={token} />}
          ></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
