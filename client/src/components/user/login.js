import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/authentication";
import FormInput from "../inputs/form-input";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    const response = await login({ email, password });
    if (response.success) {
      localStorage.setItem("jwt", response.token);
      props.setToken(response.token);
      props.setUser(response.user);
      navigate("/");
    }
  };

  return (
    <div className="login">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="mx-auto flex flex-col w-96 py-1 px-4 mt-8 border-solid border-black border-2 dark:bg-zinc-800 dark:text-white"
      >
        <h2 className="text-center text-2xl">Sign In</h2>
        <FormInput
          label="Email: "
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          label="Password: "
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={(e) => handleSubmit(e)}
          className="mt-4 bg-slate-600 py-2 text-stone-50 text-xl shadow-md shadow-gray-800 hover:shadow-none hover:bg-slate-700"
        >
          Submit
        </button>
        <p className="text-center mt-4 mb-4">
          Need an account?{" "}
          <Link
            className="text-teal-900 dark:text-teal-600 font-bold"
            to="/user/register"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
