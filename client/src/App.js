import { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getGoogleUser, getUser } from "./api/authentication";
import { Dashboard } from "./components/admin";
import Footer from "./components/footer/footer";
import Home from "./components/home/home";
import Inventory from "./components/inventory/inventory";
import Lists from "./components/lists/lists";
import MealPlan from "./components/meal-plan/meal-plan";
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

    async function getUser() {
      try {
        const response = await getGoogleUser();
        setUser(response?.user);
      } catch (error) {
        console.error(error);
      }
    }

    if (storedToken) {
      setToken(storedToken);
      getMe();
    } else {
      getUser();
    }
  }, []);

  useEffect(() => {
    getUser();
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
      <div className="min-h-screen pb-24 bg-zinc-600 dark:bg-stone-600">
        <div ref={wrapperRef}>
          <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} token={token} />
          <Menu
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            user={user}
            logout={logout}
          />
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
            path="/inventory/*"
            element={<Inventory user={user} token={token} />}
          ></Route>
          <Route
            path="/recipes/*"
            element={<Recipes user={user} token={token} />}
          ></Route>
          <Route
            path="/lists/*"
            element={<Lists user={user} token={token} />}
          ></Route>
          <Route path="/meal_plan" element={<MealPlan token={token} />}></Route>
          {user?.admin ? (
            <Route
              path="/admin/*"
              element={<Dashboard user={user} token={token} />}
            ></Route>
          ) : (
            <></>
          )}
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
