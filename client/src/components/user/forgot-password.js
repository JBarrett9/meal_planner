import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { InputField } from "../inputs";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      await resetPassword(email);
    } catch (error) {
      setError(error);
    }

    setIsLoading(false);
  };

  const emailRef = useRef(null);

  return (
    <div className="login">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="mx-auto flex flex-col w-80 sm:w-96 py-1 px-4 mt-8 border-solid border-black border-2 bg-stone-100 dark:bg-zinc-800 dark:text-white"
      >
        <h2 className="text-center text-2xl">Sign In</h2>
        {error ? <div>{error}</div> : ""}
        <InputField
          label="Email: "
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          ref={emailRef}
        />
        <button
          disabled={isLoading}
          onClick={(e) => handleSubmit(e)}
          className="mt-4 bg-slate-600 py-2 text-stone-50 text-xl shadow-md shadow-gray-800 hover:shadow-none hover:bg-slate-700"
        >
          Send
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

export default ForgotPassword;
