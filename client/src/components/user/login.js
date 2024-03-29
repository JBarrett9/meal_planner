import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { InputField } from "../inputs";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      await login(email, password);
      navigate("/");
    } catch (error) {
      setError(error);
    }

    setIsLoading(false);
  };

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  return (
    <div className="login">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="mx-auto flex flex-col w-80 sm:w-96 py-1 px-4 mt-8 border-solid border-black border-2 dark:bg-zinc-800 dark:text-white"
      >
        <h2 className="text-center text-2xl">Sign In</h2>
        {error ? <div>{error}</div> : ""}
        <InputField
          label="Email: "
          type="email"
          autocomplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          ref={emailRef}
        />
        <InputField
          label="Password: "
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          ref={passwordRef}
        />
        <button
          disabled={isLoading}
          onClick={(e) => handleSubmit(e)}
          className="mt-4 bg-slate-600 py-2 text-stone-50 text-xl shadow-md shadow-gray-800 hover:shadow-none hover:bg-slate-700"
        >
          Submit
        </button>
        <Link to="/user/forgot-password" className="text-center mt-4 mb-4">
          Forgot Password?
        </Link>
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
