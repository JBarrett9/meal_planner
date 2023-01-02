import { useEffect, useState } from "react";
import Home from "./components/home/home";

function App() {
  const [account, setAccount] = useState({});
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");

    async function getMe() {
      setToken(localStorageToken);
    }
  });
  return <div className="App"></div>;
}

export default App;
