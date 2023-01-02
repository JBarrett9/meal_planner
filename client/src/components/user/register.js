import { Link } from "react-router-dom";
import "./user.css";

const Register = () => {
  return (
    <div className="login">
      <form className="login-form">
        <h2 style={{ textAlign: "center" }}>Create Account</h2>
        <span className="form-sec">
          <label>Name: </label>
          <input />
        </span>
        <span className="form-sec">
          <label>Email: </label>
          <input />
        </span>
        <span className="form-sec">
          <label>Password: </label>
          <input />
        </span>
        <span className="form-sec">
          <label>Confirm Password: </label>
          <input />
        </span>
        <button>Submit</button>
        <p>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
