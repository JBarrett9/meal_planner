import { Route, Routes } from "react-router-dom";
import List from "./list";
import ListForm from "./list-form";
import ListNav from "./list-nav";
import ListsList from "./lists-list";

const Lists = (props) => {
  const { user } = props;

  return (
    <div>
      <ListNav />
      <Routes>
        <Route path="/" element={<ListsList token={props.token} />}></Route>
        <Route
          path="/list_form"
          element={<ListForm token={props.token} />}
        ></Route>
        <Route
          path="/list/:listId"
          element={<List token={props.token} />}
        ></Route>
      </Routes>
    </div>
  );
};

export default Lists;
