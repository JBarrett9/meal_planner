import { useState } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import RecipeDisplay from "../recipe-display/recipe-display";
import RecipeForm from "./recipe-form/recipe-form";
import RecipeList from "./recipe-list/recipe-list";
import { RecipeNav } from "./recipe-navs";
import Recipe from "./recipe/recipe";

const Recipes = (props) => {
  const { user } = props;

  return (
    <>
      {user.name ? (
        <div className="recipes">
          <RecipeNav />
          <Routes>
            <Route
              path="/"
              element={<RecipeList token={props.token} />}
            ></Route>
            <Route
              path="/recipe/:recipeId/step_view"
              element={<RecipeDisplay token={props.token} />}
            ></Route>
            <Route
              path="/recipe/:recipeId"
              element={<Recipe token={props.token} />}
            ></Route>
            <Route
              path="/recipe_form"
              element={<RecipeForm token={props.token} />}
            ></Route>
          </Routes>
        </div>
      ) : (
        <Navigate to="/user/login" />
      )}
    </>
  );
};

export default Recipes;
