import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { InputField } from "../inputs";

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [recaptchaResponse, setRecaptchaResponse] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register, updateUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setConfirmPasswordError("");
    setError("");

    if (!email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
      emailRef.current.focus();
      return setEmailError("Please enter a valid email");
    }

    if (password !== confirmPassword) {
      confirmPasswordRef.current.focus();
      return setConfirmPasswordError("Passwords do not match");
    }

    try {
      await register(email, password);
      navigate("/");
    } catch (error) {
      setError(error);
    }

    setIsLoading(false);
  };

  const handleReCAPTCHAChange = async (value) => {
    setRecaptchaResponse(value);
  };

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  return (
    <div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="mx-auto flex flex-col w-80 sm:w-96 py-1 px-4 mt-8 border-solid border-black border-2 bg-stone-100 dark:bg-zinc-800 dark:text-white"
      >
        <h2 className="text-center text-2xl">Create Account</h2>
        {error ? <div>{error}</div> : ""}
        <InputField
          label="Email: "
          type="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
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
        <InputField
          label="Confirm Password: "
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmPasswordError}
          ref={confirmPasswordRef}
        />
        <span className="flex justify-center mt-4 ">
          <ReCAPTCHA
            sitekey="6LdrVVIkAAAAAMNZ0wwI0WEfLCMaIGVEVdvGhBLB"
            onChange={handleReCAPTCHAChange}
          />
        </span>
        <button
          disabled={isLoading}
          className="mt-4 bg-slate-600 py-2 text-stone-50 text-xl shadow-md shadow-gray-800 hover:shadow-none hover:bg-slate-700"
        >
          Submit
        </button>
        <p className="text-center mt-4 mb-4">
          Already have an account?{" "}
          <Link
            className="text-teal-900 dark:text-teal-600 font-bold"
            to="/user/login"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
