import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "./api/authentication";
import Home from "./components/home/home";
import Navbar from "./components/navbar/navbar";
import Login from "./components/user/login";
import Register from "./components/user/register";

function App() {
  const [account, setAccount] = useState({});
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");

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
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </>
  );
}

export default App;
