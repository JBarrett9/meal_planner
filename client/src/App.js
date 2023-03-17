import { useEffect, useRef, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
import {
  Login,
  Register,
  ForgotPassword,
  PrivateRoute,
} from "./components/user";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { useOutsideClick } from "./hooks";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, setMenuOpen);

  return (
    <AuthProvider>
      <div className="min-h-screen pb-24 bg-zinc-600 dark:bg-stone-600">
        <div ref={wrapperRef}>
          <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/user">
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="forgot-password" element={<ForgotPassword />}></Route>
          </Route>
          <Route
            path="/inventory/*"
            element={
              <PrivateRoute>
                <Inventory />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/recipes/*"
            element={
              <PrivateRoute>
                <Recipes />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/lists/*"
            element={
              <PrivateRoute>
                <Lists />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/meal_plan"
            element={
              <PrivateRoute>
                <MealPlan />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </div>
      <Footer />
    </AuthProvider>
  );
}

export default App;
