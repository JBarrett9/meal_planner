import { Route, Routes } from "react-router-dom";
import UsersNav from "./users-nav";

const Users = () => {
  return (
    <>
      <UsersNav />
      <Routes>
        <Route path="/" />
      </Routes>
    </>
  );
};

export default Users;
