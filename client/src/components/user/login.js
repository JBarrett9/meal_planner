import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login">
      <form className="login-form">
        <h2 style={{ textAlign: "center" }}>Sign In</h2>
        <span className="form-sec">
          <label>Email: </label>
          <input />
        </span>
        <span className="form-sec">
          <label>Password: </label>
          <input />
        </span>
        <button>Submit</button>
        <p>
          Need an account? <Link to="/login">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
