import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "./api/authentication";
import Home from "./components/home/home";
import Menu from "./components/navbar/menu";
import Navbar from "./components/navbar/navbar";
import { Recipes } from "./components/recipes";
import Login from "./components/user/login";
import Register from "./components/user/register";

function App() {
  const [account, setAccount] = useState({});
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
  return (
    <>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Menu menuOpen={menuOpen} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/user">
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
        </Route>
        <Route path="/recipes" element={<Recipes />}></Route>
      </Routes>
    </>
  );
}

export default App;
