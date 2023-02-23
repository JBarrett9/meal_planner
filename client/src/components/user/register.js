import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/authentication";
import FormInput from "../inputs/form-input";

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [recaptchaResponse, setRecaptchaResponse] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    const response = await register({
      email,
      password,
      name,
      recaptchaResponse,
    });

    if (response.success) {
      localStorage.setItem("jwt", response.token);
      props.setToken(response.token);
      props.setUser(response.user);
      navigate("/");
    }
  };

  const handleReCAPTCHAChange = async (value) => {
    setRecaptchaResponse(value);
  };

  return (
    <div className="login">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="mx-auto flex flex-col w-96 py-1 px-4 mt-8 border-solid border-black border-2 dark:bg-zinc-800 dark:text-white"
      >
        <h2 className="text-center text-2xl">Create Account</h2>
        <FormInput
          label="Name: "
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <FormInput
          label="Confirm Password: "
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <span className="flex justify-center mt-4">
          <ReCAPTCHA
            sitekey="6LdrVVIkAAAAAMNZ0wwI0WEfLCMaIGVEVdvGhBLB"
            onChange={handleReCAPTCHAChange}
          />
        </span>
        <button className="mt-4 bg-slate-600 py-2 text-stone-50 text-xl shadow-md shadow-gray-800 hover:shadow-none hover:bg-slate-700">
          Submit
        </button>
        <p className="text-center mt-4 mb-4">
          Already have an account?
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
