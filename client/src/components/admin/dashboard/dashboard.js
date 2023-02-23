import { Route, Routes } from "react-router-dom";
import AdminNav from "../admin-nav/admin-nav";
import Ingredients from "../ingredients/ingredients";
import Users from "../users/users";

const Dashboard = (props) => {
  return (
    <div>
      <AdminNav />
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route
          path="/ingredients"
          element={<Ingredients token={props.token} />}
        />
        <Route path="/categories" />
        <Route path="/recipes" />
      </Routes>
    </div>
  );
};

export default Dashboard;
