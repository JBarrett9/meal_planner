import { Link, Navigate } from "react-router-dom";

const RecipeList = (props) => {
  const { user } = props;
  const recipes = [];
  return (
    <>
      {user ? (
        <div className="recipe-list">
          {recipes.length > 0 ? (
            recipes.map(() => (
              <table>
                <tr></tr>
              </table>
            ))
          ) : (
            <>
              <p>You haven't added any recipes yet</p>
              <Link>Add a recipe?</Link>
            </>
          )}
        </div>
      ) : (
        <Navigate to="/user/login" />
      )}
    </>
  );
};

export default RecipeList;
